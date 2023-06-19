import React, { useEffect, useState } from 'react'
import { SerieDetails } from '../../store'
import { Modal, Box, Typography, Grid } from '@mui/material'
import { fetchWrapper } from '../../helpers/fetch-wrapper'

interface SerieDetailsModalProps {
  serie: SerieDetails
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

interface SerieDetailsFromAPI {
  genres: { id: number; name: string }[]
  id: number
  name: string
  overview: string
  first_air_date: string
}

const SerieDetailsModal = ({ open, handleClose, serie }: SerieDetailsModalProps) => {
  const [serieDetails, setserieDetails] = useState<SerieDetailsFromAPI | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchserieDetails() {
      const serieDetails = await fetchWrapper.get(`/tv/${serie.id}`)
      setserieDetails(serieDetails)
      setLoading(false)
    }
    fetchserieDetails()
  }, [serie.id])

  if (loading || !serieDetails) return <div>Loading...</div>

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography variant='h6' component='h2'>
          {serieDetails.name}
        </Typography>
        <Grid container>
          <Typography className='modal-genres' component='h3'>
            Genres:
          </Typography>
          {serieDetails.genres.map((genre, index) => (
            <Typography className='modal-genres' component='h3' key={genre.id}>
              {genre.name}
              {index < serieDetails.genres.length - 1 ? ', ' : ''}
            </Typography>
          ))}
        </Grid>
        <Typography component='h3'>First Air Date: {serieDetails.first_air_date}</Typography>
        <Typography sx={{ mt: 2 }}>{serieDetails.overview}</Typography>
      </Box>
    </Modal>
  )
}

export default SerieDetailsModal
