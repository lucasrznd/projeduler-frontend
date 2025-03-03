import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from 'src/app/shared/shared.module';
import { HOME_ROUTES } from './home.routing';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HOME_ROUTES),
    // PrimeNG
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    ProgressBarModule,
    DataViewModule,
    AvatarModule,
    DropdownModule,
    ProgressSpinnerModule,
    CardModule,
    TooltipModule,
    ChartModule,
    // Shared
    SharedModule
  ],
  providers: [CookieService]
})
export class HomeModule { }
