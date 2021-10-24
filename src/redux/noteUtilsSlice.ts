import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'

interface NoteUtilsState {
    theme: string,
    isSidebarOpen: boolean,
    isAddNoteOpen: boolean,
    isNewProjectOpen: boolean
}

const initialState: NoteUtilsState = {
    theme: '',
    isSidebarOpen: true,
    isAddNoteOpen: false,
    isNewProjectOpen: false
}

export const noteUtilsSlice = createSlice({
    name: 'noteutils',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.isSidebarOpen = action.payload
        },
        setAddNotePopOpen: (state, action: PayloadAction<boolean>) => {
            state.isAddNoteOpen = action.payload
        },
        setNewProjectOpen: (state, action: PayloadAction<boolean>) => {
            state.isNewProjectOpen = action.payload
        }
    },
})

export const { setTheme, setSidebarOpen, setAddNotePopOpen, setNewProjectOpen } = noteUtilsSlice.actions

export default noteUtilsSlice.reducer

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector