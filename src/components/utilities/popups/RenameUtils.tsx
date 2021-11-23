import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { updateProjectNameIntoFirebase, updateTagNameIntoFirebase } from '../../../api/addProjectApi'
import useClick from '../../../hooks/useClick'
import TimeIcon from '../../../icons/TimeIcon'
import { updateProject, updateTag } from '../../../redux/noteSlice'
import { setIsRenamePopUpOpen, useAppDispatch, useAppSelector } from '../../../redux/noteUtilsSlice'

function RenameUtils(props: { id: string, type: string }) {
    const rnmDivRef = useRef<HTMLDivElement>(null)

    const toRename = useAppSelector(state => {
        if (props.type === 'project') {
            return state.notes.projects.filter(note => note.id === props.id)[0]
        }
        else {
            return state.notes.tags.filter(tag => tag.id === props.id)[0]
        }
    })

    const [newProjectText, setNewProjectText] = useState<string | undefined>(toRename?.name)

    const { isInsideClick } = useClick(rnmDivRef)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!isInsideClick) {
            dispatch(setIsRenamePopUpOpen(false));
            return
        }
    }, [isInsideClick, dispatch])
    const updateProjectName = () => {
        if (props.type === 'project') {
            dispatch(updateProject({ id: props.id, name: newProjectText }));
            updateProjectNameIntoFirebase(props.id, newProjectText);
            dispatch(setIsRenamePopUpOpen(false));
        } else {
            dispatch(updateTag({ id: props.id, name: newProjectText }));
            updateTagNameIntoFirebase(props.id, newProjectText);
            dispatch(setIsRenamePopUpOpen(false));
        }
    }
    return (
        <div className='w-screen z-40 justify-center items-center flex absolute h-screen top-0 left-0 dark:bg-opacity-50 bg-black bg-opacity-10'>
            <div ref={rnmDivRef} className="w-3/12 relative bg-gray-900 py-10 px-4 rounded flex flex-col">
                <button onClick={() => dispatch(setIsRenamePopUpOpen(false))} className='absolute top-2 right-2 text-gray-400'><TimeIcon /></button>
                <input type="text" className='rounded h-10 ring-4 ring-gray-900 bg-projDark text-gray-300 focus:ring-blue-500 outline-none px-1 mt-3' onChange={(e: ChangeEvent<HTMLInputElement>) => setNewProjectText(e.target.value)} value={newProjectText} />
                <button onClick={() => updateProjectName()} className='h-10 mt-5 mb-2 text-gray-300 hover:bg-blue-600 w-full bg-blue-500 rounded'>Rename</button>
            </div>
        </div>
    )
}

export default RenameUtils
