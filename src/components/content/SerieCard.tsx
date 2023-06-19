import React from 'react'
import { SerieDetails } from '../../store'

interface SerieCardProps {
  mediaItem: SerieDetails
}

const SerieCard = ({ mediaItem }: SerieCardProps) => {
  return (
    <li className='card-item'>
      <h2 className='card-title'>{mediaItem.name}</h2>
      <img
        className='card-image'
        src={`https://image.tmdb.org/t/p/original/${mediaItem.poster_path}`}
        alt={`serie poster of ${mediaItem.name}`}
      />
    </li>
  )
}

export default SerieCard
