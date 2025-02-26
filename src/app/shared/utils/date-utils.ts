export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;

  const [datePart, timePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);

  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);

  if (timePart) {
    const [horas, minutos, segundos] = timePart.split(':');
    date.setHours(parseInt(horas));
    date.setMinutes(parseInt(minutos));
    date.setSeconds(parseInt(segundos));
  }

  return date;
}

export function calcularDiferencaHora(horarioInicio: Date | null, horarioFinal: Date | null): string {
  if (!horarioInicio || !horarioFinal) {
    return '00:00';
  }

  const inicio = new Date(horarioInicio);
  const fim = new Date(horarioFinal);

  // Deixando as datas no mesmo dia caso o componente do PrimeNG crie com dias diferentes
  const hoje = new Date();
  inicio.setFullYear(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  fim.setFullYear(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

  // Calcular diferença em milisegundos
  let diffMs = fim.getTime() - inicio.getTime();

  // 60000 ms = 1 minuto
  diffMs = Math.round(diffMs / 60000) * 60000;

  // Converter para horas e minutos
  const horas = Math.floor(diffMs / (1000 * 60 * 60));
  const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  // Formatar para "HH:MM"
  const horaFormatada = String(Math.abs(horas)).padStart(2, '0');
  const minutoFormatado = String(Math.abs(minutos)).padStart(2, '0');

  // Diferença negativa
  if (diffMs < 0 && (horas !== 0 || minutos !== 0)) {
    return `-${horaFormatada}:${minutoFormatado}`;
  }

  return `${horaFormatada}:${minutoFormatado}`;
}
