import { Sport } from "@/utils/types";
import ListItem from "./list-item";
import { sportsIcons, sportsNames } from "@/utils/mappings";
import getOrdinalSuffix from "@/utils/functions";

interface Props {
  name: string,
  sport: string,
  position: number
}

const FinishedTournamentLi = ({name, sport, position}: Props) => {
  const sportEnum: Sport = Sport[sport as keyof typeof Sport];

  return (
    <ListItem icon={sportsIcons.get(sportEnum)} title={name} subtitle={sportsNames.get(sportEnum)}>
      <p>
        <span className='text-tournamento-400 text-4xl'>
          {position}
        </span>
        {getOrdinalSuffix(position)}
      </p>
    </ListItem>
  );
}
 
export default FinishedTournamentLi;