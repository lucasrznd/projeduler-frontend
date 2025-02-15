import { ProjetoResponse } from "../projetos/ProjetoResponse";
import { UsuarioResponse } from "../usuarios/UsuarioResponse";

export interface UsuarioProjetoResponse {
  id: number;
  usuario: UsuarioResponse,
  projeto: ProjetoResponse,
  dataEntrada: Date
}
