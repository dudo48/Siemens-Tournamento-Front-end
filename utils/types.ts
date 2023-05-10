export enum Sport {
  Football = 'Football',
  Tennis = 'Tennis',
  Basketball = 'Basketball',
  TableTennis = 'Table Tennis'
}

export enum TournamentStatus {
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

export interface Notification
{
  id: number,
  playerId: number,
  body: string,
  read: boolean,
  createdAt: string
}

export interface Tournament
{
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
    grounds: number
  }
}