import { FieldError } from "react-hook-form";
import LabelInput from "./label-input";

interface Props {
  attributes: {name: string, [key: string]: any},
  label: string,
  choices: any[],
  error?: FieldError
}

const Select = ({attributes, label, choices, error}: Props) => {
  return (
    <div>
      <LabelInput label={label}>
        <select className={`w-full rounded-lg bg-transparent border-2 ${error ? 'border-red-600' : 'border-tournamento-800'} py-0.5 px-8`} {...attributes}>
          <option disabled className='hidden' value=''>--Please select an option--</option>
          {choices.map((choice, i: number) => (
            <option className='bg-transparent' key={`${attributes.name}-${i}`} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </LabelInput>
      {error && <p className='text-red-600'>{error.message}</p>}
    </div>
  );
}
 
export default Select;