import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosHomeComponent } from './page/usuarios-home/usuarios-home.component';
import { USUARIOS_ROUTES } from './usuarios.routing';

@NgModule({
  declarations: [
    UsuariosHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(USUARIOS_ROUTES),
    SharedModule,
    HttpClientModule,
    // PrimeNG
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    RadioButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  providers: [DialogService, ConfirmationService]
})
export class UsuariosModule { }
