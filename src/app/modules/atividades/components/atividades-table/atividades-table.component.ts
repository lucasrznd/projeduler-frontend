import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { AtividadeEvent } from 'src/app/models/enums/atividades/AtividadeEvent';
import { AtividadeResponse } from 'src/app/models/interfaces/atividades/AtividadeResponse';
import { DeleteAtividadeAction } from 'src/app/models/interfaces/atividades/event/DeleteAtividadeAction';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';

@Component({
  selector: 'app-atividades-table',
  templateUrl: './atividades-table.component.html',
  styleUrls: ['./atividades-table.component.scss']
})
export class AtividadesTableComponent {
  @Input() public atividades: Array<AtividadeResponse> = [];
  @Output() atividadeEvent = new EventEmitter<EventAction>();
  @Output() deleteAtividadeEvent = new EventEmitter<DeleteAtividadeAction>();

  public atividadeSelected!: AtividadeResponse;
  public addAtividadeEvent = AtividadeEvent.ADD_ATIVIDADE_EVENT;
  public editAtividadeEvent = AtividadeEvent.EDIT_ATIVIDADE_EVENT;

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
