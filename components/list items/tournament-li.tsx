import { Sport } from "@/utils/types";
import ListItem from "./list-item";
import { sportsIcons } from "@/utils/mappings";
import getOrdinalSuffix from "@/utils/functions";
import GradientButton from "../buttons/gradient-button";
import { PropsWithChildren } from "react";

interface Props {
  name: string,
  sport: Sport
}

const TournamentLi = ({name, sport, children}: PropsWithChildren<Props>) => {
  return (
    <ListItem icon={sportsIcons.get(sport)} title={name} subtitle={sport}>
      {children}
    </ListItem>
  );
}
 
export default TournamentLi;