export interface ProjetoRequest {
  nome: string;
  descricao?: string;
  dataInicio?: Date;
  dataFim?: Date;
  status: string;
  usuarioResponsavelId: number;
  prioridade?: string;
}
