import { BsPerson, BsX } from "react-icons/bs";
import ListItem from "./list-item";
import GradientButton from "../buttons/gradient-button";
import { PropsWithChildren } from "react";
import { IoShirtOutline } from "react-icons/io5";
import CircledIcon from "../misc/circled-icon";

interface Props {
  homeTeam: string,
  awayTeam: string
}

const MatchLi = ({homeTeam, awayTeam, children}: PropsWithChildren<Props>) => {
  return (
    <li className='flex justify-between items-center group'>
      <div className='flex items-center'>
        <CircledIcon icon={IoShirtOutline} />
        <p className='pl-2 text-lg'>{homeTeam}</p>
      </div>
      <div className='font-semibold text-tournamento-400 text-2xl'>{children}</div>
      <div className='flex items-center'>
        <CircledIcon icon={IoShirtOutline} />
        <p className='pl-2 text-lg'>{awayTeam}</p>
      </div>
    </li>
  );
}
 
export default MatchLi;