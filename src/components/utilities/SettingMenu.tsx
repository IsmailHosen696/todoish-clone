import { useState } from "react";
import ThemeIcons from "../../icons/ThemeIcons";
import ThemePopup from "./ThemePopup";

export default function SettingMenu() {
    const [isThemePopupOpen, setIsThemePopupOpen] = useState<boolean>(false)
    return (
        <>
            <div className="flex w-64 rounded px-2 absolute top-14 right-3 py-4 dark:bg-gray-800 bg-navWhite">
                <button className="flex" onClick={() => setIsThemePopupOpen(!isThemePopupOpen)}>
                    <ThemeIcons />
                    <span className="px-1 dark:text-gray-300">Themes</span>
                </button>
            </div>
            {
                isThemePopupOpen &&
                <ThemePopup isThemePopupOpen={() => setIsThemePopupOpen(false)} />
            }
        </>
    )
}
