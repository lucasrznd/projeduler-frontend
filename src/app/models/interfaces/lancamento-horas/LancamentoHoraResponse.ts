import { AtividadeResponse } from "../atividades/AtividadeResponse";
import { UsuarioResponse } from "../usuarios/UsuarioResponse";

export interface LancamentoHoraResponse {
  atividade: AtividadeResponse;
  usuario: UsuarioResponse;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  dataRegistro: Date;
}
