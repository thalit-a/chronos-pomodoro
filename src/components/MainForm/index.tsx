import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultIButton";
import { DefaultInput } from "../DefaultInput";

export function MainForm() {
  return (
    <form className='form' action="">
      <div className='formRow'>
        <DefaultInput
          labelText='task' 
          id='meuInput2' 
          type='text'
          placeholder='Digite algo'
        />
      </div>

      <div className='formRow'>
        <p> Texto</p>
      </div>

      <div className='formRow'>
        <Cycles/>
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon/>}/>
      </div>
    </form>
);
}