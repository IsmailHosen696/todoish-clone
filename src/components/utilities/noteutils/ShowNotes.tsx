import { daleteNoteFromFirebase } from "../../../api/addnoteApi"
import PencilIcon from "../../../icons/PencilIcon"
import TagIcon from "../../../icons/TagIcon"
import TrashIcon from "../../../icons/TrashIcon"
import { deleteNote } from "../../../redux/noteSlice"
import { setIsUpdateNoteOpen, setSelectedNoteForEdit, useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice"
import { noteType } from "../../../types"

export default function ShowNotes(props: { id: string }) {
    const notes: noteType[] = useAppSelector(state => state.notes.notes.filter(note => note.parentid === props.id))
    const alltag = useAppSelector(state => state.notes.tags)
    const dispatch = useAppDispatch()
    const handleChange = (id: string) => {
        dispatch(deleteNote(id))
        daleteNoteFromFirebase(id)
    }
    return (
        <div className="w-full h-full flex justify-center items-center">
            {notes.length > 0 &&
                <div className="flex flex-col p-4 w-6/12">
                    {/* rendering note with parentid */}
                    <div className="flex w-full justify-center flex-col">
                        {notes.map(note => (
                            <div key={note.id} className="flex group w-full relative dark:hover:bg-sidebarDark py-3 justify-between border-b border-gray-100 dark:border-gray-700 dark:text-gray-200 px-3">
                                <div className="flex items-start">
                                    <input onChange={() => handleChange(note.id)} type="radio" className="mt-1 cursor-pointer mr-2" />
                                    <div className="flex flex-col w-full">
                                        <h1 className="dark:text-gray-300 text-sm">{note.about}</h1>
                                        <p className="text-xs leading-relaxed tracking-wider dark:text-gray-400 py-2">{note.description}</p>
                                        <div className="flex flex-wrap">
                                            {
                                                note.tags?.map((tag) => (
                                                    <div key={tag.id} className={`flex mr-1 items-center cursor-pointer hover:underline hover:text-blue-500 rounded h-8 px-1`}>
                                                        <TagIcon color={` ${alltag.find(tg => tg.id === tag.id)?.color as string}`} />
                                                        <span className={`text-xs w-16 truncate ml-1`}>{alltag.find(tg => tg.id === tag.id)?.name}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex opacity-0 group-hover:opacity-100">
                                    <button
                                        onClick={() => {
                                            dispatch(setIsUpdateNoteOpen(true))
                                            dispatch(setSelectedNoteForEdit(note.id))
                                        }}
                                        className="hover:bg-gray-200 dark:hover:bg-gray-700 w-8 h-8 flex items-center justify-center rounded-full">
                                        <PencilIcon />
                                    </button>
                                    <button
                                        onClick={() => {
                                            dispatch(deleteNote(note.id))
                                            daleteNoteFromFirebase(note.id)
                                        }}
                                        className="mr-3 hover:bg-gray-200 dark:hover:bg-gray-700 w-8 h-8 flex items-center justify-center rounded-full">
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>

                        ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}
