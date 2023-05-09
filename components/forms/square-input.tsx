import { MouseEventHandler, PropsWithChildren, useState } from "react";
import { BsCheck, BsPen, BsX } from "react-icons/bs";
import { GiCancel, GiCheckMark } from "react-icons/gi";
import { FaBan, FaCheck, FaPencilAlt, FaPencilRuler } from "react-icons/fa";
import LabelInput from "./label-input";
import { FieldError } from "react-hook-form/dist/types";

interface Props {
  attributes: {name: string, [key: string]: any},
  label: string,
  error?: FieldError
}

const SquareInput = ({attributes, error, label}: Props) => {
  return (
    <div className='self-stretch'>
      <LabelInput label={label}>
        <input className={`p-1 border-b-2 w-full ${error ? 'border-b-red-600' : 'border-b-tournamento-400'}`}
          {...attributes}
        />
      </LabelInput>
      {error && <p className='text-red-600'>{error.message}</p>}
    </div>
  );
}
 
export default SquareInput;