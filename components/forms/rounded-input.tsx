import { FieldError } from "react-hook-form";
import { BsExclamationCircle } from "react-icons/bs";

interface Props {
  attributes: {[key: string]: any},
  error?: FieldError
}

const RoundedInput = ({attributes, error}: Props) => {
  return (
    <div className='self-stretch'>
      <input
        className={`px-4 py-1.5 rounded-full w-full ${error && 'border-2 border-red-600'}`}
        {...attributes}
      />
      <p className='px-4 flex items-center gap-4 text-red-600'>{error?.message}</p>
    </div>
  );
}
 
export default RoundedInput;