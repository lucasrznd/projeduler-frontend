import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuariosDataTransferService {
  public usuariosDataEmitter$ = new BehaviorSubject<Array<UsuarioResponse> | null>(null);
  public usuariosDatas: Array<UsuarioResponse> = [];

  setUsuarioData(usuariosDatas: Array<UsuarioResponse>): void {
    if (usuariosDatas) {
      this.usuariosDataEmitter$.next(usuariosDatas);
      this.getUsuarioData();
    }
  }

  getUsuarioData(): Array<UsuarioResponse> {
    this.usuariosDataEmitter$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.usuariosDatas = response;
          }
        },
      });

    return this.usuariosDatas;
  }
}
