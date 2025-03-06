import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { LancamentoHoraEvent } from 'src/app/models/enums/lancamento-horas/LancamentoHoraEvent';
import { AtividadeResponse } from 'src/app/models/interfaces/atividades/AtividadeResponse';
import { LancamentoHoraRequest } from 'src/app/models/interfaces/lancamento-horas/LancamentoHoraRequest';
import { LancamentoHoraResponse } from 'src/app/models/interfaces/lancamento-horas/LancamentoHoraResponse';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { AtividadeService } from 'src/app/services/atividades/atividade.service';
import { LancamentoHoraService } from 'src/app/services/lancamento-horas/lancamento-hora.service';
import { calcularDiferencaHora, parseDate } from 'src/app/shared/utils/date-utils';

import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-lancamento-horas-form',
  templateUrl: './lancamento-horas-form.component.html',
  styleUrls: ['./lancamento-horas-form.component.scss']
})
export class LancamentoHorasFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public atividadesList: Array<AtividadeResponse> = [];
  public atividadesFiltradas: Array<AtividadeResponse> = [];

  public previewDuracao!: string;

  public addLancamentoHoraAction = LancamentoHoraEvent.ADD_LANCAMENTO_HORA_EVENT;
  public editLancamentoHoraAction = LancamentoHoraEvent.EDIT_LANCAMENTO_HORA_EVENT;

  public lancamentoHorasAction!: {
    event: EventAction,
    lancamentoHorasList: Array<LancamentoHoraResponse>
  }

  public lancamentoHorasForm = this.formBuilder.group({
    atividade: [{ id: 0 }, Validators.required],
    descricao: ['', Validators.required],
    dataInicio: [null as unknown as Date | string, Validators.required],
    horarioInicio: [null as unknown as Date | string, Validators.required],
    horarioFim: [null as unknown as Date | string, Validators.required],
    duracao: [''],
    dataFim: [null as unknown as Date]
  });

  constructor(
    public ref: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private lancamentoHoraService: LancamentoHoraService,
    private atividadeService: AtividadeService
  ) { }

  ngOnInit(): void {
    this.lancamentoHorasAction = this.ref.data;

    this.getAllAtividades();

    if (this.lancamentoHorasAction.event.action === this.editLancamentoHoraAction && this.lancamentoHorasAction.event.id !== null || undefined) {
      this.setLancamentoHoraData(this.lancamentoHorasAction.event.id!);
    }
  }

  getAllAtividades(): void {
    this.atividadeService.getAllAtividades()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.atividadesList = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar as atividades', life: 2500 });
        }
      });
  }

  handleSubmitLancamentoHoraAction(): void {
    if (this.lancamentoHorasAction?.event.action === this.addLancamentoHoraAction) {
      this.handleSubmitAddLancamentoHora();
      return;
    }

    this.handleSubmitEditLancamentoHora();
  }

  handleSubmitAddLancamentoHora(): void {
    if (this.lancamentoHorasForm.value && this.lancamentoHorasForm.valid) {
      const dataInicio = new Date(this.lancamentoHorasForm.value.horarioInicio!);
      const dataFim = new Date(this.lancamentoHorasForm.value.horarioFim!);

      const requestCreateLancamentoHora: LancamentoHoraRequest = {
        atividadeId: this.lancamentoHorasForm.value.atividade?.id as number,
        descricao: this.lancamentoHorasForm.value.descricao as string,
        dataInicio: new Date(dataInicio.getTime() - dataInicio.getTimezoneOffset() * 60000).toISOString(),
        dataFim: new Date(dataFim.getTime() - dataFim.getTimezoneOffset() * 60000).toISOString(),
      };

      this.lancamentoHoraService.createLancamentoHora(requestCreateLancamentoHora)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento criado com sucesso', life: 2500 });

              this.dialogRef.close();
            }
          },
          error: (err) => {
            console.log(err);
            if (err.status === 409) return this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message, life: 2500 });
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro no lançamento', life: 2500 });
          }
        });
    }
  }

  handleSubmitEditLancamentoHora(): void {
    if (this.lancamentoHorasForm.value && this.lancamentoHorasForm.valid && this.lancamentoHorasAction.event.id) {
      const lancamentoHoraId: number = this.lancamentoHorasAction.event.id;
      const dataInicio = new Date(this.lancamentoHorasForm.value.horarioInicio!);
      const dataFim = new Date(this.lancamentoHorasForm.value.horarioFim!);

      const requestEditLancamentoHora: LancamentoHoraRequest = {
        atividadeId: this.lancamentoHorasForm.value.atividade?.id as number,
        descricao: this.lancamentoHorasForm.value.descricao as string,
        dataInicio: new Date(dataInicio.getTime() - dataInicio.getTimezoneOffset() * 60000).toISOString(),
        dataFim: new Date(dataFim.getTime() - dataFim.getTimezoneOffset() * 60000).toISOString(),
      };

      console.log(requestEditLancamentoHora)

      this.lancamentoHoraService.editLancamentoHora(lancamentoHoraId, requestEditLancamentoHora)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento editado com sucesso', life: 2500 });

              this.dialogRef.close();
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao editar o lançamento', life: 2500 });
          }
        });
    }
  }

  onTimeChange(event: Date) {
    if (event) {
      const horarioInicio: Date = this.lancamentoHorasForm.value.horarioInicio as Date;
      const horarioFim: Date = this.lancamentoHorasForm.value.horarioFim as Date;

      this.lancamentoHorasForm.patchValue({
        duracao: calcularDiferencaHora(horarioInicio, horarioFim)
      });
    }
  }

  setLancamentoHoraData(lancamentoHoraId: number): void {
    const lancamentosHorasList: Array<LancamentoHoraResponse> = this.lancamentoHorasAction.lancamentoHorasList;

    if (lancamentosHorasList.length > 0) {
      const lancamentoFiltrado = lancamentosHorasList.filter((lh) => lh.id === lancamentoHoraId);

      if (lancamentoFiltrado) {
        this.lancamentoHorasForm.patchValue({
          atividade: lancamentoFiltrado[0].atividade,
          descricao: lancamentoFiltrado[0].descricao,
          dataInicio: parseDate(lancamentoFiltrado[0].dataInicio.toString()),
          horarioInicio: parseDate(lancamentoFiltrado[0].dataInicio.toString()),
          horarioFim: parseDate(lancamentoFiltrado[0].dataFim.toString()),
          duracao: calcularDiferencaHora(parseDate(lancamentoFiltrado[0].dataInicio.toString()), parseDate(lancamentoFiltrado[0].dataFim.toString()))
        });
      }
    }
  }

  filtrarAtividade(event: any): void {
    let query = event.query;

    if (this.atividadesList.length > 0) {
      let filtrados: AtividadeResponse[] = this.atividadesList.filter(e =>
        e.nome.toUpperCase().includes(query.toUpperCase())
      );
      this.atividadesFiltradas = filtrados;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
