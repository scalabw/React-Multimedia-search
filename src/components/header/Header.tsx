import SearchBar from './SearchBar'
import { FormControl, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { MultimediaType } from '../MultimediaSearch'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  multimediaType: MultimediaType | null
}

const Header = ({ multimediaType }: HeaderProps) => {
  const navigate = useNavigate()

  const [selectedMultimediaType, setSelectedMultimediaType] = useState<MultimediaType | null>(
    multimediaType,
  )

  const handleChange = (event: SelectChangeEvent) => {
    const newSelectedMultimediaType = event.target.value as unknown as MultimediaType
    setSelectedMultimediaType(newSelectedMultimediaType)
    navigate({
      pathname: `/${newSelectedMultimediaType}`,
    })
  }

  return (
    <div className='App-header'>
      <h1>Multimedia Search </h1>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={2}>
          <FormControl>
            <Select value={selectedMultimediaType as unknown as string} onChange={handleChange}>
              <MenuItem value={MultimediaType.movies}>Movies</MenuItem>
              <MenuItem value={MultimediaType.series}>Series</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          {selectedMultimediaType ? <SearchBar multimediaType={selectedMultimediaType} /> : null}
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
