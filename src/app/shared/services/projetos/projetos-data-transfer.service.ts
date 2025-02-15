import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';

@Injectable({
  providedIn: 'root'
})
export class ProjetosDataTransferService {
  public projetosDataEmitter$ = new BehaviorSubject<Array<ProjetoResponse> | null>(null);
  public projetosData: Array<ProjetoResponse> = [];

  setProjetoData(projetosDatas: Array<ProjetoResponse>): void {
    if (projetosDatas) {
      this.projetosDataEmitter$.next(projetosDatas);
      this.getProjetoData();
    }
  }

  getProjetoData(): Array<ProjetoResponse> {
    this.projetosDataEmitter$
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if (response) {
            this.projetosData = response;
          }
        }
      });

    return this.projetosData;
  }
}
