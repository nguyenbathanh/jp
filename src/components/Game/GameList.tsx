import React from 'react'
import { useAppSelector } from '../../hooks'
import {
  JACKPOT_CATEGORY,
  OTHER_CATEGORIES_GROUP,
  OTHER_CATEGORY,
  selectGames,
  selectJackpots,
  selectSelectedCategoryId
} from '../../store/features/app'
import GameItem from './GameItem'

export default function () {
  const selectedCategoryId = useAppSelector(selectSelectedCategoryId)
  const jackpots = useAppSelector(selectJackpots)
  const allGames = useAppSelector(selectGames)
  const games = allGames.filter(game => {
    if (selectedCategoryId === JACKPOT_CATEGORY) {
      return jackpots.some(jp => jp.game === game.id)
    }

    //  Group “ball”, “virtual” and “fun” in “Other” category
    if (selectedCategoryId === OTHER_CATEGORY) {
      return game.categories.some(slug => OTHER_CATEGORIES_GROUP.has(slug))
    }

    return game.categories.includes(selectedCategoryId)
  })
  const render = games.map(game => <GameItem key={game.id} game={game} />)

  return <div className="grid grid-cols-4 gap-4 px-40 py-10">{render}</div>
}
