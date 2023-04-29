import { MouseEventHandler, PropsWithChildren, useState } from "react";
import { BsCheck, BsPen, BsX } from "react-icons/bs";
import { GiCancel, GiCheckMark } from "react-icons/gi";
import { FaBan, FaCheck, FaPencilAlt, FaPencilRuler } from "react-icons/fa";

interface Props {
  id?: string,
  label: string
}

const LabelInput = ({label, children}: PropsWithChildren<Props>) => {
  const labelBeforeStyle = 'before:absolute before:bottom-1 before:-left-2 before:w-1 before:h-3 before:bg-gradient-to-t before:from-tournamento-400 before:to-tournamento-700';

  return (
    <label className='w-full flex flex-col gap-1'>
      <div className={`font-semibold relative ${labelBeforeStyle}`}>{label}</div>
      {children}
    </label>
  );
}
 
export default LabelInput;