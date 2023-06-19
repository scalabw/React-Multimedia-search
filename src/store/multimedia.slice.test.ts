import { multimediaReducer, multimediaActions, multimediaState } from './multimedia.slice';

describe('multimediaReducer', () => {
    let initialState: multimediaState;

    beforeEach(() => {
        initialState = {
            list: [],
            loading: false,
            error: false,
            pages: 0,
            notInitialized: true,
            currentPage: 1,
        };
    });

    it('should return the initial state', () => {
        const nextState = multimediaReducer(undefined, { type: 'unknown' });
        expect(nextState).toEqual(initialState);
    });

    it('should handle getMoviesByTitle.pending', async () => {
        const action = multimediaActions.getMoviesByTitle.pending('', { ...multimediaActions.getMoviesByTitle.fulfilled, movieTitle: 'movieTitle' });
        const nextState = await multimediaReducer(initialState, action);
        expect(nextState.loading).toEqual(true);
        expect(nextState.notInitialized).toEqual(false);
    });

    it('should handle getMoviesByTitle.fulfilled', () => {
        const payload = {
            results: [
                {
                    adult: false,
                    backdrop_path: '/path/to/backdrop',
                    genre_ids: [1, 2, 3],
                    id: 123,
                    original_language: 'en',
                    original_title: 'Original Title',
                    overview: 'Overview',
                    popularity: 123.45,
                    poster_path: '/path/to/poster',
                    title: 'Title',
                    video: false,
                    vote_average: 6.7,
                    vote_count: 890,
                },
            ],
            total_pages: 1,
            page: 1,
        };
        const nextState = multimediaReducer(initialState, { type: multimediaActions.getMoviesByTitle.fulfilled.type, payload });
        expect(nextState.list[1]).toEqual(payload.results);
        expect(nextState.pages).toEqual(payload.total_pages);
        expect(nextState.loading).toEqual(false);
    });

    it('should handle getMoviesByTitle.rejected', () => {
        const action = multimediaActions.getMoviesByTitle.rejected(new Error(), '', { ...multimediaActions.getMoviesByTitle.rejected, movieTitle: 'movieTitle' });
        const nextState = multimediaReducer(initialState, action);
        expect(nextState.error).toEqual(true);
        expect(nextState.loading).toEqual(false);
    });

    it('should handle getSeriesByTitle.pending', () => {
        const action = multimediaActions.getMoviesByTitle.pending('', { ...multimediaActions.getMoviesByTitle.fulfilled, movieTitle: 'movieTitle' });
        const nextState = multimediaReducer(initialState, action);
        expect(nextState.loading).toEqual(true);
        expect(nextState.notInitialized).toEqual(false);
    });

    it('should handle getSeriesByTitle.fulfilled', () => {
        const payload = {
            results: [
                {
                    adult: false,
                    backdrop_path: '/path/to/backdrop',
                    genre_ids: [1, 2, 3],
                    id: 123,
                    original_language: 'en',
                    original_title: 'Original Title',
                    overview: 'Overview',
                    popularity: 123.45,
                    poster_path: '/path/to/poster',
                    title: 'Title',
                    video: false,
                    vote_average: 6.7,
                    vote_count: 890,
                    first_air_date: '2022-01-01',
                    name: 'Name',
                },
            ],
            total_pages: 1,
            page: 1,
        };
        const nextState = multimediaReducer(initialState, { type: multimediaActions.getSeriesByTitle.fulfilled.type, payload });
        expect(nextState.list[1]).toEqual(payload.results);
        expect(nextState.pages).toEqual(payload.total_pages);
        expect(nextState.loading).toEqual(false);
    });

    it('should handle getSeriesByTitle.rejected', () => {
        const action = multimediaActions.getSeriesByTitle.rejected(new Error(), '', { ...multimediaActions.getSeriesByTitle.rejected, serieTitle: 'serieTitle' });
        const nextState = multimediaReducer(initialState, action);
        expect(nextState.error).toEqual(true);
        expect(nextState.loading).toEqual(false);
    });
});