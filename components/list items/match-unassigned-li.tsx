import { BsPerson, BsPlusLg, BsX } from "react-icons/bs";
import ListItem from "./list-item";
import GradientButton from "../buttons/gradient-button";
import { PropsWithChildren } from "react";
import { IoShirtOutline } from "react-icons/io5";
import CircledIcon from "../misc/circled-icon";
import CircledIconButton from "../buttons/circled-icon-button";

const MatchUnassignedLi = () => {
  return (
    <li className='flex justify-between items-center group'>
      <div className='flex items-center'>
        <CircledIconButton icon={BsPlusLg} />
      </div>
      <div className='font-semibold text-tournamento-400 text-2xl'>VS</div>
      <div className='flex items-center'>
        <CircledIconButton icon={BsPlusLg} />
      </div>
    </li>
  );
}
 
export default MatchUnassignedLi;