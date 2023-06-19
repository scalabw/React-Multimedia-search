import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination'

import MovieCard from './MovieCard'
import SerieCard from './SerieCard'
import { RootState, AppDispatch, multimediaActions } from '../../store'
import { getQueryParams } from '../header/SearchBar'
import LoadingAnimation from '../ui/LoadingAnimation'
import ResultError from '../ui/NoContent'
import NoContent from '../ui/NoContent'

export enum MultimediaType {
  movies = 'movies',
  series = 'series',
}

interface MultimediaSearchResultsProps {
  multimediaType: MultimediaType
}

const getMultimediaComponentList = (multimediaType: MultimediaType) => {
  switch (multimediaType) {
    case MultimediaType.movies:
      return MovieCard
    case MultimediaType.series:
      return SerieCard
  }
}

const MultimediaSearchResults = ({ multimediaType }: MultimediaSearchResultsProps) => {
  const multimedia = useSelector((store: RootState) => store.multimedia)
  const dispatch = useDispatch<AppDispatch>()
  const { list: mediasList, loading, error, notInitialized, pages } = multimedia
  const [searchParams] = useSearchParams()

  const multimediaTitle = getQueryParams(searchParams, multimediaType)

  const [page, setPage] = useState(1)
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    if (!multimediaTitle?.searchParam) return
    switch (multimediaType) {
      case MultimediaType.movies:
        dispatch(
          multimediaActions.getMoviesByTitle({
            movieTitle: multimediaTitle?.searchParam,
            page: value,
          }),
        )
        break
      case MultimediaType.series:
        dispatch(
          multimediaActions.getSeriesByTitle({
            serieTitle: multimediaTitle?.searchParam,
            page: value,
          }),
        )
        break
    }
  }

  const hasNotMultimediaToShow =
    !notInitialized && mediasList[page] && mediasList[page].length === 0

  if (loading) return <LoadingAnimation />
  if (error) return <ResultError />
  if (hasNotMultimediaToShow) return <NoContent />

  const MultiMediaItemComponent = getMultimediaComponentList(multimediaType)

  return (
    <>
      {!hasNotMultimediaToShow && (
        <>
          <ul className='card-list'>
            {mediasList[page].map((mediaItem) => (
              /* With more time I would fix this any */
              <MultiMediaItemComponent key={mediaItem.id} mediaItem={mediaItem as any} />
            ))}
          </ul>
          <div className='pagination'>
            <Pagination count={pages} page={page} shape='rounded' onChange={handlePageChange} />
          </div>
        </>
      )}
    </>
  )
}

export default MultimediaSearchResults
