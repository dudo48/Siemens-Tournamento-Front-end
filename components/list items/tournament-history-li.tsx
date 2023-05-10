import { Sport } from "@/utils/types";
import ListItem from "./list-item";
import { sportsIcons } from "@/utils/mappings";
import TournamentLi from "./tournament-li";
import { getOrdinalSuffix } from "@/utils/functions";

interface Props {
  name: string,
  sport: Sport,
  position: number,
  id: number
}

const TournamentHistoryLi = ({id, name, sport, position}: Props) => {
  return (
    <TournamentLi id={id} name={name} sport={sport}>
      <p>
        <span className='text-tournamento-400 text-3xl'>
          {position}
        </span>
        {getOrdinalSuffix(position)}
      </p>
    </TournamentLi>
  );
}
 
export default TournamentHistoryLi;