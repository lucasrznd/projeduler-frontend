import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { UsuarioEvent } from 'src/app/models/enums/usuarios/UsuarioEvent';
import { DeleteUsuarioAction } from 'src/app/models/interfaces/usuarios/event/DeleteUsuarioAction';
import { EventAction } from 'src/app/models/interfaces/usuarios/event/EventAction';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.scss']
})
export class UsuariosTableComponent {
  @Input() usuarios: Array<UsuarioResponse> = [];
  @Output() usuarioEvent = new EventEmitter<EventAction>();
  @Output() deleteUsuarioEvent = new EventEmitter<DeleteUsuarioAction>();

  public usuarioSelected!: UsuarioResponse;
  public addUsuarioEvent = UsuarioEvent.ADD_USUARIO_EVENT;
  public editUsuarioEvent = UsuarioEvent.EDIT_USUARIO_EVENT;

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  handleUsuarioEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const usuarioEventData = id && id !== undefined ? { action, id } : { action };
      // Emitir valor do evento
      this.usuarioEvent.emit(usuarioEventData);
    }
  }

  handleDeleteUsuario(id: number, email: string): void {
    if (id !== undefined && email !== '') {
      this.deleteUsuarioEvent.emit({ id, email });
    }
  }
}
