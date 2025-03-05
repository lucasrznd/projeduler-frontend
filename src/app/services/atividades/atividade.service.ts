import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AtividadeRequest } from 'src/app/models/interfaces/atividades/AtividadeRequest';
import { AtividadeResponse } from 'src/app/models/interfaces/atividades/AtividadeResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  private API_URL = `${environment.API_URL}/atividades`;

  constructor(private http: HttpClient) { }

  getAllAtividades(): Observable<Array<AtividadeResponse>> {
    return this.http.get<Array<AtividadeResponse>>(this.API_URL);
  }

  getAllAtividadesAtrasadas(): Observable<Array<AtividadeResponse>> {
    return this.http.get<Array<AtividadeResponse>>(`${this.API_URL}/atrasadas`);
  }

  createAtividade(data: AtividadeRequest): Observable<AtividadeResponse> {
    return this.http.post<AtividadeResponse>(this.API_URL, data);
  }

  editAtividade(id: number, data: AtividadeRequest): Observable<AtividadeResponse> {
    return this.http.put<AtividadeResponse>(`${this.API_URL}/${id}`, data);
  }

  deleteAtividade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
