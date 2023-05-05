export enum Sport {
  Football = 'Football',
  Tennis = 'Tennis',
  Basketball = 'Basketball',
  TableTennis = 'Table Tennis'
}

export interface User {
  firstName?: string,
  lastName?: string,
  email: string,
  password: string
}