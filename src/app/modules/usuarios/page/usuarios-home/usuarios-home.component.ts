import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-usuarios-home',
  templateUrl: './usuarios-home.component.html',
  styleUrls: ['./usuarios-home.component.scss']
})
export class UsuariosHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public usuariosList: Array<UsuarioResponse> = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  getAllUsuarios(): void {
    this.usuarioService.getAllUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.usuariosList = response;
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar usuários', life: 2500 });
          this.router.navigate(['/home']);
        }
      });
  }

  handleUsuarioAction(event: EventAction): void {
    console.log('Dados recebidos: ', event);
  }

  handleDeleteUsuarioAction(event: { id: number, email: string }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do usuário: ${event.email}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        acceptButtonStyleClass: 'p-button-danger',
        rejectLabel: 'Não',
        accept: () => this.deleteUsuario(event.id)
      });
    }
  }

  deleteUsuario(id: number): void {
    if (id) {
      this.usuarioService.deleteUsuario(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário removido com sucesso', life: 2500 });
            // Atualizar dados da tabela
            this.getAllUsuarios();
          },
          error: (err) => {
            if (err.status === 409) {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário possui registros vínculados', life: 3000 });
              return;
            }
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao remover o usuário', life: 3000 });
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
