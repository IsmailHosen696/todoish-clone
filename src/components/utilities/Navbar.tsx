import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AdjustIcon from "../../icons/AdjustIcon";
import HomeIcon from "../../icons/HomeIcon";
import MenuIcon from "../../icons/MenuIcon";
import PlusIcon from "../../icons/PlusIcon";
import SearchIcon from "../../icons/SearchIcon";
import TimeIcon from "../../icons/TimeIcon";
import { setAddNotePopOpen, setSidebarOpen, useAppDispatch } from "../../redux/noteUtilsSlice";
import SettingMenu from "./SettingMenu";

export default function Navbar() {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [isSearchInputFocused, setIsSearchInputFocused] = useState<boolean>(false);
    const [isAdjustmentComponentOpen, setIsAdjustmentComponentOpen] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const dispatch = useAppDispatch();

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
            <div className='flex z-50 items-center w-full fixed shadow top-0 dark:bg-navDark bg-navWhite h-12 justify-center'>
                <div className="relative w-full">
                    <div className="w-full px-10 flex items-center justify-between">
                        <div className="flex items-center">
                            <button onClick={handleOpen} className="mr-1 pr-1">
                                <MenuIcon />
                            </button>
                            <Link to='/' className="mx-1 px-1">
                                <HomeIcon />
                            </Link >
                            <div className="flex dark:bg-selectDark h-8 rounded bg-white px-2 ml-2 items-center">
                                <button className="px-1">
                                    <SearchIcon />
                                </button>
                                <input ref={searchInputRef} placeholder="Search notes" onBlur={() => setIsSearchInputFocused(false)} onFocus={() => setIsSearchInputFocused(true)} className={`${isSearchInputFocused && 'w-72'} dark:text-gray-300  w-52 px-1 bg-transparent outline-none border-none`} type="text" />
                                <button className={`${isSearchInputFocused ? "visible" : "hidden"} px-1`}>
                                    <TimeIcon />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="mx-1" onClick={() => dispatch(setAddNotePopOpen(true))}>
                                <PlusIcon />
                            </button>
                            <button className="mx-1" onClick={() => setIsAdjustmentComponentOpen(!isAdjustmentComponentOpen)}>
                                <AdjustIcon />
                            </button>
                        </div>
                    </div>
                    {
                        isAdjustmentComponentOpen &&
                        <SettingMenu />
                    }
                </div>
            </div>
        </>
    )
}
