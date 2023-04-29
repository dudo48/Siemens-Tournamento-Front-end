import { useState } from "react";
import { BsCheck, BsCheckCircle } from "react-icons/bs";
import LabelInput from "./label-input";

interface Props {
  attributes: {name: string, [key: string]: any},
  label: string,
  choices: string[]
}

interface ButtonProps {
  attributes: {name: string, [key: string]: any},
  label: string,
}

const RadioButton = ({attributes, label}: ButtonProps) => {
  return (
    <label className='flex items-center gap-1' >
      <input className='hidden peer' type='radio' {...attributes} value={label} />
      <BsCheckCircle className='opacity-5 peer-checked:opacity-100' />
      <div>{label}</div>
    </label>
  );
}

const RadioGroup = ({attributes, label, choices}: Props) => {
  return (
    <LabelInput label={label}>
      <div className='flex justify-around'>
        {
          choices.map((label: string, i: number) => <RadioButton key={`${attributes.name}-${i}`} attributes={attributes} label={label} />)
        }
      </div>
    </LabelInput>
  );
}
 
export default RadioGroup;