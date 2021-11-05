import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { noteType, projectType, tagType } from '../types'

interface NoteState {
    notes: noteType[],
    projects: projectType[],
    tags: tagType[]
}

const initialState: NoteState = {
    notes: [],
    projects: [],
    tags: []
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // for projects
        getALlProject: (state, action: PayloadAction<projectType[]>) => {
            state.projects = action.payload;
        },
        addProjects: (state, action: PayloadAction<projectType>) => {
            state.projects = [...state.projects, action.payload];
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.projects = state.projects.filter(project => project.id !== action.payload);
        },
        getAllTag: (state, action: PayloadAction<tagType[]>) => {
            state.tags = action.payload;
        },
        addTag: (state, action: PayloadAction<tagType>) => {
            state.tags = [...state.tags, action.payload];
        },
        deleteTag: (state, action: PayloadAction<string>) => {
            state.tags = state.tags.filter(tag => tag.id !== action.payload);
        },
        // for notes
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
        }
    },
})

export const { addNote, setNotes, addToTrash, makeComplete, deleteNote, addProjects, deleteTag, addTag, getAllTag, getALlProject, deleteProject } = noteSlice.actions

export default noteSlice.reducer