import { BsPerson, BsX } from "react-icons/bs";
import ListItem from "./list-item";
import GradientButton from "../buttons/gradient-button";
import { PropsWithChildren } from "react";
import { IoShirtOutline } from "react-icons/io5";

interface Props {
  name: string
}

const TeamLi = ({name, children}: PropsWithChildren<Props>) => {
  return (
    <ListItem icon={IoShirtOutline} title={name}>
      {children}
    </ListItem>
  );
}
 
export default TeamLi;