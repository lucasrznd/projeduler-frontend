import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ProjetoEvent } from 'src/app/models/enums/projetos/ProjetoEvent';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { UsuarioProjetoRequest } from 'src/app/models/interfaces/usuario-projeto/UsuarioProjetoRequest';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { UsuarioProjetoService } from 'src/app/services/usuario-projeto/usuario-projeto.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-usuario-projetos-form',
  templateUrl: './usuario-projetos-form.component.html',
  styleUrls: ['./usuario-projetos-form.component.scss']
})
export class UsuarioProjetosFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public projetosList: Array<ProjetoResponse> = [];
  public projetosFiltrados: Array<ProjetoResponse> = [];
  public projetoSelecionado!: ProjetoResponse;
  public usuarioResponsavelSelecionado!: { id: number, nome: string, email: string };
  public usuarioProjetoAction!: {
    event: EventAction
  }
  public usuariosDisponiveis: Array<UsuarioResponse> = [];
  public usuariosDoProjeto: Array<UsuarioResponse> = [];
  public pickListEditavel: boolean = true;

  public addUsuarioProjetoEvent = ProjetoEvent.ADD_USUARIO_PROJETO_EVENT;
  public editUsuarioProjetoEvent = ProjetoEvent.EDIT_USUARIO_PROJETO_EVENT;

  constructor(
    private usuarioProjetoService: UsuarioProjetoService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private messageService: MessageService,
    private ref: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.usuarioProjetoAction = this.ref.data;
    this.getProjetosDatas();
    this.hasRole();

    if (this.usuarioProjetoAction.event.action === this.editUsuarioProjetoEvent && this.usuarioProjetoAction.event.id !== null || undefined) {
      this.setUsuarioProjetoData(this.usuarioProjetoAction.event.id!);
    }
  }

  getUsuariosDatas(): void {
    this.usuarioService.getAllUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.usuariosDisponiveis = response;
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os usuários', life: 2500 });
        }
      });
  }

  getProjetosDatas(): void {
    const projetosCarregados = this.ref.data.projetosList;

    if (projetosCarregados.length > 0) {
      this.projetosList = projetosCarregados;
    }
  }

  hasRole(): void {
    const requiredRoles = ['ADMIN'];
    const hasRole = this.authService.hasRole(requiredRoles);

    if (!hasRole) {
      this.pickListEditavel = true;
      return;
    }
    this.pickListEditavel = false;
  }

  onMoveToTarget(event: any): void {
    // Usuários adicionados ao projeto
    const usuariosAdicionados: UsuarioResponse[] = event.items;

    if (usuariosAdicionados.length === 1) {
      const requests = usuariosAdicionados.map(usuario => ({
        usuarioId: usuario.id,
        projetoId: this.projetoSelecionado.id
      }));

      this.saveUsuarioProjeto(requests[0]);
    }
  }

  onMoveToSource(event: any): void {
    // Usuários removidos do projeto
    const usuariosRemovidos: UsuarioResponse[] = event.items;

    if (usuariosRemovidos.length === 1) {
      const requests = usuariosRemovidos.map(usuario => ({
        usuarioId: usuario.id,
        projetoId: this.usuarioProjetoAction.event.id as number
      }));

      this.deleteUsuarioDoProjeto(requests[0].usuarioId, requests[0].projetoId);
    }
  }

  adicionarUsuario(usuario: UsuarioResponse): void {
    // Remover da lista de disponíveis
    this.usuariosDisponiveis = this.usuariosDisponiveis.filter(u => u.id !== usuario.id);

    // Adicionar à lista de usuários do projeto
    this.usuariosDoProjeto.push(usuario);

    const requestCreateUsuarioProjeto: UsuarioProjetoRequest = {
      usuarioId: usuario.id,
      projetoId: this.projetoSelecionado.id as number
    };

    this.saveUsuarioProjeto(requestCreateUsuarioProjeto);
  }

  removerUsuario(usuario: UsuarioResponse): void {
    // Remover da equipe do projeto
    this.usuariosDoProjeto = this.usuariosDoProjeto.filter(u => u.id !== usuario.id);

    // Adicionar de volta à lista de disponíveis
    this.usuariosDisponiveis.push(usuario);

    const requestDeleteUsuarioProjeto: UsuarioProjetoRequest = {
      usuarioId: usuario.id,
      projetoId: this.projetoSelecionado.id as number
    };

    this.deleteUsuarioDoProjeto(requestDeleteUsuarioProjeto.usuarioId, requestDeleteUsuarioProjeto.projetoId);
  }

  findUsuariosDisponiveis(projeto?: ProjetoResponse, projetoId?: number): void {
    const idProjeto: number = projeto !== undefined ? projeto.id : projetoId!;
    if (projeto) {
      this.usuarioResponsavelSelecionado = projeto.usuarioResponsavel;
    }

    if (idProjeto) {
      this.getUsuariosDatas();

      this.usuarioService.findAllUsuariosDisponiveis(idProjeto)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.usuariosDisponiveis = response;
            }
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os usuários disponíveis do projeto', life: 2500 });
          }
        });
    }

    this.findAllUsuariosByProjetoId(idProjeto);
  }

  saveUsuarioProjeto(data: UsuarioProjetoRequest): void {
    this.usuarioProjetoService.addUsuarioAoProjeto(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário adicionado com sucesso', life: 2500 });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao adicionar o usuário ao projeto.', life: 2500 });
        }
      });
  }

  deleteUsuarioDoProjeto(usuarioId: number, projetoId: number): void {
    this.usuarioProjetoService.deleteUsuarioDoProjeto(usuarioId, projetoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário removido com sucesso', life: 2500 });
          this.findUsuariosDisponiveis(undefined, projetoId);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao remover usuário do projeto', life: 2500 });
        }
      });
  }

  findAllUsuariosByProjetoId(projetoId: number): void {
    this.usuarioService.findAllUsuariosByProjetoId(projetoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.usuariosDoProjeto = response;
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os usuários do projeto', life: 2500 });
        }
      });
  }

  setUsuarioProjetoData(projetoId: number): void {
    this.findUsuariosDisponiveis(undefined, projetoId);

    if (this.projetosList.length > 0) {
      const projetoFiltrado = this.projetosList.filter((proj) => proj.id === projetoId);

      if (projetoFiltrado) {
        this.projetoSelecionado = projetoFiltrado[0];
        this.usuarioResponsavelSelecionado = projetoFiltrado[0].usuarioResponsavel;
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
