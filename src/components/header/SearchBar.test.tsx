import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter, MemoryRouter, Route, Router, Routes } from 'react-router-dom'
import SearchBar, { getQueryParams } from './SearchBar'
import { MultimediaType } from '../MultimediaSearch'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

describe('SearchBar', () => {
  it('should render the search input', () => {
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <SearchBar multimediaType={MultimediaType.movies} />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  it('should update the search input value when the URL changes', () => {
    const searchParams = new URLSearchParams('?movieName=batman')
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter initialEntries={[{ search: searchParams.toString() }]}>
          <SearchBar multimediaType={MultimediaType.movies} />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByLabelText('Search')).toHaveValue('batman')
  })

  it('should update the URL when the search input value changes', async () => {
    render(
      <Provider store={mockStore({})}>
        <BrowserRouter>
          <SearchBar multimediaType={MultimediaType.movies} />
        </BrowserRouter>
      </Provider>,
    )

    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'batman' } })

    await waitFor(
      () => {
        expect(new URLSearchParams(window.location.search)).toEqual(
          new URLSearchParams('?movieName=batman'),
        )
      },
      // This timeout is needed because the URLSearchParams is updated after one second sometimes
      { timeout: 2000 },
    )
  })

  describe('getQueryParams', () => {
    it('should return the movie name when the multimedia type is movies', () => {
      const searchParams = new URLSearchParams('?movieName=batman')
      const queryParams = getQueryParams(searchParams, MultimediaType.movies)

      expect(queryParams).toEqual({
        searchParam: 'batman',
        searchParamType: MultimediaType.movies,
      })
    })

    it('should return the serie name when the multimedia type is series', () => {
      const searchParams = new URLSearchParams('?serieName=breaking+bad')
      const queryParams = getQueryParams(searchParams, MultimediaType.series)

      expect(queryParams).toEqual({
        searchParam: 'breaking bad',
        searchParamType: MultimediaType.series,
      })
    })

    it('should return null when the multimedia type is invalid', () => {
      const searchParams = new URLSearchParams('?movieName=batman')
      const queryParams = getQueryParams(searchParams, 'invalid' as MultimediaType)

      expect(queryParams).toBeNull()
    })
  })
})
