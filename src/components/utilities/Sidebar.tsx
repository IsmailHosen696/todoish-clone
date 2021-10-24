import { useState } from "react";
import AllIcon from "../../icons/AllIcon";
import GreaterthanIcon from "../../icons/GreaterthanIcon";
import PlusIcon from "../../icons/PlusIcon";
import TodayIcon from "../../icons/TodayIcon";
import UpcomingIcon from "../../icons/UpcomingIcon";
import { setNewProjectOpen, useAppDispatch, useAppSelector } from "../../redux/noteUtilsSlice";
import NavLinkSidevar from "./NavLinkSidevar";

export default function Sidebar() {
    const isSidebarOpen = useAppSelector(state => state.notesutils.isSidebarOpen);
    const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { isNewProjectOpen } = useAppSelector(state => state.notesutils)
    const { projects } = useAppSelector(state => state.notes)
    return (
        <div className={`h-full ${isSidebarOpen ? "left-0" : "-left-52"} transition-all duration-200 w-52 fixed top-12 bg-sidebarWhite dark:bg-sidebarDark`}>
            <div className="flex w-full h-full pl-4 flex-col group mt-5">
                <NavLinkSidevar name="Inbox" icon={<AllIcon />} count={0} path="/" />
                <NavLinkSidevar name="Today Notes" icon={<TodayIcon />} count={0} path="/today" />
                <NavLinkSidevar name="Upcoming" icon={<UpcomingIcon />} count={0} path="/upcoming" />
                <button className="flex justify-between pl-2 pr-1 dark:hover:bg-selectDark w-44 py-1 items-center rounded hover:bg-selectWhite">
                    <span onClick={() => {
                        setIsProjectOpen(!isProjectOpen);
                    }}
                        className="flex flex-1 items-center">
                        <span className={`dark:text-gray-300 text-gray-500 ${isProjectOpen && 'transform rotate-90'}`}><GreaterthanIcon /></span>
                        <span className="pr-2 pl-1 dark:text-gray-300">Projects</span>
                    </span>
                    <span onClick={() => { setIsProjectOpen(true); dispatch(setNewProjectOpen(!isNewProjectOpen)) }} className="opacity-0 text-gray-500 dark:text-gray-300 text-sm group-hover:opacity-100"><PlusIcon /></span>
                </button>
                {
                    isProjectOpen &&
                    <div className="">
                        <div className="items-end flex flex-col">
                            {
                                projects.map((item) => (
                                    <button key={item.id} id={item.id} className="w-40 px-2 py-1 rounded flex items-center dark:hover:bg-selectDark hover:bg-selectWhite">
                                        <div className={`flex w-3 h-3 ${item.color} rounded-full`}></div>
                                        <span className="dark:text-gray-300 px-2">
                                            {item.name}
                                        </span>
                                    </button>
                                ))}
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}
