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
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';
import { TooltipModule } from 'primeng/tooltip';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    UsuariosHomeComponent,
    UsuariosTableComponent,
    UsuariosFormComponent
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
    TooltipModule,
    TableModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    ToolbarModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  providers: [DialogService, ConfirmationService]
})
export class UsuariosModule { }
