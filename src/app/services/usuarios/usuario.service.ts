import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = `${environment.API_URL}/usuarios`;

  constructor(
    private http: HttpClient
  ) { }

  getAllUsuarios(): Observable<Array<UsuarioResponse>> {
    return this.http.get<Array<UsuarioResponse>>(this.API_URL);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
