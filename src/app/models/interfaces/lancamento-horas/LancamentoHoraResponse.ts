import { AtividadeResponse } from "../atividades/AtividadeResponse";
import { UsuarioResponse } from "../usuarios/UsuarioResponse";

export interface LancamentoHoraResponse {
  id: number;
  atividade: AtividadeResponse;
  usuario: UsuarioResponse;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  dataRegistro: Date;
}
