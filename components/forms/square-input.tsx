import { MouseEventHandler, PropsWithChildren, useState } from "react";
import { BsCheck, BsPen, BsX } from "react-icons/bs";
import { GiCancel, GiCheckMark } from "react-icons/gi";
import { FaBan, FaCheck, FaPencilAlt, FaPencilRuler } from "react-icons/fa";
import LabelInput from "./label-input";

interface Props {
  attributes: {name: string, [key: string]: any},
  label: string
}

const SquareInput = ({attributes, label}: Props) => {
  return (
    <LabelInput label={label}>
      <input className='p-1 border-b-tournamento-400 border-b-2'
        {...attributes}
      />
    </LabelInput>
  );
}
 
export default SquareInput;