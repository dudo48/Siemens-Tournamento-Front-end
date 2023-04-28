import { MouseEventHandler, PropsWithChildren, useState } from "react";
import { BsCheck, BsPen, BsX } from "react-icons/bs";
import { GiCancel, GiCheckMark } from "react-icons/gi";
import { FaBan, FaCheck, FaPencilAlt, FaPencilRuler } from "react-icons/fa";

interface Props {
  attributes: {[key: string]: any},
  label: string
}

const EditInput = ({attributes, label}: Props) => {
  return (
    <div className='w-full flex flex-col border-b-tournamento-400 border-b-2'>
      <label htmlFor={attributes.name}>{label}</label>
      <input className='w-full p-0.5 '
        id={attributes.name}
        {...attributes}
      />
    </div>
  );
}
 
export default EditInput;