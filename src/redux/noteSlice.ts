import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { noteType, projectType } from '../types'

interface NoteState {
    notes: noteType[],
    isLoading: boolean,
    projects: projectType[]
}

const initialState: NoteState = {
    notes: [],
    isLoading: false,
    projects: []
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        projects: (state, action: PayloadAction<projectType[]>) => {
            state.projects = action.payload;
        },
        addProjects: (state, action: PayloadAction<projectType>) => {
            state.projects = [...state.projects, action.payload];
        },
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
                return note;
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
                return note;
            });
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
})

export const { addNote, setNotes, setLoading, addToTrash, makeComplete, deleteNote, addProjects, projects } = noteSlice.actions

export default noteSlice.reducer