import './styles/theme.css';
import './styles/global.css';

import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';

  export function App() {
    return ( 
      <> 
        <Container>
          <Logo/>
        </Container>

        <Container>
          <Menu/>
        </Container>

        <Container>
          <CountDown/>
        </Container>

        <Container>
          <form className='form' action="">
            <div className='formRow'>
              <DefaultInput labelText='task' id='meuInput' type='text'/>
            </div>

            <div className='formRow'>
              <p> Texto</p>
            </div>

            <div className='formRow'>
              <p> Ciclos</p>
              <p>00000000</p>
            </div>

            <div className='formRow'>
              <button>Enviar</button>
            </div>
          </form>
        </Container>
      </>
    ); 
  }