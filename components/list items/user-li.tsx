import { BsPerson, BsX } from "react-icons/bs";
import ListItem from "./list-item";
import GradientButton from "../buttons/gradient-button";
import { PropsWithChildren } from "react";

interface Props {
  name: string,
  id?: number
}

const UserLi = ({id, name, children}: PropsWithChildren<Props>) => {
  return (
    <ListItem icon={BsPerson} title={name} href={id === undefined ? id : `/profile/${id}`}>
      {children}
    </ListItem>
  );
}
 
export default UserLi;