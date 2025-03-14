import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AtividadeEvent } from 'src/app/models/enums/atividades/AtividadeEvent';
import { AtividadeResponse } from 'src/app/models/interfaces/atividades/AtividadeResponse';
import { DeleteAtividadeAction } from 'src/app/models/interfaces/atividades/event/DeleteAtividadeAction';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';

import { Table } from 'primeng/table';
@Component({
  selector: 'app-atividades-table',
  templateUrl: './atividades-table.component.html',
  styleUrls: ['./atividades-table.component.scss']
})
export class AtividadesTableComponent implements AfterViewInit {
  @Input() public atividades: Array<AtividadeResponse> = [];
  @Output() atividadeEvent = new EventEmitter<EventAction>();
  @Output() deleteAtividadeEvent = new EventEmitter<DeleteAtividadeAction>();
  @ViewChild('atividadesTable') dt!: Table;
  statusSelecionado: string | null = null;

  public atividadeSelected!: AtividadeResponse;
  public addAtividadeEvent = AtividadeEvent.ADD_ATIVIDADE_EVENT;
  public editAtividadeEvent = AtividadeEvent.EDIT_ATIVIDADE_EVENT;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.filtrarPorStatus();
    this.filtrarPorNome();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAtividadeStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'ABERTA': 'info',
      'EM ANDAMENTO': 'warning',
      'CONCLUIDA': 'success',
      'PAUSADA': 'danger'
    };
    return statusMap[status.toUpperCase()] || 'info';
  }

  filtrarPorNome(): void {
    this.route.queryParams.subscribe(params => {
      if (params['nome']) {
        const nomeSelecionado = params['nome'];

        if (this.dt) {
          this.dt.filters['nome'] = [{ value: nomeSelecionado, matchMode: 'contains' }];
        }

        this.cdr.detectChanges();
      }
    });
  }

  filtrarPorStatus(): void {
    this.route.queryParams.subscribe(params => {
      if (params['status']) {
        const statusSelecionado = params['status'];

        if (this.dt) {
          this.dt.filters['status'] = [{ value: statusSelecionado, matchMode: 'equals' }];
        }

        this.cdr.detectChanges();
      }
    });
  }

  handleAtividadeEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const atividadeEventData = id && id !== undefined ? { action, id } : { action };

      this.atividadeEvent.emit(atividadeEventData);
    }
  }

  handleDeleteAtividade(id: number, nomeAtividade: string): void {
    if (id !== undefined && nomeAtividade !== '') {
      this.deleteAtividadeEvent.emit({ id, nomeAtividade });
    }
  }
}
