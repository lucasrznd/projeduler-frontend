import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ProjetoEvent } from 'src/app/models/enums/projetos/ProjetoEvent';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { UsuarioProjetoRequest } from 'src/app/models/interfaces/usuario-projeto/UsuarioProjetoRequest';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { UsuarioProjetoService } from 'src/app/services/usuario-projeto/usuario-projeto.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { ProjetosDataTransferService } from 'src/app/shared/services/projetos/projetos-data-transfer.service';
import { UsuariosDataTransferService } from 'src/app/shared/services/usuarios/usuarios-data-transfer.service';

@Component({
  selector: 'app-usuario-projetos-form',
  templateUrl: './usuario-projetos-form.component.html',
  styleUrls: ['./usuario-projetos-form.component.scss']
})
export class UsuarioProjetosFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public projetosList: Array<ProjetoResponse> = [];
  public projetosFiltrados: Array<ProjetoResponse> = [];
  public usuarioProjetoAction!: {
    event: EventAction
  }
  public usuariosDisponiveis: Array<UsuarioResponse> = [];
  public usuariosSelecionados: Array<UsuarioResponse> = [];

  public usuarioProjetoForm = this.formBuilder.group({
    projeto: [{ id: 0 }, Validators.required],
    usuariosSelecionados: [[] as Array<UsuarioResponse>]
  });

  public addUsuarioProjetoEvent = ProjetoEvent.ADD_USUARIO_PROJETO_EVENT;

  constructor(
    private formBuilder: FormBuilder,
    private usuariosDtTransfer: UsuariosDataTransferService,
    private projetosDtTransfer: ProjetosDataTransferService,
    private usuarioProjetoService: UsuarioProjetoService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.getProjetosDatas();
  }

  getUsuariosDatas(): void {
    const usuariosCarregados = this.usuariosDtTransfer.getUsuarioData();

    if (usuariosCarregados.length > 0) {
      this.usuariosDisponiveis = usuariosCarregados;
    }
  }

  getProjetosDatas(): void {
    const projetosCarregados = this.projetosDtTransfer.getProjetoData();

    if (projetosCarregados.length > 0) {
      this.projetosList = projetosCarregados;
    }
  }

  findUsuariosDisponiveis(projeto: ProjetoResponse): void {
    if (projeto.id) {
      this.getUsuariosDatas();

      this.usuarioService.findAllUsuariosDisponiveis(projeto.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.usuariosDisponiveis = response;
            }
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os usuários do projeto', life: 2500 });
          }
        });
    }
  }

  handleSubmitUsuarioProjetoAction(): void {
    if (this.usuarioProjetoForm.value.projeto && this.usuarioProjetoForm.value.usuariosSelecionados) {
      const usuariosSelecionados: Array<UsuarioResponse> = this.usuarioProjetoForm.value.usuariosSelecionados;

      if (usuariosSelecionados.length > 0) {
        usuariosSelecionados.forEach((usr) => {
          const requestCreateUsuarioProjeto: UsuarioProjetoRequest = {
            usuarioId: usr.id,
            projetoId: this.usuarioProjetoForm.value.projeto!.id
          };

          console.log('Usuario projeto: ', requestCreateUsuarioProjeto);

          this.usuarioProjetoService.addUsuarioAoProjeto(requestCreateUsuarioProjeto)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (response) => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: usuariosSelecionados.length === 1 ? 'Usuário adicionado com sucesso' : 'Usuários adicionados com sucesso', life: 2500 });

                this.usuarioProjetoForm.reset();
              },
              error: (err) => {
                console.log(err);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro ao adicionar o usuário ${requestCreateUsuarioProjeto.usuarioId} ao projeto.`, life: 2500 });
              }
            });
        });
      }
    }
  }

  filtrarProjeto(event: any): void {
    let query = event.query;

    if (this.projetosList.length > 0) {
      let filtrados: ProjetoResponse[] = this.projetosList.filter(e =>
        e.nome.toUpperCase().includes(query.toUpperCase())
      );
      this.projetosFiltrados = filtrados;
    }
  }

  getPerfilSeverity(perfil: string): string {
    const severityMap: { [key: string]: string } = {
      'ADMIN': 'danger',
      'USER': 'info',
    };
    return severityMap[perfil.toUpperCase()] || 'info';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
