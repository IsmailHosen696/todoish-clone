import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'

interface NoteUtilsState {
    theme: string;
    isSidebarOpen: boolean;
    isAddNoteOpen: boolean;
    isNewProjectOpen: boolean;
    isLoading: boolean;
    isError: boolean;
    isNewTagOpen: boolean;
    errorstring: string;
    isContextMenuOpen: boolean
    position: { x: number, y: number, id: string, type: string };
    isRenamePopUpOpen: boolean;

}

const initialState: NoteUtilsState = {
    theme: '',
    isContextMenuOpen: false,
    isSidebarOpen: true,
    isAddNoteOpen: false,
    isNewProjectOpen: false,
    isNewTagOpen: false,
    isLoading: false,
    isError: false,
    isRenamePopUpOpen: false,
    errorstring: '',
    position: { x: 0, y: 0, id: '', type: '' }
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
        },
        setNewTagOpen: (state, action: PayloadAction<boolean>) => {
            state.isNewTagOpen = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setErrorState: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        setErrorString: (state, action: PayloadAction<string>) => {
            state.errorstring = action.payload;
        },
        setContextPosition: (state, action: PayloadAction<{ x: number, y: number, id: string, type: string }>) => {
            state.position = action.payload
        },
        setIsContextMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isContextMenuOpen = action.payload
        },
        setIsRenamePopUpOpen: (state, action: PayloadAction<boolean>) => {
            state.isRenamePopUpOpen = action.payload
        }
    },
})

export const { setTheme, setErrorString, setIsContextMenuOpen, setLoading, setIsRenamePopUpOpen, setContextPosition, setNewTagOpen, setErrorState, setSidebarOpen, setAddNotePopOpen, setNewProjectOpen } = noteUtilsSlice.actions

export default noteUtilsSlice.reducer

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector