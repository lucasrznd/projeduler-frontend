import { Injectable } from '@angular/core';
import { PROJETO_PRIORIDADE_OPTIONS, PROJETO_STATUS_OPTIONS } from 'src/app/constants/dropdown-options.constant';
import { DropdownOption } from 'src/app/models/interfaces/dropdown/DropdownOption';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  getProjetoStatusOptions(): Array<DropdownOption> {
    return PROJETO_STATUS_OPTIONS;
  }

  getProjetoPrioridadeOptions(): Array<DropdownOption> {
    return PROJETO_PRIORIDADE_OPTIONS;
  }
}
