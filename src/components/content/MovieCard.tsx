import React from 'react'
import { MovieDetails } from '../../store/multimedia.slice'

interface MovieCardProps {
  mediaItem: MovieDetails
}

const MovieCard = ({ mediaItem }: MovieCardProps) => {
  return (
    <li className='card-item'>
      <h2 className='card-title'>{mediaItem.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/original/${mediaItem.poster_path}`}
        alt={`movie poster of ${mediaItem.title}`}
        className='card-image'
      />
    </li>
  )
}

export default MovieCard
