import { Trash2Icon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultIButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplates";

import styles from './styles.module.css'
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function History() {
  const {state} = useTaskContext()

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
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {state.task.map(task => {
                return (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.duration}min</td>
                  <td>{new Date(task.startDate).toISOString()}</td>
                  <td>{task.interruptDate}</td>
                  <td>{task.type}</td>
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