import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { ProjetoResponse } from 'src/app/models/interfaces/projetos/ProjetoResponse';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';

@Component({
  selector: 'app-projetos-home',
  templateUrl: './projetos-home.component.html',
  styleUrls: ['./projetos-home.component.scss']
})
export class ProjetosHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public projetosList: Array<ProjetoResponse> = [];

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllProjetos();
  }

  getAllProjetos(): void {
    this.projetoService.getAllProjetos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.projetosList = response;
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao buscar projetos', life: 2500 });
          this.router.navigate(['/home']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
