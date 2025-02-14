import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PROJETOS_ROUTES } from './projetos.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjetosHomeComponent } from './page/projetos-home/projetos-home.component';
import { ProjetosTableComponent } from './components/projetos-table/projetos-table.component';
import { ProjetosFormComponent } from './components/projetos-form/projetos-form.component';

import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    ProjetosHomeComponent,
    ProjetosTableComponent,
    ProjetosFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PROJETOS_ROUTES),
    HttpClientModule,
    SharedModule,
    // PrimeNG
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DynamicDialogModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule,
    TagModule,
    ToolbarModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [DialogService, ConfirmationService]
})
export class ProjetosModule { }
