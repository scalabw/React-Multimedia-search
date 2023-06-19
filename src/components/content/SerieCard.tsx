import React from 'react'
import { SerieDetails } from '../../store'
import { Card, CardHeader, CardMedia } from '@mui/material'

interface SerieCardProps {
  mediaItem: SerieDetails
}

const SerieCard = ({ mediaItem }: SerieCardProps) => {
  return (
    <li className='list-item'>
      <Card className='card-item'>
        <CardHeader title={mediaItem.name} />
        <CardMedia
          component='img'
          className='card-image'
          image={`https://image.tmdb.org/t/p/original/${mediaItem.poster_path}`}
          alt={`movie poster of ${mediaItem.name}`}
        />
      </Card>
    </li>
  )
}

export default SerieCard
