import { useEffect, useRef } from "react"
import { deletePtojectFromFirebase, deleteTagFromFirebase } from "../../../api/addProjectApi"
import useClick from "../../../hooks/useClick"
import CopyToClipBoard from "../../../icons/CopyToClipBoard"
import Rename from "../../../icons/Rename"
import TrashIcon from "../../../icons/TrashIcon"
import { deleteProject, deleteTag } from "../../../redux/noteSlice"
import { setIsContextMenuOpen, setIsRenamePopUpOpen, useAppDispatch } from "../../../redux/noteUtilsSlice"

export default function ContextMenu(props: { x: number, y: number, id: string, type: string }) {
    const divRef = useRef<HTMLDivElement>(null)

    const { isInsideClick } = useClick(divRef)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isInsideClick) {
            dispatch(setIsContextMenuOpen(false))
            return
        }
    }, [isInsideClick, props, dispatch])

    const handleDeleteProject = () => {
        if (props.type === 'project') {
            dispatch(deleteProject(props.id));
            deletePtojectFromFirebase(props.id);
            dispatch(setIsContextMenuOpen(false))
        } else {
            dispatch(deleteTag(props.id));
            deleteTagFromFirebase(props.id);
            dispatch(setIsContextMenuOpen(false))
        }
    }
    return (
        <div ref={divRef} style={{ position: "absolute", left: `${props.x}px`, top: `${props.y}px` }} className={`bg-projHeadDark w-36 px-2 py-3 rounded flex flex-col items-start border-gray-700 border`}>
            <button
                className="hover:bg-selectDark my-1 flex items-center w-full rounded dark:text-gray-300 px-2 py-1"
                onClick={() => {
                    dispatch(setIsContextMenuOpen(false))
                    dispatch(setIsRenamePopUpOpen(true));
                }}>
                <Rename />
                <span className="text-sm px-2">Rename</span>
            </button>

            <button className="hover:bg-selectDark my-1 flex items-center w-full rounded dark:text-gray-300 px-2 py-1"
                onClick={() => {
                    navigator.clipboard.writeText(props.id)
                    dispatch(setIsContextMenuOpen(false))
                }}>
                <CopyToClipBoard />
                <span className="text-sm px-2">Copy</span>
            </button>
            <span className="bg-gray-500 w-full" style={{ height: "1px" }}></span>
            <button
                onClick={handleDeleteProject}
                className="hover:bg-selectDark my-1 flex items-center w-full rounded dark:text-gray-300 px-2 py-1">
                <TrashIcon />
                <span className="text-sm px-2">Delete</span>
            </button>
        </div>
    )
}
