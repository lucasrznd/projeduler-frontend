import { Injectable } from '@angular/core';

import { ATIVIDADE_STATUS_OPTIONS, PROJETO_PRIORIDADE_OPTIONS, PROJETO_STATUS_OPTIONS, USUARIO_PERFIS_OPTIONS } from 'src/app/constants/dropdown-options.constant';
import { DropdownOption } from 'src/app/models/interfaces/dropdown/DropdownOption';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  getUsuarioPerfisOptions(): Array<DropdownOption> {
    return USUARIO_PERFIS_OPTIONS;
  }

  getProjetoStatusOptions(): Array<DropdownOption> {
    return PROJETO_STATUS_OPTIONS;
  }

  getProjetoPrioridadeOptions(): Array<DropdownOption> {
    return PROJETO_PRIORIDADE_OPTIONS;
  }

  getAtividadeStatusOptions(): Array<DropdownOption> {
    return ATIVIDADE_STATUS_OPTIONS;
  }
}
