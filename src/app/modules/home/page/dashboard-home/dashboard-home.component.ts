import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { LancamentoHoraEvent } from 'src/app/models/enums/lancamento-horas/LancamentoHoraEvent';
import { DashboardMetricaAdmin } from 'src/app/models/interfaces/dashboard/DashboardMetricaAdmin';
import { DashboardMetricaGeral } from 'src/app/models/interfaces/dashboard/DashboardMetricaGeral';
import { LancamentoHoraResponse } from 'src/app/models/interfaces/lancamento-horas/LancamentoHoraResponse';
import { LancamentoHorasFormComponent } from 'src/app/modules/lancamento-horas/components/lancamento-horas-form/lancamento-horas-form.component';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { LancamentoHoraService } from 'src/app/services/lancamento-horas/lancamento-hora.service';

import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AtividadeEvent } from 'src/app/models/enums/atividades/AtividadeEvent';
import { ProjetoEvent } from 'src/app/models/enums/projetos/ProjetoEvent';
import { AtividadesFormComponent } from 'src/app/modules/atividades/components/atividades-form/atividades-form.component';
import { ProjetosFormComponent } from 'src/app/modules/projetos/components/projetos-form/projetos-form.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;

  public dashboardMetricaGeral!: DashboardMetricaGeral;
  public dashboardMetricasAdmin!: DashboardMetricaAdmin;
  public lancamentosHoras: Array<LancamentoHoraResponse> = [];

  constructor(
    private dashboardService: DashboardService,
    private lancamentoHoraService: LancamentoHoraService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getDashboardMetricaGeral();
    this.getUltimosCincoLancamentos();
    this.getDashboardMetricasAdmin();
  }

  getDashboardMetricaGeral(): void {
    this.dashboardService.getDashboardMetricaGeral()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.dashboardMetricaGeral = response;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar as métricas', life: 2500 });
        }
      });
  }

  getDashboardMetricasAdmin(): void {
    this.dashboardService.getDashboardMetricasAdmin()
      .subscribe({
        next: (response) => {
          this.dashboardMetricasAdmin = response;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar as métricas', life: 2500 });
        }
      });
  }

  getUltimosCincoLancamentos(): void {
    this.lancamentoHoraService.getUltimosCinco()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.lancamentosHoras = response;
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os lançamentos', life: 2500 });
        }
      });
  }

  handleCreateNovoLancamento(): void {
    const addLancamentoHoraAction = LancamentoHoraEvent.ADD_LANCAMENTO_HORA_EVENT;

    this.ref = this.dialogService.open(LancamentoHorasFormComponent, {
      header: addLancamentoHoraAction,
      width: '45vw',
      contentStyle: { overflow: 'visible', 'max-height': '80vh' },
      baseZIndex: 10000,
      maximizable: false,
      data: {
        event: { action: addLancamentoHoraAction }
      }
    });

    this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getUltimosCincoLancamentos();
          this.getDashboardMetricaGeral();
          this.getDashboardMetricasAdmin();
        }
      });
  }

  handleCreateNovoProjeto(): void {
    const addNovoProjetoAction = ProjetoEvent.ADD_PROJETO_EVENT

    this.ref = this.dialogService.open(ProjetosFormComponent, {
      header: addNovoProjetoAction,
      width: '45vw',
      contentStyle: { overflow: 'visible', 'max-height': '80vh' },
      baseZIndex: 10000,
      maximizable: false,
      data: {
        event: { action: addNovoProjetoAction }
      }
    });

    this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getDashboardMetricaGeral();
          this.getDashboardMetricasAdmin();
        }
      });
  }

  handleCreateNovaAtividade(): void {
    const addNovaAtividadeAction = AtividadeEvent.ADD_ATIVIDADE_EVENT;

    this.ref = this.dialogService.open(AtividadesFormComponent, {
      header: addNovaAtividadeAction,
      width: '50vw',
      contentStyle: { overflow: 'visible', 'max-height': '80vh' },
      baseZIndex: 10000,
      maximizable: false,
      data: {
        event: { action: addNovaAtividadeAction }
      }
    });

    this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getDashboardMetricaGeral();
          this.getDashboardMetricasAdmin();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
