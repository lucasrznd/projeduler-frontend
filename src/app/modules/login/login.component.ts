import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthRequest } from 'src/app/models/interfaces/auth/AuthRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmitLogin(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.authService.login(this.loginForm.value as AuthRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('accessToken', response.token);

              this.loginForm.reset();
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado com sucesso!', life: 2000 });
              this.router.navigate(['/home']);
            }
          },
          error: (err) => {
            if (err.error) {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message, life: 2500 });
              return;
            }

            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar login!', life: 2500 });
            console.log(err);
          }
        });
    }
  }

}
