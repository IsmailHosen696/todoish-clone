import PencilIcon from "../../icons/PencilIcon";
import TrashIcon from "../../icons/TrashIcon";
import { addToTrash, makeComplete, useNoteAppDispatch, useNoteAppSelector } from "../../redux/noteSlice";
import { useAppSelector } from "../../redux/noteUtilsSlice";

export default function Important() {
    const isSidebarOpen = useAppSelector(state => state.notesutils.isSidebarOpen);
    const impNote = useNoteAppSelector(state => state.notes.notes.filter(note => note.isImportant && !note.inTrash && !note.isCompleted));
    const dispatch = useNoteAppDispatch();
    return (
        <div className="overflow-hidden w-full h-full">
            <div className="mt-12 flex w-full">
                <div className={`${isSidebarOpen ? "ml-56" : "mx-auto"} mt-5 overflow-hidden container flex-wrap flex flex-col`}>
                    <div className="w-6/12 mx-auto">
                        <h1 className="text-xl pl-5 font-medium pb-2 border-b">important notes</h1>
                        {impNote.length > 0 ?
                            impNote.map((note) => (
                                <div key={note.id} className="flex border-b justify-between items-center group px-3 rounded py-3 m-2 dark:bg-gray-700 dark:text-gray-300">
                                    <div className="flex items-center">
                                        <input type="radio" className="cursor-pointer outline-none" onClick={() => dispatch(makeComplete(note.id))} />
                                        <div className="flex-col px-2">
                                            <h1 className="text-gray-500">{note.headline}</h1>
                                            <h3 className="text-sm text-gray-400">{note.description}</h3>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button onClick={() => dispatch(addToTrash(note.id))} className="mx-1 group-hover:opacity-100 opacity-0">
                                            <TrashIcon color="text-gray-400" />
                                        </button>
                                        <button className="mx-1 group-hover:opacity-100 opacity-0">
                                            <PencilIcon />
                                        </button>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="flex w-full items-center mt-2">
                                <p className="text-center pl-5 dark:text-gray-200">You have no important note exists . press <span className="py-1 px-2 bg-gray-300 rounded">(+)</span> icon to create new note.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
