import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificacaoResponse } from 'src/app/models/interfaces/notificacoes/NotificacaoResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private API_URL = `${environment.API_URL}/notificacoes`;

  constructor(private http: HttpClient) { }

  findAllNotificacoes(): Observable<Array<NotificacaoResponse>> {
    return this.http.get<Array<NotificacaoResponse>>(this.API_URL);
  }

  marcarComoLida(notificacaoId: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${notificacaoId}/marcar-lida`, {});
  }
}
