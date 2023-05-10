import { BsCheckCircle } from "react-icons/bs";
import LabelInput from "./label-input";
import { FieldError } from "react-hook-form";

interface Props {
  attributes: {name: string, [key: string]: any},
  label: string,
  choices: any[],
  error?: FieldError
}

interface ButtonProps {
  attributes: {[key: string]: any},
  choice: string
}

const RadioButton = ({attributes, choice}: ButtonProps) => {
  return (
    <label className='flex items-center gap-1' >
      <input className='hidden peer' type='radio' {...attributes} value={choice} />
      <BsCheckCircle className='opacity-5 peer-checked:opacity-100' />
      <div>{choice}</div>
    </label>
  );
}

const RadioGroup = ({attributes, label, choices, error}: Props) => {
  return (
    <div>
      <LabelInput label={label}>
        <div className='flex justify-between px-1 max-w-md'>
          {choices.map((choice, i: number) => <RadioButton key={`${attributes.name}-${i}`} attributes={attributes} choice={choice} />)}
        </div>
      </LabelInput>
      {error && <p className='text-red-600'>{error.message}</p>}
    </div>
  );
}
 
export default RadioGroup;