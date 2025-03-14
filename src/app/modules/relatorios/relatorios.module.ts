import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RELATORIOS_ROUTES } from './relatorios.routing';

import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { RelatoriosHomeComponent } from './page/relatorios-home/relatorios-home.component';

@NgModule({
  declarations: [
    RelatoriosHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(RELATORIOS_ROUTES),
    HttpClientModule,
    SharedModule,
    // PrimeNG Modules
    CardModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    ChartModule,
    DividerModule,
    ProgressSpinnerModule,
    BlockUIModule
  ]
})
export class RelatoriosModule { }
