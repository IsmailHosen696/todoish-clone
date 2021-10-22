import { configureStore } from '@reduxjs/toolkit'
import noteSlice from './noteSlice'
import noteUtilsSlice from './noteUtilsSlice'
// ...

export const store = configureStore({
    reducer: {
        notesutils: noteUtilsSlice,
        notes: noteSlice
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch