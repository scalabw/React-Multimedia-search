import { AsyncThunk, createAsyncThunk, createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { fetchWrapper } from '../helpers/fetch-wrapper';

export interface MultimediaDetails {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieDetails extends MultimediaDetails {
    title: string;
    video: boolean;
}

export interface SerieDetails extends MultimediaDetails {
    first_air_date: string;
    name: string;
}
export interface multimediaState {
    list: MovieDetails[][] | SerieDetails[][];
    loading: boolean;
    error: boolean;
    pages: number;
    notInitialized: boolean;
    currentPage: number;
}

interface getMoviesByTitleParam {
    movieTitle: string;
    page?: number;
}

interface getSeriesByTitleParam {
    serieTitle: string;
    page?: number;
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type FulfilledGetMultimediaDataAction = ReturnType<GenericAsyncThunk['fulfilled']> & {
    payload: {
        results: MovieDetails[];
        total_pages: number;
        page: number;
    }
}

const createInitialState = (): multimediaState => {
    return {
        list: [],
        loading: false,
        error: false,
        pages: 0,
        notInitialized: true,
        currentPage: 1,
    }
}

const createExtraActions = () => {

    const getMoviesByTitle = () => {
        return createAsyncThunk(
            `${name}/searchMovies`,
            async ({ movieTitle, page = 1 }: getMoviesByTitleParam) => await fetchWrapper.get(`/search/movie?query=${movieTitle}&page=${page ? page : 1}`)
        );
    }

    const getSeriesByTitle = () => {
        return createAsyncThunk(
            `${name}/searchSeries`,
            async ({ serieTitle, page = 1 }: getSeriesByTitleParam) => await fetchWrapper.get(`/search/tv?query=${serieTitle}&page=${page ? page : 1}`)
        );
    }

    return {
        getMoviesByTitle: getMoviesByTitle(),
        getSeriesByTitle: getSeriesByTitle(),
    };
}


const createExtraReducers = () => {
    return (builder: ActionReducerMapBuilder<multimediaState>): void => {
        const getMoviesByTitle = () => {
            const { pending, fulfilled, rejected } = extraActions.getMoviesByTitle;
            builder
                .addCase(pending, (state: multimediaState) => {
                    state.loading = true;
                    state.error = false;
                    state.notInitialized = false;
                })
                .addCase(fulfilled, (state: multimediaState, action: FulfilledGetMultimediaDataAction) => {
                    state.list[action?.payload.page] = action?.payload?.results;
                    state.pages = action?.payload?.total_pages;
                    state.loading = false;
                })
                .addCase(rejected, (state: multimediaState) => {
                    state.error = true;
                    state.loading = false;
                });
        }

        const getSeriesByTitle = () => {
            const { pending, fulfilled, rejected } = extraActions.getSeriesByTitle;
            builder
                .addCase(pending, (state: multimediaState) => {
                    state.loading = true;
                    state.error = false;
                    state.notInitialized = false;
                })
                .addCase(fulfilled, (state: multimediaState, action: FulfilledGetMultimediaDataAction) => {
                    state.list[action?.payload.page] = action?.payload?.results;
                    state.pages = action?.payload?.total_pages;
                    state.loading = false;
                })
                .addCase(rejected, (state: multimediaState) => {
                    state.error = true;
                    state.loading = false;
                });
        }

        getMoviesByTitle();
        getSeriesByTitle();
    }
}

const name = 'multimedia';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers: { reset: () => ({ ...initialState, loading: true }) }, extraReducers });

export const multimediaActions = { ...slice.actions, ...extraActions };

export const multimediaReducer = slice.reducer;

