import { AtividadeResponse } from "../atividades/AtividadeResponse";
import { UsuarioResponse } from "../usuarios/UsuarioResponse";

export interface UsuarioAtividadeResponse {
  id: number;
  usuario: UsuarioResponse;
  atividade: AtividadeResponse;
  dataEntrada: Date;
}
