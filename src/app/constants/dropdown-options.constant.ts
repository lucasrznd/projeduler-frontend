import { ProjetoPrioridade } from './../models/enums/projetos/ProjetoPrioridade';
import { PerfilEnum } from "../models/enums/perfis/PerfilEnum";
import { ProjetoStatus } from "../models/enums/projetos/ProjetoStatus";
import { DropdownOption } from "../models/interfaces/dropdown/DropdownOption";
import { AtividadeStatus } from '../models/enums/atividades/AtividadeStatus';

export const USUARIO_PERFIS_OPTIONS: DropdownOption[] = [
  { label: 'Administrador', value: PerfilEnum.ADMIN },
  { label: 'Usuário', value: PerfilEnum.USER },
];

export const PROJETO_STATUS_OPTIONS: DropdownOption[] = [
  { label: 'Planejado', value: ProjetoStatus.PLANEJADO },
  { label: 'Em Andamento', value: ProjetoStatus.EM_ANDAMENTO },
  { label: 'Concluído', value: ProjetoStatus.CONCLUIDO },
  { label: 'Cancelado', value: ProjetoStatus.CANCELADO },
];

export const PROJETO_PRIORIDADE_OPTIONS: DropdownOption[] = [
  { label: 'Alta', value: ProjetoPrioridade.ALTA },
  { label: 'Média', value: ProjetoPrioridade.MEDIA },
  { label: 'Baixa', value: ProjetoPrioridade.BAIXA }
];

export const ATIVIDADE_STATUS_OPTIONS: DropdownOption[] = [
  { label: 'Aberta', value: AtividadeStatus.ABERTA },
  { label: 'Em Andamento', value: AtividadeStatus.EM_ANDAMENTO },
  { label: 'Concluída', value: AtividadeStatus.CONCLUIDA },
  { label: 'Pausada', value: AtividadeStatus.PAUSADA },
];
