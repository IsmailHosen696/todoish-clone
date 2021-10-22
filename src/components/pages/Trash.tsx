import { deleteDataFromNoteCollectiont, updateNoteTrashCollectiontData } from "../../api";
import ArrowUp from "../../icons/ArrowUp";
import TrashIcon from "../../icons/TrashIcon";
import { addToTrash, useNoteAppSelector, deleteNote } from "../../redux/noteSlice";
import { useAppDispatch, useAppSelector } from "../../redux/noteUtilsSlice";

export default function Trash() {
    const isSidebarOpen = useAppSelector(state => state.notesutils.isSidebarOpen);
    const trashNotes = useNoteAppSelector(state => state.notes.notes.filter(note => note.inTrash && !note.isCompleted))
    const dispatch = useAppDispatch();
    return (
        <div className="overflow-hidden w-full h-full">
            <div className="mt-12 flex w-full">
                <div className={`${isSidebarOpen ? "ml-56" : "mx-auto"} mt-5 overflow-hidden container flex-wrap flex flex-col`}>
                    <div className="w-6/12 mx-auto">
                        <h1 className="text-xl pl-5 font-medium pb-2 border-b">Trash</h1>
                        {trashNotes.length > 0 ?
                            trashNotes.map((note) => (
                                <div key={note.id} className="flex border-b justify-between items-center group px-3 rounded py-3 m-2 dark:bg-gray-700 dark:text-gray-300">
                                    <div className="flex-col px-2">
                                        <h1 className="text-gray-500">{note.headline}</h1>
                                        <h3 className="text-sm text-gray-400">{note.description}</h3>
                                    </div>
                                    <div className="flex">
                                        <button title="move from trash" onClick={() => {
                                            dispatch(addToTrash(note.id))
                                            updateNoteTrashCollectiontData(note.id, false)
                                        }}
                                            className="mx-1 group-hover:opacity-100 opacity-0">
                                            <ArrowUp />
                                        </button>
                                        <button title="delete permanently" onClick={() => {
                                            dispatch(deleteNote(note.id))
                                            deleteDataFromNoteCollectiont(note.id)
                                        }}
                                            className="mx-1 group-hover:opacity-100 opacity-0">
                                            <TrashIcon color="text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="flex w-full items-center mt-2">
                                <p className="text-center pl-5 dark:text-gray-200">Trash is empty !</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
