import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../../../icons/HomeIcon";
import MenuIcon from "../../../icons/MenuIcon";
import PlusIcon from "../../../icons/PlusIcon";
import SearchIcon from "../../../icons/SearchIcon";
import TimeIcon from "../../../icons/TimeIcon";
import { setAddNotePopOpen, setIsSettingMenuOpen, setSidebarOpen, useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice";
import DotIcon from "../../../icons/DotIcon";

export default function Navbar() {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [isSearchInputFocused, setIsSearchInputFocused] = useState<boolean>(false);
    const [isAdjustmentComponentOpen, setIsAdjustmentComponentOpen] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const dispatch = useAppDispatch();
    const { isAddNoteOpen } = useAppSelector(state => state.notesutils)

    useEffect(() => {
        window.addEventListener('keydown', (e) => setSeatchBarActive(e))
        function setSeatchBarActive(e: KeyboardEvent) {
            switch (e.key) {
                case 'Escape':
                    searchInputRef.current?.blur();
                    setIsSearchInputFocused(false)
                    break;
                case '/':
                    searchInputRef.current?.focus();
                    setIsSearchInputFocused(true)
                    break;
                default:
                    break;
            }
        }
    });
    const handleOpen = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
            dispatch(setSidebarOpen(false));
        } else {
            setIsSidebarOpen(true);
            dispatch(setSidebarOpen(true));

        }
    }
    return (
        <>
            <div className='flex z-40 items-center w-full fixed shadow top-0 dark:bg-navDark bg-navWhite h-12 justify-center'>
                <div className="relative w-full">
                    <div className="w-full px-3 sm:px-10 flex items-center justify-between">
                        <div className="flex items-center">
                            <button onClick={handleOpen} className="mr-1 pr-1 dark:text-gray-200">
                                <MenuIcon />
                            </button>
                            <Link to='/' className="mx-1 px-1 dark:text-gray-200">
                                <HomeIcon />
                            </Link >
                            <div className="sm:flex dark:bg-selectDark hidden h-7 rounded bg-white px-2 ml-2 items-center">
                                <button className="px-1 dark:text-gray-200">
                                    <SearchIcon />
                                </button>
                                <input ref={searchInputRef}
                                    placeholder="Search"
                                    onBlur={() => setIsSearchInputFocused(false)}
                                    onFocus={() => setIsSearchInputFocused(true)}
                                    className={`${isSearchInputFocused && 'sm:w-52'} dark:text-gray-300 sm:w-32 dark:placeholder-gray-300 text-sm px-1 bg-transparent outline-none border-none`}
                                    type="text" />
                                <button className={`${isSearchInputFocused ? "visible" : "hidden"} dark:text-gray-200 px-1`}>
                                    <TimeIcon />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="mx-1 dark:text-gray-200" onClick={() => dispatch(setAddNotePopOpen(!isAddNoteOpen))}>
                                <PlusIcon />
                            </button>
                            <button className="mx-1 w-7 h-7 rounded-full hover:bg-white dark:hover:bg-gray-600 flex items-center justify-center dark:text-gray-200" onClick={() => { setIsAdjustmentComponentOpen(!isAdjustmentComponentOpen); dispatch(setIsSettingMenuOpen(isAdjustmentComponentOpen)) }}>
                                <DotIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
