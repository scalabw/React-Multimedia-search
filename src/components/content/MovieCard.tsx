import React from 'react'
import { MovieDetails } from '../../store/multimedia.slice'
import { Card, CardHeader, CardMedia } from '@mui/material'

interface MovieCardProps {
  mediaItem: MovieDetails
}

const MovieCard = ({ mediaItem }: MovieCardProps) => {
  return (
    <li className='list-item'>
      <Card className='card-item'>
        <CardHeader title={mediaItem.title} className='card-title' />
        <CardMedia
          component='img'
          className='card-image'
          image={`https://image.tmdb.org/t/p/original/${mediaItem.poster_path}`}
          alt={`movie poster of ${mediaItem.title}`}
        />
      </Card>
    </li>
  )
}

export default MovieCard
