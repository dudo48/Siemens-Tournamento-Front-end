import { Sport } from "@/utils/types";
import { PropsWithChildren } from "react";
import { IoShirtOutline } from "react-icons/io5";
import ListItem from "./list-item";

interface Props {
  tournamentId?: number,
  teamId?: number,
  name: string,
  sport: Sport
}

const TeamLi = ({tournamentId, teamId, name, sport, children}: PropsWithChildren<Props>) => {
  return (
    <ListItem icon={IoShirtOutline} title={name} subtitle={`${sport} team`} href={tournamentId === undefined && teamId === undefined ? undefined : `/tournaments/${tournamentId}/teams/${teamId}`}>
      {children}
    </ListItem>
  );
}
 
export default TeamLi;