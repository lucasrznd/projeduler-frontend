import { Component, Input } from '@angular/core';

import { Table } from 'primeng/table';

import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';

@Component({
  selector: 'app-projetos-table',
  templateUrl: './projetos-table.component.html',
  styleUrls: ['./projetos-table.component.scss']
})
export class ProjetosTableComponent {
  @Input() public projetos: Array<ProjetoResponse> = [];

  public projetoSelected!: ProjetoResponse;

  constructor() { }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getProjetoStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PLANEJADO': 'info',
      'EM ANDAMENTO': 'warning',
      'CONCLUÍDO': 'success',
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

  handleProjetoEvent(): void {

  }

  handleDeleteProjeto(): void {

  }
}
