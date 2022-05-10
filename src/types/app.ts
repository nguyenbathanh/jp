export interface Category {
  id: string
  name: string
}

export interface Game {
  id: string
  name: string
  image: string
}

export interface GameCategory extends Game {
  categories: Category['id'][]
}

export interface Jackpot {
  game: Game['id']
  amount: number
}
