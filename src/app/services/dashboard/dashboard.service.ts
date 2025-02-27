import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardMetricaGeral } from 'src/app/models/interfaces/dashboard/DashboardMetricaGeral';
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
}
