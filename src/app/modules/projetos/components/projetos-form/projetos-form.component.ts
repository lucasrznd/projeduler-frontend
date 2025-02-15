import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ProjetoEvent } from 'src/app/models/enums/projetos/ProjetoEvent';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { ProjetoRequest } from 'src/app/models/interfaces/projetos/ProjetoRequest';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { DropdownOption } from 'src/app/models/interfaces/dropdown/DropdownOption';
import { parseDate } from 'src/app/shared/utils/date-utils';

import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuariosDataTransferService } from 'src/app/shared/services/usuarios/usuarios-data-transfer.service';

@Component({
  selector: 'app-projetos-form',
  templateUrl: './projetos-form.component.html',
  styleUrls: ['./projetos-form.component.scss'],
})
export class ProjetosFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public usuarios: Array<UsuarioResponse> = [];
  public usuariosFiltrados: any[] = [];
  public projetoAction!: {
    event: EventAction,
    projetosList: Array<ProjetoResponse>
  }

  public projetoStatusArray: Array<DropdownOption> = [];
  public projetoPrioridadeArray: Array<DropdownOption> = [];

  public projetoForm = this.formBuilder.group({
    nome: ['', Validators.required],
    descricao: [''],
    dataInicio: [null as unknown as Date | string],
    dataFim: [null as unknown as Date | string],
    status: ['', Validators.required],
    usuarioResponsavel: [{ id: 0 }, Validators.required],
    prioridade: ['', Validators.required]
  });

  public addProjetoAction = ProjetoEvent.ADD_PROJETO_EVENT;
  public editProjetoAction = ProjetoEvent.EDIT_PROJETO_EVENT;

  constructor(
    public ref: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService,
    private dropdownService: DropdownService,
    private usuariosDtService: UsuariosDataTransferService
  ) { }

  ngOnInit(): void {
    this.projetoAction = this.ref.data;

    this.getAllUsuarios();
    this.projetoStatusArray = this.dropdownService.getProjetoStatusOptions();
    this.projetoPrioridadeArray = this.dropdownService.getProjetoPrioridadeOptions();

    if (this.projetoAction.event.action === this.editProjetoAction && this.projetoAction.event.id !== null || undefined) {
      this.setProjetoData(this.projetoAction.event.id!);
    }
  }

  getAllUsuarios(): void {
    this.usuarioService.getAllUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.usuarios = response;
            this.usuariosDtService.setUsuarioData(this.usuarios);
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar usuários', life: 2500 });
        }
      });
  }

  handleSubmitProjetoAction(): void {
    if (this.projetoAction.event?.action === this.addProjetoAction) {
      this.handleSubmitAddProjeto();
      return;
    }

    this.handleSubmitEditProjeto();
  }

  handleSubmitAddProjeto(): void {
    if (this.projetoForm?.value && this.projetoForm?.valid) {
      const requestCreateProjeto: ProjetoRequest = {
        nome: this.projetoForm.value.nome as string,
        descricao: this.projetoForm.value.descricao as string,
        dataInicio: this.projetoForm.value.dataInicio as Date,
        dataFim: this.projetoForm.value.dataFim as Date,
        status: this.projetoForm.value.status as string,
        usuarioResponsavelId: this.projetoForm.value.usuarioResponsavel?.id as number,
        prioridade: this.projetoForm.value.prioridade as string,
      }

      this.projetoService.createProjeto(requestCreateProjeto)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto criado com sucesso', life: 2500 });

              this.dialogRef.close();
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao criar o projeto', life: 2500 });
          }
        });
    }

    this.projetoForm.reset();
  }

  handleSubmitEditProjeto(): void {
    if (this.projetoForm.value && this.projetoForm.valid && this.projetoAction.event.id) {
      const projetoId = this.projetoAction.event.id;

      const requestEditProjeto: ProjetoRequest = {
        nome: this.projetoForm.value.nome as string,
        descricao: this.projetoForm.value.descricao as string,
        dataInicio: this.projetoForm.value.dataInicio as Date,
        dataFim: this.projetoForm.value.dataFim as Date,
        status: this.projetoForm.value.status as string,
        usuarioResponsavelId: this.projetoForm.value.usuarioResponsavel?.id as number,
        prioridade: this.projetoForm.value.prioridade as string,
      };

      this.projetoService.editProjeto(projetoId, requestEditProjeto)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto editado com sucesso', life: 2500 });

              this.dialogRef.close();
            }
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao editar o projeto', life: 2500 });
          }
        });
    }
  }

  filtrarUsuario(event: any): void {
    let query = event.query;

    if (this.usuarios.length > 0) {
      let filtrados: UsuarioResponse[] = this.usuarios.filter(e =>
        e.nome.toUpperCase().includes(query.toUpperCase())
      );
      this.usuariosFiltrados = filtrados;
    }
  }

  setProjetoData(id: number) {
    const projetosList: ProjetoResponse[] = this.projetoAction?.projetosList;

    if (projetosList.length > 0) {
      const projetoFiltrado = projetosList.filter((proj) => proj.id === id);

      if (projetoFiltrado) {
        this.projetoForm.setValue({
          nome: projetoFiltrado[0].nome,
          descricao: projetoFiltrado[0].descricao,
          dataInicio: parseDate(projetoFiltrado[0].dataInicio.toString()),
          dataFim: parseDate(projetoFiltrado[0].dataFim.toString()),
          status: projetoFiltrado[0].status,
          usuarioResponsavel: projetoFiltrado[0].usuarioResponsavel,
          prioridade: projetoFiltrado[0].prioridade
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
