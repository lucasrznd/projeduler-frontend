import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AtividadeService } from 'src/app/services/atividades/atividade.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AtividadeResponse } from 'src/app/models/interfaces/atividades/AtividadeResponse';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { AtividadesFormComponent } from '../../components/atividades-form/atividades-form.component';

@Component({
  selector: 'app-atividades-home',
  templateUrl: './atividades-home.component.html',
  styleUrls: ['./atividades-home.component.scss']
})
export class AtividadesHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;

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

  handleAtividadeAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(AtividadesFormComponent, {
        header: event?.action,
        width: '45vw',
        contentStyle: { overflow: 'visible', 'max-height': '80vh' },
        baseZIndex: 10000,
        maximizable: false,
        data: {
          event: event
        }
      });

      this.ref.onClose
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.getAllAtividades()
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
