import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { AtividadePorStatusResponse } from 'src/app/models/interfaces/relatorios/AtividadePorStatusResponse';
import { HorasPorMesResponse } from 'src/app/models/interfaces/relatorios/HorasPorMesResponse';
import { HorasPorProjetoResponse } from 'src/app/models/interfaces/relatorios/HorasPorProjetoResponse';
import { TopUsuarioResponse } from 'src/app/models/interfaces/relatorios/TopUsuarioResponse';
import { UsuarioResponse } from 'src/app/models/interfaces/usuarios/UsuarioResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private API_URL = `${environment.API_URL}/relatorios`;

  constructor(private http: HttpClient) { }

  listarProjetos(): Observable<Array<ProjetoResponse>> {
    return this.http.get<Array<ProjetoResponse>>(`${environment.API_URL}/projetos`);
  }

  listarUsuarios(): Observable<Array<UsuarioResponse>> {
    return this.http.get<Array<UsuarioResponse>>(`${environment.API_URL}/usuarios`);
  }

  buscarHorasPorProjeto(filtros: any): Observable<Array<HorasPorProjetoResponse>> {
    let params = this.construirParametros(filtros);
    return this.http.get<Array<HorasPorProjetoResponse>>(`${this.API_URL}/horas-por-projeto`, { params });
  }

  buscarHorasPorMes(filtros: any): Observable<Array<HorasPorMesResponse>> {
    let params = this.construirParametros(filtros);
    return this.http.get<Array<HorasPorMesResponse>>(`${this.API_URL}/horas-por-mes`, { params });
  }

  buscarAtividadesPorStatus(filtros: any): Observable<Array<AtividadePorStatusResponse>> {
    let params = this.construirParametros(filtros);
    return this.http.get<Array<AtividadePorStatusResponse>>(`${this.API_URL}/atividades-por-status`, { params });
  }

  buscarTopUsuariosPorHoras(filtros: any): Observable<Array<TopUsuarioResponse>> {
    let params = this.construirParametros(filtros);
    return this.http.get<Array<TopUsuarioResponse>>(`${this.API_URL}/top-usuarios-por-horas`, { params });
  }

  private construirParametros(filtros: any): HttpParams {
    let params = new HttpParams();

    if (filtros.dataInicio) {
      params = params.set('dataInicio', this.formatarData(filtros.dataInicio));
    }

    if (filtros.dataFim) {
      params = params.set('dataFim', this.formatarData(filtros.dataFim));
    }

    if (filtros.projetoId) {
      params = params.set('projetoId', filtros.projetoId);
    }

    if (filtros.usuarioId) {
      params = params.set('usuarioId', filtros.usuarioId);
    }

    if (filtros.status) {
      params = params.set('status', filtros.status);
    }

    return params;
  }

  private formatarData(data: Date): string {
    return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
  }
}
