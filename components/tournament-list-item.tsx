import sportsIcons from "@/utils/sports-icons";
import { Sport } from "@/utils/types";
import { IconType } from "react-icons";
import getOrdinalSuffix from "@/utils/functions";

interface Props {
  name: string,
  sport: string,
  position: number
}

const TournamentListItem = ({ sport, name, position }: Props) => {
  // convert string to Sport enum then get icon
  const Icon = sportsIcons.get(Sport[sport as keyof typeof Sport]) as IconType;

  return (
    <li className='flex justify-between group'>
      <div className='flex items-center'>
        <div className='rounded-full border-4 p-1 border-tournamento-400 text-tournamento-400 duration-200'>
          <Icon className='text-4xl' />
        </div>
        <div className='pl-2'>
          <p className='text-xl'>{name}</p>
          <p className='text-sm'>{sport}</p>
        </div>
      </div>
      <p>
        <span className='text-tournamento-400 text-4xl duration-200'>
          {position}
        </span>
        {getOrdinalSuffix(position)}
      </p>
    </li>
  );
}
 
export default TournamentListItem;