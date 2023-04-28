import { IconType } from "react-icons";
import { IoBasketball, IoFootball, IoTennisball } from "react-icons/io5";
import { RiPingPongLine } from "react-icons/ri";
import { Sport } from "./types";

export const sportsIcons = new Map<Sport, IconType> ([
  [Sport.Football, IoFootball],
  [Sport.Tennis, IoTennisball],
  [Sport.Basketball, IoBasketball],
  [Sport.TableTennis, RiPingPongLine],
])

export const sportsNames = new Map<Sport, string> ([
  [Sport.Football, 'Football'],
  [Sport.Tennis, 'Tennis'],
  [Sport.Basketball, 'Basketball'],
  [Sport.TableTennis, 'Table Tennis'],
])