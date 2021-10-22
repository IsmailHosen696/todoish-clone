import { useEffect } from "react";
import { getNoteCollectiontData } from "../../api";
import AllIcon from "../../icons/AllIcon";
import ImportantIcon from "../../icons/ImportantIcon";
import TodayIcon from "../../icons/TodayIcon";
import TrashIcon from "../../icons/TrashIcon";
import UpcomingIcon from "../../icons/UpcomingIcon";
import { setNotes, useNoteAppDispatch, useNoteAppSelector } from "../../redux/noteSlice";
import { useAppSelector } from "../../redux/noteUtilsSlice";
import NavLinkSidevar from "./NavLinkSidevar";

export default function Sidebar() {
    const isSidebarOpen = useAppSelector(state => state.notesutils.isSidebarOpen);
    const allnotes = useNoteAppSelector(state => state.notes.notes.filter(note => !note.isCompleted));
    const notIntrash = useNoteAppSelector(state => state.notes.notes.filter(note => !note.isCompleted && !note.inTrash));
    const dispatch = useNoteAppDispatch();
    useEffect(() => {
        getNoteCollectiontData().then((data) => {
            dispatch(setNotes(data));
        })
    }, [dispatch])
    return (
        <div className={`h-full ${isSidebarOpen ? "left-0" : "-left-52"} transition-all duration-200 w-52 fixed top-12 bg-sidebarWhite dark:bg-sidebarDark`}>
            <div className="flex w-full h-full px-1 items-end flex-col mt-5">
                <NavLinkSidevar path="/" icon={<AllIcon />} name="All notes" count={notIntrash.length} />
                <NavLinkSidevar path="/today" icon={<TodayIcon />} name="Today" count={0} />
                <NavLinkSidevar path="/upcoming" icon={<UpcomingIcon />} name="Upcoming" count={0} />
                <NavLinkSidevar path="/important" icon={<ImportantIcon />} name="Important" count={allnotes.filter(note => note.isImportant && !note.inTrash).length} />
                <NavLinkSidevar path="/trash" icon={<TrashIcon color="text-red-400" />} name="Trash" count={allnotes.filter(note => note.inTrash === true).length} />
            </div>
        </div>
    )
}
