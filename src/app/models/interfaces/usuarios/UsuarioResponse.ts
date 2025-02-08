export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  dataCriacao: Date,
  ultimoLogin: Date
  perfil: string;
}
