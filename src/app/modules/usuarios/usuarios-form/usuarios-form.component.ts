import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { PerfilEnum } from 'src/app/models/enums/perfis/PerfilEnum';
import { UsuarioRequest } from 'src/app/models/interfaces/usuarios/UsuarioRequest';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public addUsuarioForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(4)]],
    perfil: ['', Validators.required],
  });
  public perfisArray: Array<PerfilEnum> = [PerfilEnum.ADMIN, PerfilEnum.USER];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  handleSubmit(): void {
    if (this.addUsuarioForm.value && this.addUsuarioForm.valid) {
      const requestCreateUsuario: UsuarioRequest = {
        nome: this.addUsuarioForm.value.nome as string,
        email: this.addUsuarioForm.value.email as string,
        senha: this.addUsuarioForm.value.senha as string,
        perfil: this.addUsuarioForm.value.perfil as string
      };
      console.log(requestCreateUsuario);

      this.usuarioService.createUsuario(requestCreateUsuario)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso', life: 2500 });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao criar o usuário', life: 2500 });
          }
        });

      this.addUsuarioForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
