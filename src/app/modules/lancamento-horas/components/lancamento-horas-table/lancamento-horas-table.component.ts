import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LancamentoHoraEvent } from 'src/app/models/enums/lancamento-horas/LancamentoHoraEvent';
import { DeleteLancamentoHoraAction } from 'src/app/models/interfaces/lancamento-horas/event/DeleteLancamentoHoraAction';
import { LancamentoHoraResponse } from 'src/app/models/interfaces/lancamento-horas/LancamentoHoraResponse';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';

import { Table } from 'primeng/table';

@Component({
  selector: 'app-lancamento-horas-table',
  templateUrl: './lancamento-horas-table.component.html',
  styleUrls: ['./lancamento-horas-table.component.scss']
})
export class LancamentoHorasTableComponent {
  @Input() public lancamentoHoras: Array<LancamentoHoraResponse> = [];
  @Output() lancamentoHoraEvent = new EventEmitter<EventAction>
  @Output() deleteLancamentoHoraEvent = new EventEmitter<DeleteLancamentoHoraAction>();

  public lancamentoHoraSelected!: LancamentoHoraResponse;
  public addLancamentoHoraEvent = LancamentoHoraEvent.ADD_LANCAMENTO_HORA_EVENT;
  public editLancamentoHoraEvent = LancamentoHoraEvent.EDIT_LANCAMENTO_HORA_EVENT;

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  handleLancamentoHoraEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const lancamentoHoraEventData = id && id !== undefined ? { action, id } : { action };

      this.lancamentoHoraEvent.emit(lancamentoHoraEventData);
    }
  }

  handleDeleteLancamentoHora(id: number, nomeAtividade: string): void {
    if (id !== undefined && nomeAtividade !== '') {
      this.deleteLancamentoHoraEvent.emit({ id, nomeAtividade });
    }
  }
}
