import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DashboardMetricaAdmin } from 'src/app/models/interfaces/dashboard/DashboardMetricaAdmin';
import { DashboardMetricaGeral } from 'src/app/models/interfaces/dashboard/DashboardMetricaGeral';
import { UsuariosAtivos } from 'src/app/models/interfaces/dashboard/UsuariosAtivos';
import { LancamentoHoraResponse } from 'src/app/models/interfaces/lancamento-horas/LancamentoHoraResponse';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { LancamentoHoraService } from 'src/app/services/lancamento-horas/lancamento-hora.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public dashboardMetricaGeral!: DashboardMetricaGeral;
  public dashboardMetricasAdmin!: DashboardMetricaAdmin;
  public usuariosAtivos!: UsuariosAtivos;
  public lancamentosHoras: Array<LancamentoHoraResponse> = [];

  constructor(
    private dashboardService: DashboardService,
    private lancamentoHoraService: LancamentoHoraService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getDashboardMetricaGeral();
    this.getAllLancamentoHoras();
    this.getDashboardMetricasAdmin();
    this.getDashboardUsuariosAtivos();
  }

  getDashboardMetricaGeral(): void {
    this.dashboardService.getDashboardMetricaGeral()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.dashboardMetricaGeral = response;
        },
        error: (err) => {
          console.log(err);
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
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar as métricas', life: 2500 });
        }
      });
  }

  getDashboardUsuariosAtivos(): void {
    this.dashboardService.getDashboardUsuariosAtivos()
      .subscribe({
        next: (response) => {
          this.usuariosAtivos = response;
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os usuários ativos', life: 2500 });
        }
      });
  }

  getAllLancamentoHoras(): void {
    this.lancamentoHoraService.getAllLancamentosHoras()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.lancamentosHoras = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar os lançamentos', life: 2500 });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
