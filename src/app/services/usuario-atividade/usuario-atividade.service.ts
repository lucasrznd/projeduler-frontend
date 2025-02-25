import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioAtividadeRequest } from 'src/app/models/interfaces/usuario-atividade/UsuarioAtividadeRequest';
import { UsuarioAtividadeResponse } from 'src/app/models/interfaces/usuario-atividade/UsuarioAtividadeResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAtividadeService {
  private API_URL = `${environment.API_URL}/usuario-atividades`;

  constructor(private http: HttpClient) { }

  addUsuarioNaAtividade(data: UsuarioAtividadeRequest): Observable<UsuarioAtividadeResponse> {
    return this.http.post<UsuarioAtividadeResponse>(this.API_URL, data);
  }

  deleteUsuarioDaAtividade(usuarioId: number, atividadeId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${usuarioId}/${atividadeId}`);
  }
}
