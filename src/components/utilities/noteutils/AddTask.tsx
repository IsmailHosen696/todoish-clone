import { FirebaseError } from 'firebase/app'
import React, { ChangeEvent, useState } from 'react'
import { addNoteToFirebase } from '../../../api/addnoteApi'
import TagOutLineIcon from '../../../icons/TagOutLineIcon'
import { addNote } from '../../../redux/noteSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/noteUtilsSlice'
import { noteType } from '../../../types'
import { UUIDGen } from '../UUIDGen'
import TagComponent from './TagComponent'

export default function AddTask(props: { setIsTaskOpen: Function, pid: string }) {
    const [about, setAbout] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [isTagOpen, setIsTagOpen] = useState<boolean>(false)
    const [tagObj, setTagObj] = useState<[]>([])
    const setTag = (tagid: []) => setTagObj(tagid)

    const { user } = useAppSelector(state => state.notesutils)
    const { tags } = useAppSelector(state => state.notes)

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        setError('')
        setLoading(true)
        if (!about) {
            setError('first field is required')
            setLoading(false)
            return
        } else {
            const payload: noteType = {
                id: UUIDGen() as string,
                uid: user.uid,
                about,
                description,
                parentid: props.pid,
                tags: tagObj,
                isCompleted: false
            }
            try {
                dispatch(addNote(payload))
                props.setIsTaskOpen()
                addNoteToFirebase(payload).then(() => {
                    setLoading(false)
                }).catch((err: FirebaseError) => {
                    setLoading(false);
                    setError(err.message)
                })

            } catch (error) {
                setLoading(false)
            }
        }
    }
    return (
        <>
            <div className="flex rounded-md px-2 py-3 border dark:border-gray-700 flex-col w-full">
                {
                    error &&
                    <p className="text-red-500 px-2 mb-2">
                        {error}
                    </p>
                }
                <div className="flex flex-col relative mb-2">
                    <input type="text"
                        maxLength={15}
                        className='rounded-t outline-none px-2 py-2 font-medium text-sm placeholder-gray-500 dark:text-gray-300 dark:bg-gray-800'
                        value={about} onChange={(e: ChangeEvent<HTMLInputElement>) => setAbout(e.target.value)} placeholder='note e.g about' />
                    <textarea className='rounded-b outline-none px-2 pb-1 text-sm placeholder-gray-500 dark:bg-gray-800 resize-none dark:text-gray-400 pt-1'
                        value={description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        placeholder='description'></textarea>
                </div>
                {
                    tags.length > 0 &&
                    <button title='add tag' onClick={() => setIsTagOpen(!isTagOpen)} className='float-right'><TagOutLineIcon color='text-gray-500' /></button>
                }
            </div>
            {
                isTagOpen &&
                <TagComponent setTag={setTag} />
            }
            <div className="flex mb-2 mt-3">
                <button disabled={loading || !about} onClick={handleSubmit} className={`rounded px-2 font-light py-1 text-gray-100 text-sm ${!about ? 'bg-red-300 cursor-not-allowed' : 'hover:bg-red-500 bg-btnClr'} mr-2`}>Add Task</button>
                <button disabled={loading} onClick={() => props.setIsTaskOpen()} className="rounded px-2 py-1 text-sm text-gray-800 dark:text-gray-200 dark:bg-gray-600 hover:bg-gray-200 dark:border-transparent border border-gray-300">Cancel</button>
            </div>
        </>
    )
}
