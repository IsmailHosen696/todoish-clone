import { NavLink } from 'react-router-dom'
import { setContextPosition, setIsContextMenuOpen, useAppDispatch, useAppSelector } from '../../../redux/noteUtilsSlice';

export default function NavLink2({ type, id, name, color }: { color: string; name: string | undefined; id: string; type: string }) {
    const dispatch = useAppDispatch();
    const { notes } = useAppSelector(state => state.notes);

    return (
        <NavLink
            onContextMenu={(e) => {
                e.preventDefault()
                dispatch(setIsContextMenuOpen(true))
                dispatch(setContextPosition({ x: e.clientX, y: e.clientY, id, type: 'project' }))
            }}
            to={`/p/${id}`}
            title={`${name}`}
            key={id} id={id}
            className={(pos) => `w-full px-2 h-9 ${pos.isActive ? 'activeSidebarLink' : ''} group rounded flex justify-between items-center dark:hover:bg-selectDark hover:bg-selectWhite`}>
            <div className="flex w-full items-center">
                <button className={`flex w-3 h-3 ${color} px-1 rounded-full`}></button>
                <div className="flex justify-between items-center w-full">
                    <span style={{ maxWidth: "11rem" }} className="truncate dark:text-gray-300 px-3">
                        {name}
                    </span>
                    <span className="dark:text-gray-400 font-light text-xs">
                        {notes.filter(note => note.parentid === id).length}
                    </span>
                </div>
            </div>
        </NavLink>
    )
}
