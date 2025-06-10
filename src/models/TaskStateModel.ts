import type { TaskModel } from "./TaskModel"

export type TaskStateModel = {
  task: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string; //formatar os segundos em string 00:00
  activeTask: TaskModel | null; //somente uma task ativa por vez
  currentCycle: number; //de 01 a 08, são os ciclos
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};