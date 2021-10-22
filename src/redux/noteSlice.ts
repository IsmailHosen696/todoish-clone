import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { noteType } from '../types'
import { AppDispatch, RootState } from './store'

interface NoteState {
    notes: noteType[],
    isLoading: boolean
}

const initialState: NoteState = {
    notes: [],
    isLoading: false
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<noteType>) => {
            state.notes = [...state.notes, action.payload];
        },
        setNotes: (state, action: PayloadAction<noteType[]>) => {
            state.notes = action.payload;
        },
        addToTrash: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload) {
                    return {
                        ...note,
                        inTrash: !note.inTrash
                    }
                }
                return note
            })
        },
        makeComplete: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload) {
                    return {
                        ...note,
                        isCompleted: !note.isCompleted
                    }
                }
                return note
            })
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload)
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    },
})

export const { addNote, setNotes, setLoading, addToTrash, makeComplete, deleteNote } = noteSlice.actions

export default noteSlice.reducer

export const useNoteAppDispatch = () => useDispatch<AppDispatch>()
export const useNoteAppSelector: TypedUseSelectorHook<RootState> = useSelector