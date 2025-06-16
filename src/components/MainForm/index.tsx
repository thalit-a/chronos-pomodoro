import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultIButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.task[state.task.length -1]?.name || '';

  //ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handlerCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();
    
    if (taskNameInput.current === null) return;

    const taksName = taskNameInput.current.value.trim(); //se o campo taskName vier vazio

    if (!taksName) {
      showMessage.warn('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taksName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    showMessage.success('Tarefa iniciada');
  }

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida!');
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handlerCreateNewTask} className='form' action="">
      <div className='formRow'>
        <DefaultInput
          labelText='task' 
          id='meuInput' 
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className='formRow'>
        <Tips/>
      </div>

      {state.currentCycle > 0 && (
      <div className='formRow'>
        <Cycles/>
      </div>
      )}

      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton 
          aria-label='Iniciar nova tarefa'
          title='Iniciar nova tarefa'
          type='submit'
          icon={<PlayCircleIcon/>}
          key='botao_submit'
          />
        )} 
        
        {!!state.activeTask && (
          <DefaultButton 
          arial-label='Interromper tarefa atual'
          title='Interromper tarefa atual'
          type='button'
          color='red'
          icon={<StopCircleIcon/>}
          onClick={handleInterruptTask}
          key='botao_button'
          />
        )} 
      </div>
    </form>
);
}