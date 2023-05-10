import { sportsIcons } from "@/utils/mappings";
import { Sport } from "@/utils/types";
import { PropsWithChildren } from "react";
import ListItem from "./list-item";

interface Props {
  name: string,
  sport: Sport,
  id: number
}

const TournamentLi = ({id, name, sport, children}: PropsWithChildren<Props>) => {
  return (
    <ListItem icon={sportsIcons.get(sport)} title={name} subtitle={sport} href={`/tournaments/${id}`}>
      {children}
    </ListItem>
  );
}
 
export default TournamentLi;