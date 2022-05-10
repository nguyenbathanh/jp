import React from 'react'
import { GameCategory } from '../../types/app'
import PlayIcon from '../../assets/play-icon.png'
import './GameItem.css'

export default function ({ game }: { game: GameCategory }) {
  const feature = game.categories.find(slug => ['top', 'new'].includes(slug))

  return (
    <div className="game-card">
      {feature ? (
        <div className="ribbon">
          <span>{feature}</span>
        </div>
      ) : null}
      <img className="rounded-lg" src={game.image} />
      <div className="action">
        <div className="game-name">
          <span>{game.name}</span>
        </div>
        <div className="play-button">
          <img src={PlayIcon} />
        </div>
      </div>
    </div>
  )
}
