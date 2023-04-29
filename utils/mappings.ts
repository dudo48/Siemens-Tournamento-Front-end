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

// export const sportsNames = new Map<Sport, string> ([
//   [Sport.Football, 'Football'],
//   [Sport.Tennis, 'Tennis'],
//   [Sport.Basketball, 'Basketball'],
//   [Sport.TableTennis, 'Table Tennis'],
// ])

// allowed choices for each sport
export const sportsTeamMembers = new Map<Sport, number[]> ([
  [Sport.Football, Array.from(Array(7).keys()).map(n => n + 5)],
  [Sport.Tennis, Array.from(Array(2).keys()).map(n => n + 1)],
  [Sport.Basketball, Array.from(Array(3).keys()).map(n => n + 3)],
  [Sport.TableTennis, Array.from(Array(2).keys()).map(n => n + 1)],
])

export const sportsMatchDurations = new Map<Sport, number[]> ([
  [Sport.Football, Array.from(Array(10).keys()).map(n => (n + 9) * 5)],
  [Sport.Tennis, Array.from(Array(10).keys()).map(n => (n + 9) * 5)],
  [Sport.Basketball, Array.from(Array(10).keys()).map(n => (n + 9) * 5)],
  [Sport.TableTennis, Array.from(Array(5).keys()).map(n => (n + 2) * 5)],
])