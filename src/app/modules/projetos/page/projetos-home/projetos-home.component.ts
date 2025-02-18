import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { ProjetosFormComponent } from '../../components/projetos-form/projetos-form.component';
import { UsuarioProjetosFormComponent } from '../../components/usuario-projetos-form/usuario-projetos-form.component';
import { ProjetosDataTransferService } from 'src/app/shared/services/projetos/projetos-data-transfer.service';

@Component({
  selector: 'app-projetos-home',
  templateUrl: './projetos-home.component.html',
  styleUrls: ['./projetos-home.component.scss']
})
export class ProjetosHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public projetosList: Array<ProjetoResponse> = [];

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private projetosDtTransfer: ProjetosDataTransferService
  ) { }

  ngOnInit(): void {
    this.getAllProjetos();
  }

  getAllProjetos(): void {
    this.projetoService.getAllProjetos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.projetosList = response;
            this.projetosDtTransfer.setProjetoData(response);
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar projetos', life: 2500 });
          this.router.navigate(['/home']);
        }
      });
  }

  handleProjetoAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(ProjetosFormComponent, {
        header: event?.action,
        width: '45vw',
        contentStyle: { overflow: 'auto', 'max-height': '80vh' },
        baseZIndex: 10000,
        maximizable: false,
        data: {
          event: event,
          projetosList: this.projetosList
        }
      });

      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getAllProjetos()
        });
    }
  }

  handleUsuarioProjetosAction(event: EventAction) {
    if (event) {
      this.ref = this.dialogService.open(UsuarioProjetosFormComponent, {
        header: event?.action,
        width: '60vw',
        contentStyle: { overflow: 'auto', 'max-height': '80vh' },
        baseZIndex: 10000,
        maximizable: false,
        data: {
          event: event,
          projetosList: this.projetosList
        }
      });
    }
  }

  handleDeleteProjetoAction(event: { id: number, nomeProjeto: string }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do projeto: ${event.nomeProjeto}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        acceptButtonStyleClass: 'p-button-danger',
        rejectLabel: 'Não',
        accept: () => this.deleteProjeto(event.id)
      });
    }
  }

  deleteProjeto(id: number): void {
    if (id) {
      this.projetoService.deleteProjeto(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto removido com sucesso', life: 2500 });
            // Atualizar dados da tabela
            this.getAllProjetos();
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao remover o projeto', life: 3000 });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
