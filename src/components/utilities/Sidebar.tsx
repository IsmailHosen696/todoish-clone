import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AllIcon from "../../icons/AllIcon";
import GreaterthanIcon from "../../icons/GreaterthanIcon";
import PlusIcon from "../../icons/PlusIcon";
import TodayIcon from "../../icons/TodayIcon";
import UpcomingIcon from "../../icons/UpcomingIcon";
import { setNewProjectOpen, setNewTagOpen, useAppDispatch, useAppSelector } from "../../redux/noteUtilsSlice";
import NavLinkSidevar from "./NavLinkSidevar";
import { deletePtojectFromFirebase, deleteTagFromFirebase, getProjectsFromFirebase, getTagFromFirebase } from '../../api/addProjectApi'
import { getALlProject, deleteProject, deleteTag, getAllTag } from "../../redux/noteSlice";
import '../../styles/CustomSel.css'
import TrashIcon from "../../icons/TrashIcon";
import TagIcon from "../../icons/TagIcon";

export default function Sidebar() {
    const { isSidebarOpen, isNewTagOpen, isNewProjectOpen } = useAppSelector(state => state.notesutils)
    const { projects, tags } = useAppSelector(state => state.notes);

    const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);
    const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getProjectsFromFirebase().then(data => {
            dispatch(getALlProject(data));
        }).catch((err) => {
            console.log(err);
        })
        getTagFromFirebase().then(data => {
            dispatch(getAllTag(data));
        }).catch((err) => {
            console.log(err);
        })
    }, [dispatch]);

    const handleDeleteProject = (id: string) => {
        dispatch(deleteProject(id));
        deletePtojectFromFirebase(id);

    }
    const handleDeleteTag = (id: string) => {
        dispatch(deleteTag(id));
        deleteTagFromFirebase(id);
    }
    return (
        <div className={`h-full fixed overflow-hidden ${isSidebarOpen ? "left-0" : "-left-52"} transition-all duration-200 w-52 top-12 bg-sidebarWhite dark:bg-sidebarDark`}>
            <div className="flex pb-20 pt-2 proj overflow-y-auto w-full h-full pl-4 flex-col">
                <NavLinkSidevar iconcolor={'text-purple-500'} name="Inbox" icon={<AllIcon />} count={0} path="/" />
                <NavLinkSidevar iconcolor={'text-blue-500'} name="Today Notes" icon={<TodayIcon />} count={0} path="/today" />
                <NavLinkSidevar iconcolor={'text-fuchsia-500'} name="Upcoming" icon={<UpcomingIcon />} count={0} path="/upcoming" />
                {/* projects */}
                <button
                    className="flex justify-between pl-2 my-1 pr-1 group dark:hover:bg-selectDark w-44 py-1 items-center rounded hover:bg-selectWhite">
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
                </button>
                {
                    isProjectOpen &&
                    <div>
                        <div className="items-start ml-4 h-full flex flex-col my-1">
                            {projects.length > 0 ?
                                projects.map((item) => (
                                    <NavLink exact to={`/p/${item.id}`}
                                        activeClassName="activeSidebarLink"
                                        key={item.id} id={item.id}
                                        className="w-40 px-2 py-1 group rounded flex justify-between items-center dark:hover:bg-selectDark hover:bg-selectWhite">
                                        <span className="flex items-center">
                                            <div className={`flex w-3 h-3 ${item.color} rounded-full`}></div>
                                            <span className="truncate w-28 dark:text-gray-300 px-2">
                                                {item.name}
                                            </span>
                                        </span>
                                        <button onClick={() => {
                                            handleDeleteProject(item.id)
                                        }}
                                            className="dark:text-gray-300 text-gray-700 opacity-0 group-hover:opacity-100 text-sm">
                                            <TrashIcon />
                                        </button>
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
                <button className="flex justify-between my-1 pl-2 pr-1 group dark:hover:bg-selectDark w-44 py-1 items-center rounded hover:bg-selectWhite">
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
                                        className="w-40 px-2 py-1 group rounded flex justify-between items-center dark:hover:bg-selectDark hover:bg-selectWhite">
                                        <span className="flex items-center">
                                            <TagIcon color={item.color} />
                                            <span className="truncate w-28 dark:text-gray-300 px-2">
                                                {item.name}
                                            </span>
                                        </span>
                                        <button onClick={() => {
                                            handleDeleteTag(item.id)
                                        }}
                                            className="dark:text-gray-300 text-gray-700 opacity-0 group-hover:opacity-100 text-sm">
                                            <TrashIcon />
                                        </button>
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
