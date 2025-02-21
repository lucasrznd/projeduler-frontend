import { LancamentoHoraRequest } from './../../models/interfaces/lancamento-horas/LancamentoHoraRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LancamentoHoraResponse } from 'src/app/models/interfaces/lancamento-horas/LancamentoHoraResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoHorasService {
  private API_URL = `${environment.API_URL}/lancamentos-horas`;

  constructor(private http: HttpClient) { }

  getAllLancamentosHoras(): Observable<Array<LancamentoHoraResponse>> {
    return this.http.get<Array<LancamentoHoraResponse>>(this.API_URL);
  }

  createLancamentoHora(data: LancamentoHoraRequest): Observable<LancamentoHoraResponse> {
    return this.http.post<LancamentoHoraResponse>(this.API_URL, data);
  }

  editLancamentoHora(id: number, data: LancamentoHoraRequest): Observable<LancamentoHoraResponse> {
    return this.http.put<LancamentoHoraResponse>(`${this.API_URL}/${id}`, data);
  }

  deleteLancamentoHora(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
