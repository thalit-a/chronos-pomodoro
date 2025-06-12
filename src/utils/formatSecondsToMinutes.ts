export function formatSecondsToMinutes(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0'); //divide os segundos totais por 60 e arredonda para um resultado preciso, transformando segundos em minutos
  const secondsMod = String(Math.floor(seconds % 60)).padStart(2, '0'); // (% significa restante) pega o restante dos segundos 
  return `${minutes}:${secondsMod}`;
}
