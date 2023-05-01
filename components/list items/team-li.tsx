import { BsPerson, BsX } from "react-icons/bs";
import ListItem from "./list-item";
import GradientButton from "../buttons/gradient-button";
import { PropsWithChildren } from "react";
import { IoShirtOutline } from "react-icons/io5";
import { Sport } from "@/utils/types";

interface Props {
  name: string,
  sport: Sport
}

const TeamLi = ({name, sport, children}: PropsWithChildren<Props>) => {
  return (
    <ListItem icon={IoShirtOutline} title={name} subtitle={`${sport} team`}>
      {children}
    </ListItem>
  );
}
 
export default TeamLi;