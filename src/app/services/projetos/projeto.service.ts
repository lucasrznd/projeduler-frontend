import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  private API_URL = `${environment.API_URL}/projetos`;

  constructor(private http: HttpClient) { }

  getAllProjetos(): Observable<Array<ProjetoResponse>> {
    return this.http.get<Array<ProjetoResponse>>(this.API_URL);
  }
}
