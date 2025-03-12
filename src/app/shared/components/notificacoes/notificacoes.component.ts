import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { NotificacaoResponse } from 'src/app/models/interfaces/notificacoes/NotificacaoResponse';
import { NotificacaoService } from 'src/app/services/notificacoes/notificacao.service';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  public notificacoes: Array<NotificacaoResponse> = [];
  contadorNotificacoes!: number;

  constructor(private notificacaoService: NotificacaoService) { }

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
        }
      });
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
