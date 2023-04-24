import { IconType } from "react-icons";
import { IoBasketball, IoFootball, IoTennisball } from "react-icons/io5";
import { RiPingPongLine } from "react-icons/ri";
import { Sport } from "./types";

const sportsIcons = new Map<Sport, IconType> ([
  [Sport.Football, IoFootball],
  [Sport.Tennis, IoTennisball],
  [Sport.Basketball, IoBasketball],
  [Sport.TableTennis, RiPingPongLine],
])
 
export default sportsIcons;