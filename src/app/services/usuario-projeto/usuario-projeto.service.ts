import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUsuarioProjeto } from 'src/app/models/interfaces/usuario-projeto/UpdateUsuarioProjeto';
import { UsuarioProjetoRequest } from 'src/app/models/interfaces/usuario-projeto/UsuarioProjetoRequest';
import { UsuarioProjetoResponse } from 'src/app/models/interfaces/usuario-projeto/UsuarioProjetoResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioProjetoService {
  private API_URL = `${environment.API_URL}/usuario-projetos`;

  constructor(private http: HttpClient) { }

  addUsuarioAoProjeto(data: UsuarioProjetoRequest): Observable<UsuarioProjetoResponse> {
    return this.http.post<UsuarioProjetoResponse>(this.API_URL, data);
  }

  deleteUsuarioDoProjeto(usuarioId: number, projetoId: number) {
    return this.http.delete(`${this.API_URL}/${usuarioId}/${projetoId}`);
  }
}
