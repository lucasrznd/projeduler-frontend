import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AtividadeService } from 'src/app/services/atividades/atividade.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AtividadeResponse } from 'src/app/models/interfaces/atividades/AtividadeResponse';

@Component({
  selector: 'app-atividades-home',
  templateUrl: './atividades-home.component.html',
  styleUrls: ['./atividades-home.component.scss']
})
export class AtividadesHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public atividadesList: Array<AtividadeResponse> = [];

  constructor(
    private atividadeService: AtividadeService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllAtividades();
  }

  getAllAtividades(): void {
    this.atividadeService.getAllAtividades()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.atividadesList = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar atividades', life: 2500 });
          this.router.navigate(['/home']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
