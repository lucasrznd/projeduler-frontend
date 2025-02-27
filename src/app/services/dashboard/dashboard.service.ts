import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardMetricaAdmin } from 'src/app/models/interfaces/dashboard/DashboardMetricaAdmin';
import { DashboardMetricaGeral } from 'src/app/models/interfaces/dashboard/DashboardMetricaGeral';
import { UsuariosAtivos } from 'src/app/models/interfaces/dashboard/UsuariosAtivos';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_URL = `${environment.API_URL}/dashboard`;

  constructor(private http: HttpClient) { }

  getDashboardMetricaGeral(): Observable<DashboardMetricaGeral> {
    return this.http.get<DashboardMetricaGeral>(`${this.API_URL}/metricas`);
  }

  getDashboardMetricasAdmin(): Observable<DashboardMetricaAdmin> {
    return this.http.get<DashboardMetricaAdmin>(`${this.API_URL}/metricas-admin`);
  }

  getDashboardUsuariosAtivos(): Observable<UsuariosAtivos> {
    return this.http.get<UsuariosAtivos>(`${this.API_URL}/usuarios-ativos`);
  }
}
