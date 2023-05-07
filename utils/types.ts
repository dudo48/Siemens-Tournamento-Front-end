export enum Sport {
  Football = 'Football',
  Tennis = 'Tennis',
  Basketball = 'Basketball',
  TableTennis = 'Table Tennis'
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  verified: boolean,
  playerDetails: null
}

export interface Notification
{
  id: number,
  playerId: number,
  body: string,
  read: boolean,
  createdAt: string
}