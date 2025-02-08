import { Component, Input } from '@angular/core';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.scss']
})
export class UsuariosTableComponent {
  @Input() usuarios: Array<UsuarioResponse> = [];

  public usuarioSelected!: UsuarioResponse;
}
