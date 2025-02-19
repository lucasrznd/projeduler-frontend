import { AtividadeService } from 'src/app/services/atividades/atividade.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AtividadeEvent } from 'src/app/models/enums/atividades/AtividadeEvent';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { DropdownOption } from 'src/app/models/interfaces/dropdown/DropdownOption';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { AtividadeRequest } from 'src/app/models/interfaces/atividades/AtividadeRequest';

@Component({
  selector: 'app-atividades-form',
  templateUrl: './atividades-form.component.html',
  styleUrls: ['./atividades-form.component.scss']
})
export class AtividadesFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public projetosList: Array<ProjetoResponse> = [];
  public projetosFiltrados: Array<ProjetoResponse> = [];
  public atividadeStatusArray: Array<DropdownOption> = [];

  public usuariosList: Array<UsuarioResponse> = [];
  public usuariosFiltrados: Array<UsuarioResponse> = [];

  public addAtividadeAction = AtividadeEvent.ADD_ATIVIDADE_EVENT;
  public editAtividadeAction = AtividadeEvent.EDIT_ATIVIDADE_EVENT;

  public atividadeAction!: { event: EventAction };

  public atividadeForm = this.formBuilder.group({
    projeto: [{ id: 0 }, Validators.required],
    nome: ['', Validators.required],
    descricao: [''],
    dataInicio: [null as unknown as Date | string],
    dataFim: [null as unknown as Date | string],
    status: ['', Validators.required],
    usuarioResponsavel: [{ id: 0 }, Validators.required],
  });

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private atividadeService: AtividadeService,
    private projetoService: ProjetoService,
    private dropdownService: DropdownService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getAllProjetos();
    this.getAllUsuarios();
    this.atividadeStatusArray = this.dropdownService.getAtividadeStatusOptions();
  }

  getAllProjetos(): void {
    this.projetoService.getAllProjetos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.projetosList = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os projetos', life: 2500 });
        }
      });
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
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os usuários', life: 2500 });
        }
      });
  }

  handleSubmitAddAtividade(): void {
    if (this.atividadeForm.value && this.atividadeForm.valid) {
      const requestCreateAtividade: AtividadeRequest = {
        projetoId: this.atividadeForm.value.projeto?.id as number,
        nome: this.atividadeForm.value.nome as string,
        descricao: this.atividadeForm.value.descricao as string,
        dataInicio: this.atividadeForm.value.dataInicio as Date,
        dataFim: this.atividadeForm.value.dataFim as Date,
        status: this.atividadeForm.value.status as string,
        usuarioResponsavelId: this.atividadeForm.value.usuarioResponsavel?.id as number
      };

      console.log(requestCreateAtividade);
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

  filtrarUsuario(event: any): void {
    let query = event.query;

    if (this.usuariosList.length > 0) {
      let filtrados: UsuarioResponse[] = this.usuariosList.filter(e =>
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
