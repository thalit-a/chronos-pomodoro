import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplates";

import styles from './styles.module.css'
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formateDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { TrashIcon } from "lucide-react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function History() {
  const {state, dispatch} = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.task.length > 0;

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
    return {
      tasks: sortTasks({ tasks: state.task }),
      field: 'startDate',
      direction: 'desc'
    };
  },
);

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.task,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.task]);

  useEffect(() => {
    if(!confirmClearHistory) return

    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_STATE})
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleSortTasks({field}: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm('Tem certeza que deseja apagar o histórico?', confirmation => {
      setConfirmClearHistory(confirmation);
    });
  };

  return ( 
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton icon={<TrashIcon/>} color='red'
              aria-label='Apagar todo o histórico'
              title='Apagar todo o histórico'
              onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
        <div className={styles.responsiveTable}> 
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSortTasks({ field: 'name' })}
                  className={styles.thSort}
                  >
                  Tarefa ↕
                </th>
                <th onClick={() => handleSortTasks({ field: 'duration' })}
                  className={styles.thSort}
                  >
                  Duração ↕
                </th>
                <th onClick={() => handleSortTasks({ field: 'startDate' })}
                  className={styles.thSort}
                  >
                  Data ↕
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {sortTasksOptions.tasks.map(task => {
                const taskTypeDictionary = {
                  workTime: 'Foco',
                  shortBreakTime: 'Descanso curto',
                  longBreakTime: 'Descanso longo',
                };

                return (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.duration}min</td>
                  <td>{formatDate(task.startDate)}</td>
                  <td>{getTaskStatus(task, state.activeTask)}</td>
                  <td>{taskTypeDictionary[task.type]}</td>
                </tr>
                )
              })}
              
            </tbody>
          </table>
        </div>
        )} 

        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold '}}>
            Ainda não existem tarefas criadas.
          </p>
        )}        
      </Container>
    </MainTemplate> 
  ); 
}