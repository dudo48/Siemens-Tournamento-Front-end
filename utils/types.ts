export enum Sport {
  Football = 'Football',
  Tennis = 'Tennis',
  Basketball = 'Basketball',
  TableTennis = 'Table Tennis'
}

export enum Status {
  Pending = 'PENDING',
  Started = 'STARTED',
  Ended = 'ENDED'
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
}

export interface Notification {
  id: number,
  playerId: number,
  body: string,
  read: boolean,
  createdAt: string
}

export interface Tournament {
  id: number,
  title: string,
  managerId: number,
  details: {
    code: string,
    availability: string,
    sport:  string,
    state: string,
    createdAt: string,
    matchDuration: number,
    playgrounds: number,
    teamSize: number
  }
}

export type UserProfile = User & {
  password: string,
  verified: boolean,
  playerDetails: null
}

export interface Team {
  id: number,
  tournament_id: number,
  title: string,
  size: number,
  suspended: boolean,
  players: User[]
}

export interface Score {
  winner: number|Team,
  loser: number|Team,
  winnerScore: number,
  loserScore: number,
  scoreSheet: {[key: string]: number}[]
}

export interface Match {
  id: 1,
  tournament: Tournament,
  teamOne: Team,
  teamTwo: Team,
  playground: number,
  score: Score
  round: number,
  state: Status,
  startedAt: string,
  endedAt: string
}