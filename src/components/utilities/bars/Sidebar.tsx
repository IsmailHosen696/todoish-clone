import { useState } from "react";
import AllIcon from "../../../icons/AllIcon";
import TodayIcon from "../../../icons/TodayIcon";
import UpcomingIcon from "../../../icons/UpcomingIcon";
import { setContextPosition, setIsContextMenuOpen, setNewProjectOpen, setNewTagOpen, useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice";
import NavLinkSidevar from "./NavLinkSidevar";
import '../../../styles/CustomSel.css';
import TagIcon from "../../../icons/TagIcon";
import NavLink2 from "./NavLink2";
import LablePrjojects from "./LablePrjojects";

export default function Sidebar() {
    const { isSidebarOpen, isNewTagOpen, isNewProjectOpen } = useAppSelector(state => state.notesutils)
    const { projects, tags, notes } = useAppSelector(state => state.notes);

    const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);
    const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    return (
        <div className={`h-full fixed overflow-hidden ${isSidebarOpen ? "left-0" : "sm:-left-72 hidden "} sm:w-auto w-full z-30 bg-opacity-20 transition-all duration-200 top-12 sm:dark:bg-opacity-20`}>
            <div className="flex pb-20 pt-8 proj overflow-y-auto sm:w-72 w-full h-full pl-8 pr-2 dark:bg-sidebarDark bg-sidebarWhite flex-col">
                <NavLinkSidevar
                    iconcolor={'text-blue-400'}
                    name="Inbox"
                    icon={<AllIcon />}
                    count={notes.filter(note => note.parentid === 'Inbox').length}
                    path="/" />
                <NavLinkSidevar
                    iconcolor={'text-green-500'}
                    name="Today"
                    icon={<TodayIcon />}
                    count={notes.filter(note => note.parentid === 'Today').length}
                    path="today" />
                <NavLinkSidevar
                    iconcolor={'text-purple-400'}
                    name="Upcoming"
                    icon={<UpcomingIcon />}
                    count={notes.filter(note => note.parentid === 'Upcoming').length}
                    path="upcoming" />

                {/* projects */}
                <LablePrjojects
                    toggleButton={() => {
                        setIsProjectOpen(!isProjectOpen);
                    }}
                    isOpen={isProjectOpen}
                    name='Projects'
                    setOpen={() => {
                        dispatch(setNewProjectOpen(!isNewProjectOpen))
                    }}
                    newMenuOpen={isNewProjectOpen}
                    setIsOpen={() => setIsProjectOpen(true)}
                />
                {
                    isProjectOpen &&
                    <div className="w-full ml-2 pr-2 flex flex-col my-1">
                        {projects.length > 0 ?
                            projects.map((item) => (
                                <NavLink2 key={item.id} type="Projects" id={item.id} name={item.name} color={item.color} />
                            ))
                            :
                            <p className="dark:text-gray-400 text-sm">no projects found . hover project and press the plus icon to create project</p>
                        }
                    </div>
                }
                {/* projects end */}


                {/* lables */}
                <LablePrjojects
                    toggleButton={() => {
                        setIsTagsOpen(!isTagsOpen)
                    }}
                    isOpen={isTagsOpen}
                    name='Tags'
                    newMenuOpen={isNewTagOpen}
                    setOpen={() => {
                        dispatch(setNewTagOpen(!isNewTagOpen))
                    }}
                    setIsOpen={() => setIsTagsOpen(true)}
                />
                {
                    isTagsOpen &&
                    <div className="items-start w-full my-1 h-full flex flex-col">
                        {tags.length > 0 ?
                            tags.map((item) => (
                                <div key={item.id}
                                    onContextMenu={(e) => {
                                        e.preventDefault()
                                        dispatch(setIsContextMenuOpen(true))
                                        dispatch(setContextPosition({ x: e.clientX, y: e.clientY, id: item.id, type: 'tag' }))
                                    }}
                                    className="w-full px-2 py-1 cursor-pointer group rounded flex justify-between items-center dark:hover:bg-selectDark hover:bg-selectWhite">
                                    <span className="flex items-center">
                                        <TagIcon color={`${item.color}`} />
                                        <span style={{ maxWidth: "11rem" }} className="truncate dark:text-gray-300 px-3">
                                            {item.name}
                                        </span>
                                    </span>
                                </div>
                            ))
                            :
                            <p className="dark:text-gray-400 text-sm">no tags found . hover tag and press the plus icon to create new tag</p>
                        }
                    </div>
                }
                {/* lables end */}
            </div>
        </div >
    )
}
