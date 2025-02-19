import { ProjetoResponse } from "../projetos/ProjetoResponse";
import { UsuarioResponse } from "../usuarios/UsuarioResponse";

export interface AtividadeResponse {
  id: number;
  projeto: ProjetoResponse;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  status: string;
  usuarioResponsavel: UsuarioResponse;
  dataCriacao: Date;
}
