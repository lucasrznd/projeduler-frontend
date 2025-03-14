import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { NotificacaoResponse } from 'src/app/models/interfaces/notificacoes/NotificacaoResponse';
import { NotificacaoService } from 'src/app/services/notificacoes/notificacao.service';

import { MessageService } from 'primeng/api';

const ROTAS = {
  PROJETO: 'projetos',
  ATIVIDADE: 'atividades'
};

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  public notificacoes: Array<NotificacaoResponse> = [];
  contadorNotificacoes!: number;

  constructor(
    private notificacaoService: NotificacaoService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.fetchNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    interval(5000)
      .pipe(
        switchMap(() => this.fetchNotifications()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  marcarComoLida(notificacao: NotificacaoResponse): void {
    this.notificacaoService
      .marcarComoLida(notificacao.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificacoes = this.notificacoes.map((n) =>
            n.id === notificacao.id ? { ...n, lida: true } : n
          );
          this.updateContador();

          const rota = this.getRotaByNotificacao(notificacao);
          const nome = this.getNomeByNotificacao(notificacao);

          if (rota && nome) {
            this.router.navigate([rota], { queryParams: { nome } });
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao marcar a notificação como lida', life: 2500 });
        }
      });
  }

  private getNomeByNotificacao(notificacao: NotificacaoResponse): string {
    if (!notificacao?.mensagem) return '';

    const regex = /Você foi adicionado (ao projeto|à atividade): (.+)/;
    const match = notificacao.mensagem.match(regex);
    return match ? match[2].trim() : '';
  }

  private getRotaByNotificacao(notificacao: NotificacaoResponse): string {
    if (!notificacao?.mensagem) return '';

    return notificacao.mensagem.includes('projeto') ? ROTAS.PROJETO : ROTAS.ATIVIDADE;
  }

  private fetchNotifications() {
    return this.notificacaoService.findAllNotificacoes().pipe(
      tap((response: NotificacaoResponse[]) => {
        this.notificacoes = response;
        this.updateContador();
      })
    );
  }

  private updateContador(): void {
    this.contadorNotificacoes = this.notificacoes.filter((n) => !n.lida).length;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
