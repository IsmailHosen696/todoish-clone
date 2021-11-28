import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { updateFirebaseNote } from '../../../api/addnoteApi';
import useClick from '../../../hooks/useClick';
import { updateNote } from '../../../redux/noteSlice';
import { setIsUpdateNoteOpen, useAppDispatch, useAppSelector } from '../../../redux/noteUtilsSlice';
import { updateNoteType } from '../../../types';
import EditNoteTag from '../tagutils/EditNoteTag';

export default function EditNote() {
    const divRef = useRef<HTMLDivElement>(null);
    const { isInsideClick } = useClick(divRef);
    const { isEditNoteOpen, selectedNoteForEdit } = useAppSelector(state => state.notesutils);
    const { notes } = useAppSelector(state => state.notes)
    const dispatch = useAppDispatch();

    // for outside click of the form
    useEffect(() => {
        if (isEditNoteOpen) {
            if (!isInsideClick) {
                dispatch(setIsUpdateNoteOpen(false))
            }
            return
        }
        return
    }, [isEditNoteOpen, isInsideClick, dispatch])

    // note state
    const [note, setNote] = useState<{ about: string, description: string, tags?: { id: string }[] }>({ about: '', description: "", tags: [] })

    // getting selected tags from editNoteTag component
    const getSelectedTags = (tags: { id: string }[]) => setNote({ ...note, tags });
    // filtering selected note with id selected note
    useEffect(() => {
        let fnote = notes.filter(note => (
            note.id === selectedNoteForEdit
        ))[0]
        setNote(fnote)
        return () => setNote({ about: '', description: "", tags: [] })
    }, [selectedNoteForEdit, notes])

    // handeling form event when this will submited
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let payload: updateNoteType = {
            about: note.about, description: note.description,
            tags: note.tags,
            id: selectedNoteForEdit,
        }
        dispatch(updateNote(payload))
        updateFirebaseNote(payload)
        dispatch(setIsUpdateNoteOpen(false))
    }

    return (
        <div className="absolute flex justify-center items-center top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-20">
            <div ref={divRef} className="relative dark:bg-gray-900 bg-viewboxWhite py-2 px-5 rounded">
                <div className="w-96 dark:text-gray-300">
                    <p className="pt-2 text-center">Update note</p>
                    <div className="my-2 flex flex-col">
                        <div className="flex flex-col my-2">
                            <label className="my-1" htmlFor="about ">about note</label>
                            <input value={note.about}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNote({ ...note, about: e.target.value })}
                                type="text" id="about"
                                autoComplete="off"
                                className="dark:bg-gray-800 border  dark:border-transparent border-gray-200 rounded h-10 px-2 py-1 outline-none focus:ring focus:ring-blue-500" />
                        </div>
                        <div className="flex flex-col my-2">
                            <label className="my-1" htmlFor="notedesc">description</label>
                            <textarea value={note.description}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNote({ ...note, description: e.target.value })}
                                id="notedesc"
                                className="dark:bg-gray-800 border  dark:border-transparent border-gray-200 h-20 rounded px-2 py-1 outline-none focus:ring focus:ring-blue-500 resize-none"></textarea>
                        </div>
                        <EditNoteTag getSelectedTags={getSelectedTags} tags={note.tags} />
                    </div>
                </div>
                <div className="flex float-right my-3">
                    <button onClick={() => { dispatch(setIsUpdateNoteOpen(false)) }} className="px-2 py-1 rounded bg-gray-600 dark:text-gray-300 text-gray-100">Cancel</button>
                    <button disabled={!note.about} onClick={handleSubmit} className={`px-3 py-1 rounded mx-2  dark:text-gray-300 text-gray-100 ${!note.about ? 'bg-red-400 cursor-not-allowed' : 'bg-btnClr'}`}>Update</button>
                </div>
            </div>
        </div >
    )
}
