import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AtividadesHomeComponent } from './page/atividades-home/atividades-home.component';
import { ATIVIDADES_ROUTES } from './atividades.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtividadesTableComponent } from './components/atividades-table/atividades-table.component';
import { AtividadesFormComponent } from './components/atividades-form/atividades-form.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AtividadesHomeComponent,
    AtividadesTableComponent,
    AtividadesFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ATIVIDADES_ROUTES),
    SharedModule,
    HttpClientModule,
    // PrimeNG
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToolbarModule,
    TagModule,
    AutoCompleteModule,
    InputTextareaModule,
    CalendarModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [DialogService, ConfirmationService]
})
export class AtividadesModule { }
