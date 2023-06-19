import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Input from '../ui/Input'
import { MultimediaType } from '../MultimediaSearch'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch, multimediaActions } from '../../store'
import { debounce } from 'lodash'

interface SearchBarProps {
  multimediaType: MultimediaType
}
export const getQueryParams = (searchParams: URLSearchParams, multimediaType: MultimediaType) => {
  const movieName = searchParams.get('movieName')
  const serieName = searchParams.get('serieName')

  switch (multimediaType) {
    case MultimediaType.movies:
      return { searchParam: movieName, searchParamType: MultimediaType.movies }
    case MultimediaType.series:
      return { searchParam: serieName, searchParamType: MultimediaType.series }
    default:
      return null
  }
}

const SearchBar = ({ multimediaType }: SearchBarProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const multimedia = getQueryParams(searchParams, multimediaType)

  useEffect(() => {
    if (!multimedia) return
    setSearchInputValue(multimedia.searchParam ? multimedia.searchParam : '')
    // Not adding multimediaType to the dependency array because it will lock input
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchInputValue])

  const sendRequest = useCallback((getData: () => void) => getData(), [])

  // memoize the debounce call with useMemo
  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000)
  }, [sendRequest])

  const startSearch = useCallback(() => {
    if (!searchInputValue || !multimediaType) return
    switch (multimediaType) {
      case MultimediaType.movies:
        setSearchParams({ movieName: searchInputValue })
        dispatch(multimediaActions.getMoviesByTitle({ movieTitle: searchInputValue }))
        break
      case MultimediaType.series:
        setSearchParams({ serieName: searchInputValue })
        dispatch(multimediaActions.getSeriesByTitle({ serieTitle: searchInputValue }))
        break
    }
  }, [searchInputValue, multimediaType, setSearchParams, dispatch])

  useEffect(() => {
    debouncedSendRequest(() => startSearch())
  }, [searchInputValue, multimediaType, debouncedSendRequest, startSearch])

  return <Input onChange={setSearchInputValue} label='Search' value={searchInputValue} />
}

export default memo(SearchBar)
