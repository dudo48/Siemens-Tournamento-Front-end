import { Sport } from "@/utils/types";
import ListItem from "./list-item";
import { sportsIcons, sportsNames } from "@/utils/mappings";
import getOrdinalSuffix from "@/utils/functions";
import GradientButton from "./gradient-button";

interface Props {
  name: string,
  sport: string
}

const TournamentLi = ({name, sport}: Props) => {
  const sportEnum: Sport = Sport[sport as keyof typeof Sport];

  return (
    <ListItem icon={sportsIcons.get(sportEnum)} title={name} subtitle={sportsNames.get(sportEnum)}>
      <GradientButton type='light'>Join</GradientButton>
    </ListItem>
  );
}
 
export default TournamentLi;