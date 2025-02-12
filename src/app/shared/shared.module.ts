import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';

@NgModule({
  declarations: [
    ToolbarNavigationComponent,
    FooterComponent,
    ShortenPipe
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
  exports: [ToolbarNavigationComponent, FooterComponent, ShortenPipe],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
