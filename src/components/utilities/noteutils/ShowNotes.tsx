import { daleteNoteFromFirebase } from "../../../api/addnoteApi"
import Rename from "../../../icons/Rename"
import TrashIcon from "../../../icons/TrashIcon"
import { deleteNote } from "../../../redux/noteSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice"
import { noteType } from "../../../types"

export default function ShowNotes(props: { id: string }) {
    const notes: noteType[] = useAppSelector(state => state.notes.notes.filter(note => note.parentid === props.id))
    const alltag = useAppSelector(state => state.notes.tags)
    const dispatch = useAppDispatch()
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col p-4 w-7/12">
                {/* rendering note with parentid */}
                <div className="flex flex-col w-full justify-center items-center">
                    {
                        notes.map(note => (
                            <div key={note.id} className="flex w-full relative py-3 flex-col dark:bg-gray-800 bg-navWhite shadow rounded px-3 mt-2">
                                <h1 className="font-medium">{note.about}</h1>
                                <p className="text-sm py-1">{note.description}</p>
                                <div className="flex flex-wrap">
                                    {
                                        note.tags?.map((tag, index) => (
                                            <button key={index} className={`${alltag.filter(tg => tg.id === tag.id)[0].color} px-2 mr-1 text-gray-100 h-5 flex justify-center items-center rounded`}>
                                                <span className="text-xs">{alltag.filter(tg => tg.id === tag.id)[0].name}</span>
                                            </button>
                                        ))
                                    }
                                </div>
                                <div className="flex">
                                    <button
                                        onClick={() => {
                                            dispatch(deleteNote(note.id))
                                            daleteNoteFromFirebase(note.id)
                                        }}
                                        className="mr-3 hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full">
                                        <TrashIcon />
                                    </button>
                                    <button className="mr-3 hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full">
                                        <Rename />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* new note at that point */}
                <div className="flex flex-col"></div>
            </div>
        </div>
    )
}
