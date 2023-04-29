import { Sport } from "@/utils/types";
import ListItem from "./list-item";
import getOrdinalSuffix from "@/utils/functions";
import GradientButton from "../buttons/gradient-button";
import { IconType } from "react-icons";

interface Props {
  icon: IconType,
  title: string,
  count: number
}

const StatisticsLi = ({icon, title, count}: Props) => {
  return (
    <ListItem icon={icon} title={title}>
      <p className='text-tournamento-400 text-3xl'>{count}</p>
    </ListItem>
  );
}
 
export default StatisticsLi;