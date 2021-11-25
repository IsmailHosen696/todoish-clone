import { signOut } from "firebase/auth"
import { useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../../firebase/firebase"
import useClick from "../../../hooks/useClick"
import CogIcon from "../../../icons/CogIcon"
import DarkThemeIcons from "../../../icons/DarkThemeIcons"
import LogoutIcon from "../../../icons/LogoutIcon"
import WhiteThemeIcons from "../../../icons/WhiteThemeIcons"
import { setIsSettingMenuOpen, setIsThemePopUpOpen, useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice"

export default function SettingMenu() {
    const { isSettingMenuOpen, user, theme } = useAppSelector(state => state.notesutils)
    const settingRef = useRef<HTMLDivElement>(null)
    const { isInsideClick } = useClick(settingRef)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (isSettingMenuOpen) {
            if (!isInsideClick) {
                dispatch(setIsSettingMenuOpen(false))
                return
            }
        }
        return
    })
    return (
        <div ref={settingRef} className={`w-60 absolute ${isSettingMenuOpen ? 'top-14' : "top-0"} dark:text-gray-100 rounded transition-all duration-150 right-12 dark:bg-gray-800 border dark:border-gray-600 border-gray-200 z-50 pt-2`}>
            <div className="flex flex-col w-full">
                <Link to='/user/profile' className="flex hover:bg-gray-100 dark:hover:bg-gray-700 flex-col py-2 mt-2 w-full border-b dark:border-gray-600 border-gray-200">
                    <div className="flex w-full">

                        {
                            user.photoURL === null ?
                                <div className="w-12 h-12 mx-3 rounded-full bg-white dark:bg-gray-800 border-2 flex items-center justify-center hover:bg-sidebarWhite cursor-pointer border-blue-400">
                                    <p>{user.displayName?.substring(0, 2)}</p>
                                </div>
                                :
                                <div className="w-16 h-16 mx-3 rounded-full bg-white dark:bg-gray-800 object-cover border-2 flex items-center justify-center hover:bg-sidebarWhite cursor-pointer border-blue-400">
                                    <img src={user.photoURL} className='w-full h-full object-cover' alt="logged_in_user_profile" />
                                </div>
                        }
                        <div className="flex flex-col">
                            <p className="px-3">{user.displayName}</p>
                            <p className="px-3">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-5 pl-3 flex items-center"><CogIcon /> <span className="px-2 text-sm">Settings</span></div>
                </Link>
                <div className="flex flex-col">
                    <div onClick={() => dispatch(setIsThemePopUpOpen(true))} className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-600 border-gray-200">
                        <div className="pl-3 flex items-center cursor-pointer">
                            {
                                theme === 'whiteTheme' ?
                                    <WhiteThemeIcons />
                                    :
                                    <DarkThemeIcons />
                            }
                            <span className="pl-2 text-sm">Theme</span>
                        </div>
                    </div>
                    <button onClick={() => { signOut(auth); navigate('/signin') }} className="flex pl-3 items-center py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <LogoutIcon />
                        <span className="text-sm pl-2">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
