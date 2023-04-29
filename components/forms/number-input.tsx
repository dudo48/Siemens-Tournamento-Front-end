import { MouseEventHandler, PropsWithChildren, useState } from "react";
import { BsCheck, BsDashSquare, BsPen, BsPlusSquare, BsX } from "react-icons/bs";
import { GiCancel, GiCheckMark } from "react-icons/gi";
import { FaBan, FaCheck, FaPencilAlt, FaPencilRuler } from "react-icons/fa";
import LabelInput from "./label-input";

interface Props {
  attributes: {name: string, [key: string]: any},
  label: string
}

interface ButtonProps {
  onClick?: () => void
}

const EditButton = ({onClick, children}: PropsWithChildren<ButtonProps>) => {
  return (
    <button onClick={onClick} className='text-3xl'>
      {children}
    </button>
  );
}

const NumberInput = ({attributes, label}: Props) => {
  return (
    <LabelInput label={label}>
      <div className='flex items-stretch'>
        <EditButton><BsDashSquare /></EditButton>
        <input className='text-center border-y-2 border-tournamento-800 rounded w-16' type="number" {...attributes} />
        <EditButton><BsPlusSquare /></EditButton>
      </div>
    </LabelInput>
  );
}
 
export default NumberInput;