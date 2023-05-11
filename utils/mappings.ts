import { IconType } from "react-icons";
import { IoBasketball, IoFootball, IoTennisball } from "react-icons/io5";
import { RiPingPongLine } from "react-icons/ri";
import { Sport, TournamentStatus } from "./types";

export const sportsIcons = new Map<Sport, IconType> ([
  [Sport.Football, IoFootball],
  [Sport.Tennis, IoTennisball],
  [Sport.Basketball, IoBasketball],
  [Sport.TableTennis, RiPingPongLine],
])

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

export const alternativeSportsNames = new Map<string, Sport> ([
  ['FOOTBALL', Sport.Football],
  ['TENNIS', Sport.Tennis],
  ['BASKETBALL', Sport.Basketball],
  ['PINGPONG', Sport.TableTennis],
])