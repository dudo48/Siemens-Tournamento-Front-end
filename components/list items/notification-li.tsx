import { BsBell, BsPerson, BsX } from "react-icons/bs";
import ListItem from "./list-item";
import GradientButton from "../buttons/gradient-button";
import { PropsWithChildren } from "react";

interface Props {
  body: string,
  isRead: boolean
}

const NotificationLi = ({body, isRead, children}: PropsWithChildren<Props>) => {
  return (
    <ListItem icon={BsBell} title={body}>
      {children}
      {!isRead && <div className='absolute p-0.5 animate-bounce bg-blue-500 rounded-full font-semibold text-white text-xs top-0 left-0 z-10'>NEW</div>}
    </ListItem>
  );
}
 
export default NotificationLi;