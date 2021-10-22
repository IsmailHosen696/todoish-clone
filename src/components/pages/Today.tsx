import { useNoteAppSelector } from "../../redux/noteSlice";
import { useAppSelector } from "../../redux/noteUtilsSlice";

export default function Today() {
    const { isSidebarOpen } = useAppSelector(state => state.notesutils);
    const todayNotes = useNoteAppSelector(state => state.notes.notes.filter(note => note.date))
    console.log(todayNotes);
    console.log(Date().toLocaleUpperCase());
    return (
        <div className="overflow-hidden w-full h-full">
            <div className="mt-12 flex w-full">
                <div className={` ${isSidebarOpen ? "ml-56" : "ml-10"} transition-all duration-200 pt-2 overflow-hidden flex-wrap flex`}>
                    <p className="text-gray-700 dark:text-gray-300">today</p>
                </div>
            </div>
        </div>
    )
}
