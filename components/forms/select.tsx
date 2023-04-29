import LabelInput from "./label-input";

interface Props {
  attributes: {name: string, [key: string]: any},
  label: string,
  choices: string[] | number[],
  values?: string[] | number[],
}

const Select = ({attributes, label, choices, values}: Props) => {
  return (
    <LabelInput label={label}>
      <select className='rounded-lg bg-transparent border-2 border-tournamento-800 py-0.5 px-8' {...attributes}>
        <option value=''>--Please select an option--</option>
        {choices.map((label: string | number, i: number) => <option key={`${attributes.name}-${i}`} value={values ? values[i] : label}>{label}</option>)}
      </select>
    </LabelInput>
  );
}
 
export default Select;