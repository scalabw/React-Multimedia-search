import React, { useState } from 'react'
import { MovieDetails } from '../../store/multimedia.slice'
import { Card, CardHeader, CardMedia } from '@mui/material'
import MovieDetailsModal from './MovieDetailsModal'

interface MovieCardProps {
  mediaItem: MovieDetails
}

const MovieCard = ({ mediaItem }: MovieCardProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <li className='list-item'>
      <Card className='card-item' onClick={handleOpen}>
        <CardHeader title={mediaItem.title} className='card-title' />
        <CardMedia
          component='img'
          className='card-image'
          image={`https://image.tmdb.org/t/p/original/${mediaItem.poster_path}`}
          alt={`movie poster of ${mediaItem.title}`}
        />
      </Card>
      {open ? <MovieDetailsModal movie={mediaItem} open={open} handleClose={handleClose} /> : null}
    </li>
  )
}

export default MovieCard
