export interface ProjetoResponse {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  status: string;
  usuarioResponsavel: {
    nome: string;
    email: string;
  };
  dataCriacao: Date;
  prioridade: string;
}
