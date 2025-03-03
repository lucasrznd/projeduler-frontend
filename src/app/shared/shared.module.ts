import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    ToolbarNavigationComponent,
    FooterComponent,
    ShortenPipe,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // PrimeNG
    ToolbarModule,
    CardModule,
    ButtonModule
  ],
  exports: [ToolbarNavigationComponent, FooterComponent, ShortenPipe, HasRoleDirective],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
