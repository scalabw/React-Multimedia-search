import React, { useState } from 'react'
import { SerieDetails } from '../../store'
import { Card, CardHeader, CardMedia } from '@mui/material'
import SerieDetailsModal from './SerieDetailsModal'

interface SerieCardProps {
  mediaItem: SerieDetails
}

const SerieCard = ({ mediaItem }: SerieCardProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <li className='list-item'>
      <Card className='card-item' onClick={handleOpen}>
        <CardHeader title={mediaItem.name} />
        <CardMedia
          component='img'
          className='card-image'
          image={`https://image.tmdb.org/t/p/original/${mediaItem.poster_path}`}
          alt={`movie poster of ${mediaItem.name}`}
        />
      </Card>
      {open ? <SerieDetailsModal serie={mediaItem} open={open} handleClose={handleClose} /> : null}
    </li>
  )
}

export default SerieCard
