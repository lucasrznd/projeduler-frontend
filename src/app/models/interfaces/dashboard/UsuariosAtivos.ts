export interface UsuariosAtivos {
  quantidade: number;
  usuariosAtivos: Array<{ email: string, atividade: number }>;
}
