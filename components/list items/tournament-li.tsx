import { Sport } from "@/utils/types";
import ListItem from "./list-item";
import { sportsIcons } from "@/utils/mappings";
import getOrdinalSuffix from "@/utils/functions";
import GradientButton from "../buttons/gradient-button";

interface Props {
  name: string,
  sport: Sport
}

const TournamentLi = ({name, sport}: Props) => {
  return (
    <ListItem icon={sportsIcons.get(sport)} title={name} subtitle={sport}>
      <GradientButton type='light'>Join</GradientButton>
    </ListItem>
  );
}
 
export default TournamentLi;