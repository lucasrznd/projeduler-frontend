import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { ProjetoEvent } from 'src/app/models/enums/projetos/ProjetoEvent';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { ProjetoRequest } from 'src/app/models/interfaces/projetos/ProjetoRequest';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';

@Component({
  selector: 'app-projetos-form',
  templateUrl: './projetos-form.component.html',
  styleUrls: ['./projetos-form.component.scss']
})
export class ProjetosFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public usuarios: Array<UsuarioResponse> = [];
  public usuariosFiltrados: any[] = [];
  public projetoAction!: {
    event: EventAction,
    projetosList: Array<ProjetoResponse>
  }

  public projetoStatusArray = [{ value: 'EM ANDAMENTO' }, { value: 'CONCLUIDO' }];
  public projetoPrioridadeArray = [{ value: 'ALTA' }, { value: 'MEDIA' }];

  public projetoForm = this.formBuilder.group({
    nome: ['', Validators.required],
    descricao: [''],
    dataInicio: [''],
    dataFim: [''],
    status: ['', Validators.required],
    usuarioResponsavel: [{ id: 0 }, Validators.required],
    prioridade: ['', Validators.required]
  });

  public addProjetoAction = ProjetoEvent.ADD_PROJETO_EVENT;
  public editProjetoAction = ProjetoEvent.EDIT_PROJETO_EVENT;

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.projetoAction = this.ref.data;

    this.getAllUsuarios();
  }

  getAllUsuarios(): void {
    this.usuarioService.getAllUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.usuarios = response;
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
        dataInicio: new Date(this.projetoForm.value.dataInicio as string),
        dataFim: new Date(this.projetoForm.value.dataInicio as string),
        status: this.projetoForm.value.status as string,
        usuarioResponsavelId: this.projetoForm.value.usuarioResponsavel?.id as number,
        prioridade: this.projetoForm.value.prioridade as string,
      }

      console.log(requestCreateProjeto);
    }
  }

  handleSubmitEditProjeto(): void {

  }

  filtrarUsuario(event: any): void {
    let query = event.query;

    if (this.usuarios.length > 0) {
      let filtrados: any[] = this.usuarios.filter(e =>
        e.nome.toUpperCase().includes(query.toUpperCase())
      );
      this.usuariosFiltrados = filtrados;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
