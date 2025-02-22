import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { LancamentoHoraResponse } from 'src/app/models/interfaces/lancamento-horas/LancamentoHoraResponse';
import { LancamentoHoraService } from 'src/app/services/lancamento-horas/lancamento-hora.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { LancamentoHorasFormComponent } from '../../components/lancamento-horas-form/lancamento-horas-form.component';

@Component({
  selector: 'app-lancamento-horas-home',
  templateUrl: './lancamento-horas-home.component.html',
  styleUrls: ['./lancamento-horas-home.component.scss']
})
export class LancamentoHorasHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;

  public lancamentoHorasList: Array<LancamentoHoraResponse> = [];

  constructor(
    private lancamentoHoraService: LancamentoHoraService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllLancamentosHoras();
  }

  getAllLancamentosHoras(): void {
    this.lancamentoHoraService.getAllLancamentosHoras()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.lancamentoHorasList = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os lançamentos', life: 2500 });

          this.router.navigate(['/home']);
        }
      });
  }

  handleLancamentoHoraAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(LancamentoHorasFormComponent, {
        header: event?.action,
        width: '45vw',
        contentStyle: { overflow: 'visible', 'max-height': '80vh' },
        baseZIndex: 10000,
        maximizable: false,
        data: {
          event: event,
          lancamentoHorasList: this.lancamentoHorasList
        }
      });

      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getAllLancamentosHoras()
        });
    }
  }

  handleDeleteLancamentoHoraAction(event: { id: number, nomeAtividade: string }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do lançamento: ${event.nomeAtividade}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        acceptButtonStyleClass: 'p-button-danger',
        rejectLabel: 'Não',
        accept: () => this.deleteLancamentoHora(event.id)
      });
    }
  }

  deleteLancamentoHora(id: number): void {
    if (id) {
      this.lancamentoHoraService.deleteLancamentoHora(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento removido com sucesso', life: 2500 });

            this.getAllLancamentosHoras();
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao remover o lançamento', life: 3000 });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
