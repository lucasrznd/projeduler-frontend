export interface AtividadeRequest {
  projetoId: number;
  nome: string;
  descricao: string;
  dataInicio?: Date;
  dataFim?: Date;
  status: string;
  usuarioResponsavelId: number;
}
