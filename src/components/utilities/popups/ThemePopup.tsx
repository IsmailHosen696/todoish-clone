import { useEffect, useState } from "react";
import TimeIcon from "../../../icons/TimeIcon";
import { setTheme, useAppDispatch } from "../../../redux/noteUtilsSlice";

export default function ThemePopup(props: { isThemePopupOpen: Function }) {
    const [isWhiteThemeSelected, setIsWhiteThemeSelected] = useState<boolean>(true);
    const [isDarkThemeSelected, setIsDarkThemeSelected] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const theme = String(localStorage.getItem('theme'))
        if (theme) {
            if (theme === 'darkTheme') {
                dispatch(setTheme('darkTheme'))
                setIsDarkThemeSelected(true);
                setIsWhiteThemeSelected(false);
            } else {
                dispatch(setTheme('whiteTheme'))
                setIsDarkThemeSelected(false);
                setIsWhiteThemeSelected(true);

            }
        }
    }, [dispatch])
    const handleLocalStorageTheme = (theme: string) => {
        localStorage.setItem('theme', theme)
        if (theme === 'whiteTheme') {
            dispatch(setTheme('whiteTheme'))
            setIsWhiteThemeSelected(true);
            setIsDarkThemeSelected(false);
        } else {
            dispatch(setTheme('darkTheme'))
            setIsWhiteThemeSelected(false);
            setIsDarkThemeSelected(true);
        }
    }

    return (
        <div className="w-screen z-40 justify-center items-center flex absolute h-screen -top-2 left-0 dark:bg-opacity-50 bg-black bg-opacity-10">
            <div className="flex items-center justify-center w-96 rounded px-2 relative py-4 bg-navWhite dark:bg-gray-700 h-44">
                <button onClick={() => props.isThemePopupOpen()} className="absolute top-2 right-2">
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
