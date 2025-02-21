import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { LancamentoHoraResponse } from 'src/app/models/interfaces/lancamento-horas/LancamentoHoraResponse';
import { LancamentoHorasService } from 'src/app/services/lancamento-horas/lancamento-horas.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-lancamento-horas-home',
  templateUrl: './lancamento-horas-home.component.html',
  styleUrls: ['./lancamento-horas-home.component.scss']
})
export class LancamentoHorasHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;

  public lancamentoHorasList: Array<LancamentoHoraResponse> = [];

  constructor(
    private lancamentoHorasService: LancamentoHorasService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllLancamentosHoras();
  }

  getAllLancamentosHoras(): void {
    this.lancamentoHorasService.getAllLancamentosHoras()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.lancamentoHorasList = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os lançamentos', life: 2500 });

          this.router.navigate(['/home']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
