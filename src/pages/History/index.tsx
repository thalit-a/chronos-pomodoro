import { Trash2Icon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultIButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplates";

import styles from './styles.module.css'
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formateDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, SortTasksOptions } from "../../utils/sortTasks";
import { useState } from "react";

export function History() {
  const {state} = useTaskContext();
  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
    return {
      tasks: sortTasks({ tasks: state.task }),
      field: 'startDate',
      direction: 'desc'
    };
  },
);

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

  return ( 
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton icon={<Trash2Icon/>} color='red'
            aria-label='Apagar todo o histórico'
            title='Apagar todo o histórico'/>
          </span>
        </Heading>
      </Container>

      <Container>
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
      </Container>
    </MainTemplate> 
  ); 
}