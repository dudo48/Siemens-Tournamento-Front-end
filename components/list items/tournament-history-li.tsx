import { Sport } from "@/utils/types";
import ListItem from "./list-item";
import { sportsIcons } from "@/utils/mappings";
import getOrdinalSuffix from "@/utils/functions";
import TournamentLi from "./tournament-li";

interface Props {
  name: string,
  sport: Sport,
  position: number
}

const TournamentHistoryLi = ({name, sport, position}: Props) => {
  return (
    <TournamentLi name={name} sport={sport}>
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