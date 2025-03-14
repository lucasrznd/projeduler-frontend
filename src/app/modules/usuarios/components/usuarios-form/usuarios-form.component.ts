import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { UsuarioEvent } from 'src/app/models/enums/usuarios/UsuarioEvent';
import { DropdownOption } from 'src/app/models/interfaces/dropdown/DropdownOption';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { UsuarioRequest } from 'src/app/models/interfaces/usuarios/UsuarioRequest';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { DropdownService } from 'src/app/services/dropdown/dropdown.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public usuarioPerfisArray: Array<DropdownOption> = [];
  public usuarioAction!: {
    event: EventAction,
    usuariosList: Array<UsuarioResponse>;
  }

  public usuarioForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(4)]],
    perfil: ['', Validators.required],
  });

  public addUsuarioAction = UsuarioEvent.ADD_USUARIO_EVENT;
  public editUsuarioAction = UsuarioEvent.EDIT_USUARIO_EVENT;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private dropdownService: DropdownService,
    private ref: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.usuarioAction = this.ref.data;
    this.usuarioPerfisArray = this.dropdownService.getUsuarioPerfisOptions();

    if (this.usuarioAction.event.action === this.editUsuarioAction && this.usuarioAction.event.id !== null || undefined) {
      this.setUsuarioData(this.usuarioAction.event.id!);
    }
  }

  handleSubmitUsuarioAction(): void {
    if (this.usuarioAction.event?.action === this.addUsuarioAction) {
      this.handleSubmitAddUsuario();
      return;
    }

    this.handleSubmitEditUsuario();
  }

  handleSubmitAddUsuario(): void {
    if (this.usuarioForm.value && this.usuarioForm.valid) {
      const requestCreateUsuario: UsuarioRequest = {
        nome: this.usuarioForm.value.nome as string,
        email: this.usuarioForm.value.email as string,
        senha: this.usuarioForm.value.senha as string,
        perfil: this.usuarioForm.value.perfil as string
      };

      this.usuarioService.createUsuario(requestCreateUsuario)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso', life: 2500 });

              this.dialogRef.close();
            }
          },
          error: (err) => {
            if (err.status === 409) return this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'E-mail já existente', life: 2500 });

            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao criar o usuário', life: 2500 });
          }
        });
    }

    this.usuarioForm.reset();
  }

  handleSubmitEditUsuario(): void {
    if (this.usuarioForm.value && this.usuarioForm.valid && this.usuarioAction.event.id) {
      const usuarioId = this.usuarioAction.event.id;

      const requestEditUsuario: UsuarioRequest = {
        nome: this.usuarioForm.value.nome as string,
        email: this.usuarioForm.value.email as string,
        senha: this.usuarioForm.value.senha as string,
        perfil: this.usuarioForm.value.perfil as string
      }

      this.usuarioService.editUsuario(usuarioId, requestEditUsuario)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário editado com sucesso', life: 2500 });

            this.dialogRef.close();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao editar o usuário', life: 2500 });
          }
        })
    }

    this.usuarioForm.reset();
  }

  setUsuarioData(id: number) {
    const usuariosList = this.usuarioAction?.usuariosList;

    if (usuariosList.length > 0) {
      const usuarioFiltrado = usuariosList.filter((usr) => usr.id === id);

      if (usuarioFiltrado) {
        this.usuarioForm.setValue({
          nome: usuarioFiltrado[0].nome,
          email: usuarioFiltrado[0].email,
          senha: '',
          perfil: usuarioFiltrado[0].perfil
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
