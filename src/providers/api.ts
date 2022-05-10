import { Jackpot } from '../types/app'
import { http } from './http'

export const loadFeed = () =>
  http.get<
    {
      categories: string[]
      name: string
      image: string
      id: string
    }[]
  >('/games.php')

export const getJackpots = () => http.get<Jackpot[]>('/jackpots.php')
