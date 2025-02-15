import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProjetoEvent } from 'src/app/models/enums/projetos/ProjetoEvent';
import { DeleteProjetoAction } from 'src/app/models/interfaces/projetos/event/DeleteProjetoAction';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';

import { Table } from 'primeng/table';

@Component({
  selector: 'app-projetos-table',
  templateUrl: './projetos-table.component.html',
  styleUrls: ['./projetos-table.component.scss']
})
export class ProjetosTableComponent {
  @Input() public projetos: Array<ProjetoResponse> = [];
  @Output() projetoEvent = new EventEmitter<EventAction>();
  @Output() usuarioProjetoEvent = new EventEmitter<EventAction>();
  @Output() deleteProjetoEvent = new EventEmitter<DeleteProjetoAction>();

  public projetoSelected!: ProjetoResponse;
  public addProjetoEvent = ProjetoEvent.ADD_PROJETO_EVENT;
  public addUsuarioProjetoEvent = ProjetoEvent.ADD_USUARIO_PROJETO_EVENT;
  public editProjetoEvent = ProjetoEvent.EDIT_PROJETO_EVENT;

  constructor() { }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getProjetoStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PLANEJADO': 'info',
      'EM ANDAMENTO': 'warning',
      'CONCLUIDO': 'success',
      'CANCELADO': 'danger'
    };
    return statusMap[status.toUpperCase()] || 'info';
  }

  getProjetoPrioridade(prioridade: string): string {
    const priorityMap: { [key: string]: string } = {
      'ALTA': 'danger',
      'MEDIA': 'warning',
      'BAIXA': 'info',
    };
    return priorityMap[prioridade.toUpperCase()] || 'info';
  }

  handleProjetoEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const projetoEventData = id && id !== undefined ? { action, id } : { action };
      // Emitir valor do evento
      this.projetoEvent.emit(projetoEventData);
    }
  }

  handleUsuarioProjetoEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const projetoEventData = id && id !== undefined ? { action, id } : { action };
      // Emitir valor do evento
      this.usuarioProjetoEvent.emit(projetoEventData);
    }
  }

  handleDeleteProjeto(id: number, nomeProjeto: string): void {
    if (id !== undefined && nomeProjeto !== '') {
      this.deleteProjetoEvent.emit({ id, nomeProjeto });
    }
  }
}
