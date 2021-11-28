import { useState } from "react";
import { NavLink } from "react-router-dom";
import AllIcon from "../../../icons/AllIcon";
import GreaterthanIcon from "../../../icons/GreaterthanIcon";
import PlusIcon from "../../../icons/PlusIcon";
import TodayIcon from "../../../icons/TodayIcon";
import UpcomingIcon from "../../../icons/UpcomingIcon";
import { setContextPosition, setIsContextMenuOpen, setNewProjectOpen, setNewTagOpen, useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice";
import NavLinkSidevar from "./NavLinkSidevar";
import '../../../styles/CustomSel.css';
import TagIcon from "../../../icons/TagIcon";

export default function Sidebar() {
    const { isSidebarOpen, isNewTagOpen, isNewProjectOpen } = useAppSelector(state => state.notesutils)
    const { projects, tags, notes } = useAppSelector(state => state.notes);

    const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);
    const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    return (
        <div className={`h-full fixed overflow-hidden ${isSidebarOpen ? "left-0" : "-left-52"} transition-all duration-200 w-52 top-12 bg-sidebarWhite dark:bg-sidebarDark`}>
            <div className="flex pb-20 pt-2 proj overflow-y-auto w-full h-full pl-4 flex-col">
                <NavLinkSidevar iconcolor={'text-purple-500'} name="Inbox" icon={<AllIcon />} count={notes.filter(note => note.parentid === 'Inbox').length} path="" />
                <NavLinkSidevar iconcolor={'text-blue-500'} name="Today" icon={<TodayIcon />} count={notes.filter(note => note.parentid === 'Today').length} path="today" />
                <NavLinkSidevar iconcolor={'text-fuchsia-500'} name="Upcoming" icon={<UpcomingIcon />} count={notes.filter(note => note.parentid === 'Upcoming').length} path="upcoming" />
                {/* projects */}
                <div
                    className="flex justify-between cursor-pointer pl-2 my-1 pr-1 group w-44 py-1 items-center rounded">
                    <span onClick={() => {
                        setIsProjectOpen(!isProjectOpen);
                    }}
                        className="flex flex-1 items-center">
                        <span className={`dark:text-gray-300 text-gray-500 ${isProjectOpen && 'transform rotate-90'}`}><GreaterthanIcon /></span>
                        <span className="pr-2 pl-1 dark:text-gray-300">Projects</span>
                    </span>
                    <span onClick={() => {
                        setIsProjectOpen(true);
                        dispatch(setNewProjectOpen(!isNewProjectOpen))
                    }}
                        className="opacity-0 text-gray-500 dark:text-gray-300 text-sm group-hover:opacity-100">
                        <PlusIcon />
                    </span>
                </div>
                {

                    isProjectOpen &&
                    <div>
                        <div className="items-start ml-4 h-full flex flex-col my-1">
                            {projects.length > 0 ?
                                projects.map((item) => (
                                    <NavLink
                                        onContextMenu={(e) => {
                                            e.preventDefault()
                                            dispatch(setIsContextMenuOpen(true))
                                            dispatch(setContextPosition({ x: e.clientX, y: e.clientY, id: item.id, type: 'project' }))
                                        }}
                                        to={`/p/${item.id}`}
                                        title={`${item.name}`}
                                        key={item.id} id={item.id}
                                        className={(pos) => `w-40 px-2 py-1 ${pos.isActive ? 'activeSidebarLink' : ''} group rounded flex justify-between items-center dark:hover:bg-selectDark hover:bg-selectWhite`}>
                                        <div className="flex w-full items-center">
                                            <button className={`flex w-3 h-3 ${item.color} px-1 rounded-full`}></button>
                                            <div className="flex justify-between items-center w-full">
                                                <span className="truncate text-base w-28 dark:text-gray-300 px-2">
                                                    {item.name}
                                                </span>
                                                <span className="dark:text-gray-300 text-sm">
                                                    {notes.filter(note => note.parentid === item.id).length}
                                                </span>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))
                                :
                                <p className="dark:text-gray-400 text-sm">no projects found . hover project and press the plus icon to create project</p>
                            }
                        </div>
                    </div>
                }
                {/* projects end */}


                {/* lables */}
                <button className="flex justify-between my-1 pl-2 pr-1 group w-44 py-1 items-center rounded">
                    <span onClick={() => {
                        setIsTagsOpen(!isTagsOpen);
                    }}
                        className="flex flex-1 items-center">
                        <span
                            className={`dark:text-gray-300 text-gray-500 ${isTagsOpen && 'transform rotate-90'}`}>
                            <GreaterthanIcon />
                        </span>
                        <span
                            className="pr-2 pl-1 dark:text-gray-300">
                            Tags
                        </span>
                    </span>
                    <span onClick={() => {
                        setIsTagsOpen(true);
                        dispatch(setNewTagOpen(!isNewTagOpen))
                    }}
                        className="opacity-0 text-gray-500 dark:text-gray-300 text-sm group-hover:opacity-100">
                        <PlusIcon />
                    </span>
                </button>
                {
                    isTagsOpen &&
                    <div>
                        <div className="items-start ml-4 my-1 h-full flex flex-col">
                            {tags.length > 0 ?
                                tags.map((item) => (
                                    <div key={item.id}
                                        onContextMenu={(e) => {
                                            e.preventDefault()
                                            dispatch(setIsContextMenuOpen(true))
                                            dispatch(setContextPosition({ x: e.clientX, y: e.clientY, id: item.id, type: 'tag' }))
                                        }}
                                        className="w-40 px-2 py-1 cursor-pointer group rounded flex justify-between items-center dark:hover:bg-selectDark hover:bg-selectWhite">
                                        <span className="flex items-center">
                                            <TagIcon color={`${item.color}`} />
                                            <span className="truncate w-28 dark:text-gray-300 px-2">
                                                {item.name}
                                            </span>
                                        </span>
                                    </div>
                                ))
                                :
                                <p className="dark:text-gray-400 text-sm">no tags found . hover tag and press the plus icon to create new tag</p>
                            }
                        </div>
                    </div>
                }
                {/* lables end */}
            </div>
        </div >
    )
}
