import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsuarioRequest } from 'src/app/models/interfaces/usuarios/UsuarioRequest';
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

  findAllUsuariosByProjetoId(projetoId: number): Observable<Array<UsuarioResponse>> {
    return this.http.get<Array<UsuarioResponse>>(`${this.API_URL}/projeto/${projetoId}`);
  }

  findAllUsuariosDisponiveis(projetoId: number): Observable<Array<UsuarioResponse>> {
    return this.http.get<Array<UsuarioResponse>>(`${this.API_URL}/projeto/${projetoId}/disponiveis`);
  }

  findAllUsuariosByAtividadeId(atividadeId: number): Observable<Array<UsuarioResponse>> {
    return this.http.get<Array<UsuarioResponse>>(`${this.API_URL}/atividade/${atividadeId}`);
  }

  createUsuario(data: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.API_URL, data);
  }

  editUsuario(id: number, data: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.API_URL}/${id}`, data);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
