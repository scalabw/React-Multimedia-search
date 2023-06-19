import React, { useEffect, useState } from 'react'
import { MovieDetails } from '../../store'
import { Modal, Box, Typography, Grid } from '@mui/material'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

interface MovieDetailsModalProps {
  movie: MovieDetails
  handleClose: () => void
  open: boolean
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
}

interface MovieDetailsFromAPI {
  genres: { id: number; name: string }[]
  id: number
  title: string
  overview: string
  release_date: string
}

const MovieDetailsModal = ({ open, handleClose, movie }: MovieDetailsModalProps) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsFromAPI | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchMovieDetails() {
      const movieDetails = await fetchWrapper.get(`/movie/${movie.id}`)
      setMovieDetails(movieDetails)
      setLoading(false)
    }
    fetchMovieDetails()
  }, [movie.id])

  if (loading || !movieDetails) return null

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography variant='h6' component='h2'>
          {movieDetails.title}
        </Typography>
        <Grid container xs={12}>
          <Typography className='modal-genres' component='h3'>
            Genres:
          </Typography>
          {movieDetails.genres.map((genre, index) => (
            <Typography className='modal-genres' component='h3' key={genre.id}>
              {genre.name}
              {index < movieDetails.genres.length - 1 ? ', ' : ''}
            </Typography>
          ))}
        </Grid>
        <Typography component='h3'>Release Date: {movieDetails.release_date}</Typography>
        <Typography>{movieDetails.overview}</Typography>
      </Box>
    </Modal>
  )
}

export default MovieDetailsModal
