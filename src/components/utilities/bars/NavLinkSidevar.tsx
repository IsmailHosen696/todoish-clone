import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { setSidebarOpen, useAppDispatch } from "../../../redux/noteUtilsSlice";

interface propType {
    name: string,
    icon: JSX.Element,
    count: number,
    path: string,
    iconcolor: string
}
export default function NavLinkSidevar(props: propType) {
    const [size, setSize] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (window.screenX < 640) {
            setSize(true)
        }
    }, [setSize])
    return (
        <NavLink
            onClick={() => {
                if (size) {
                    dispatch(setSidebarOpen(false));
                }
                return
            }}
            className={(pos) => `${pos.isActive ? 'activeSidebarLink' : ""} flex py-2 px-3 text-sm dark:hover:bg-selectDark bg-opacity-25 dark:focus:bg-blue-400 hover:bg-selectWhite rounded justify-between items-center focus:bg-blue-400 focus:text-white`}
            to={props.path}>
            <span
                className="items-center flex">
                <span className={props.iconcolor}>
                    {props.icon}
                </span>
                <span className="tracking-wide px-2 dark:text-gray-300">
                    {props.name}
                </span>
            </span>
            <span className="dark:text-gray-400 text-xs font-light">
                {props.count}
            </span>
        </NavLink>
    )
}
