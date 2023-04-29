import { Sport } from "@/utils/types";
import ListItem from "./list-item";
import { sportsIcons } from "@/utils/mappings";
import getOrdinalSuffix from "@/utils/functions";

interface Props {
  name: string,
  sport: Sport,
  position: number
}

const FinishedTournamentLi = ({name, sport, position}: Props) => {
  return (
    <ListItem icon={sportsIcons.get(sport)} title={name} subtitle={sport}>
      <p>
        <span className='text-tournamento-400 text-3xl'>
          {position}
        </span>
        {getOrdinalSuffix(position)}
      </p>
    </ListItem>
  );
}
 
export default FinishedTournamentLi;