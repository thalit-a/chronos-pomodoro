import type { TaskModel } from "../models/TaskModel";

export function getNextCycleType(currentCycle: number): TaskModel['type'] {
  if (currentCycle % 8 === 0 ) return 'longBreakTime'; //se o resto da divisão entre currentCycle e 8 for = 0 retorna longBreak
  if (currentCycle % 2 === 0 ) return 'shortBreakTime'; //se o resto da divisão entre currentCycle e 2 for = 0 (quer dizer que é um número par) retorna short
  return 'workTime'; //o que não for nenhuma das asnternativas acima (quer dizer que número ímpar) retorna work
}