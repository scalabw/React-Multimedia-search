import { configureStore } from '@reduxjs/toolkit'
import { multimediaReducer } from './multimedia.slice'

export * from './multimedia.slice';

const store = configureStore({
    reducer: {
        multimedia: multimediaReducer,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;