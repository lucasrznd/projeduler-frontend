import { Component, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { AtividadeResponse } from 'src/app/models/interfaces/atividades/AtividadeResponse';

@Component({
  selector: 'app-atividades-table',
  templateUrl: './atividades-table.component.html',
  styleUrls: ['./atividades-table.component.scss']
})
export class AtividadesTableComponent {

  @Input() public atividades: Array<AtividadeResponse> = [];

  public atividadeSelected!: AtividadeResponse;

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

}
