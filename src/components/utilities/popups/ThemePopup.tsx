import { useEffect, useRef, useState } from "react";
import useClick from "../../../hooks/useClick";
import TimeIcon from "../../../icons/TimeIcon";
import { setIsThemePopUpOpen, useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice";

export default function ThemePopup() {
    const [isWhiteThemeSelected, setIsWhiteThemeSelected] = useState<boolean>(true);
    const [isDarkThemeSelected, setIsDarkThemeSelected] = useState<boolean>(false);

    const { isThemePopUpOpen } = useAppSelector(state => state.notesutils)

    const dispatch = useAppDispatch();

    const themeDivRef = useRef<HTMLDivElement>(null);
    const { isInsideClick } = useClick(themeDivRef)
    useEffect(() => {
        if (isThemePopUpOpen) {
            if (!isInsideClick) {
                dispatch(setIsThemePopUpOpen(false))
                return
            }
            return
        }
    })


    useEffect(() => {
        const theme = String(localStorage.getItem('theme'))
        if (theme) {
            if (theme === 'darkTheme') {
                setIsDarkThemeSelected(true);
                setIsWhiteThemeSelected(false);
            } else {
                setIsDarkThemeSelected(false);
                setIsWhiteThemeSelected(true);

            }
        }
    }, [dispatch])
    const handleLocalStorageTheme = (theme: string) => {
        localStorage.setItem('theme', theme)
        if (theme === 'whiteTheme') {
            setIsWhiteThemeSelected(true);
            document.documentElement.classList.remove('dark')
            setIsDarkThemeSelected(false);
        } else {
            setIsWhiteThemeSelected(false);
            setIsDarkThemeSelected(true);
            document.documentElement.classList.add('dark')
        }
    }

    return (
        <div className="w-screen z-40 justify-center items-center flex absolute h-screen -top-2 left-0 dark:bg-opacity-50 bg-black bg-opacity-10">
            <div ref={themeDivRef} className="flex items-center justify-center w-96 rounded px-2 relative py-4 bg-navWhite dark:bg-gray-800 h-44">
                <button onClick={() => dispatch(setIsThemePopUpOpen(false))} className="absolute top-2 right-2 dark:text-gray-200">
                    <TimeIcon />
                </button>
                <div onClick={() => handleLocalStorageTheme('whiteTheme')} className={`${isWhiteThemeSelected && "ring ring-blue-400"} flex bg-white mx-2 justify-center rounded items-center w-36 h-20 cursor-pointer`}>
                    White
                </div>
                <div onClick={() => handleLocalStorageTheme('darkTheme')} className={` ${isDarkThemeSelected && 'ring ring-blue-400'} flex text-white justify-center mx-2 rounded bg-sidebarDark items-center w-36 h-20 cursor-pointer`}>
                    Dark
                </div>
            </div>
        </div>
    )
}
