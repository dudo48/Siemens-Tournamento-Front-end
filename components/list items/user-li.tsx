import { BsPerson, BsX } from "react-icons/bs";
import ListItem from "./list-item";
import GradientButton from "../buttons/gradient-button";
import { PropsWithChildren } from "react";

interface Props {
  name: string
}

const UserLi = ({name, children}: PropsWithChildren<Props>) => {
  return (
    <ListItem icon={BsPerson} title={name}>
      {children}
    </ListItem>
  );
}
 
export default UserLi;