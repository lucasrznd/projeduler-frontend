import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'src/app/shared/shared.module';
import { LANCAMENTO_HORAS_ROUTES } from './lancamento-horas.routing';
import { LancamentoHorasTableComponent } from './components/lancamento-horas-table/lancamento-horas-table.component';
import { LancamentoHorasFormComponent } from './components/lancamento-horas-form/lancamento-horas-form.component';
import { LancamentoHorasHomeComponent } from './page/lancamento-horas-home/lancamento-horas-home.component';

import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    LancamentoHorasHomeComponent,
    LancamentoHorasTableComponent,
    LancamentoHorasFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(LANCAMENTO_HORAS_ROUTES),
    SharedModule,
    HttpClientModule,
    // PrimeNG,
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ToolbarModule,
    TagModule,
    TooltipModule,
    AutoCompleteModule,
    CalendarModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  providers: [DialogService, ConfirmationService]
})
export class LancamentoHorasModule { }
