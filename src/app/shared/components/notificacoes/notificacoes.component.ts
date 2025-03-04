import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
    this.findAllNotificacoes();
  }

  marcarComoLida(notificacao: any): void {
    this.notificacaoService.marcarComoLida(notificacao.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.findAllNotificacoes();
          this.contadorNotificacoes--;
        }
      });
  }

  findAllNotificacoes(): void {
    this.notificacaoService.findAllNotificacoes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.notificacoes = response;
            this.contadorNotificacoes = response.length;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
