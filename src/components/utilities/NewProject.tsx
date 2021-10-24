import { ChangeEvent, useState } from "react";
import { addProjects, projects, setLoading } from "../../redux/noteSlice";
import { setNewProjectOpen, useAppDispatch, useAppSelector } from "../../redux/noteUtilsSlice";
import CustomSelect from "./CustomSelect";
import { UUIDGen } from "./UUIDGen";

export default function NewProject() {
    const [inputState, setInputState] = useState<string>('')
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string>('')
    const [colorCode, setColorCode] = useState<string>('')
    const { isLoading } = useAppSelector(state => state.notes)
    const handleSubmit = (code: string) => {
        setColorCode(code);
    }
    const handleAddProject = () => {
        dispatch(setLoading(true))
        if (!inputState) {
            dispatch(setLoading(false))
            return setError('please add a project name')
        } else {
            const payload = { id: UUIDGen(), name: inputState, color: colorCode }
            dispatch(addProjects(payload));
            dispatch(setNewProjectOpen(false));
            setInputState('');
        }
        dispatch(setLoading(false))
    }
    return (
        <div className="absolute bg-black  bg-opacity-25 p-2 top-0 flex justify-center items-center left-0 w-full h-screen">
            <div className="w-96 rounded h-120 bg-projDark py-2 relative">
                <div className="absolute h-10 rounded-t bg-projHeadDark px-3 py-2 top-0 left-0 w-full">
                    <p className="text-black dark:text-white">
                        Add Project
                    </p>
                </div>
                <div className="absolute w-full border-t border-gray-700 top-10 left-0 py-2 px-3">
                    {error && <p className="text-red-300">{error}</p>}
                    <div className="flex flex-col mt-2">
                        <label htmlFor="name" className="dark:text-gray-200 py-1">Name</label>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => setInputState(e.currentTarget.value)} value={inputState || ''} type="text" className="dark:bg-projHeadDark rounded py-1 outline-none ring-transparent focus:ring-blue-500 ring px-2 dark:text-gray-300" id="name" />
                    </div>
                    <div className="flex">
                        <CustomSelect handleSubmit={handleSubmit} />
                    </div>
                </div>
                <div className="absolute rounded-b border-t px-3 w-full border-gray-700 py-2 bottom-0 left-0">
                    <button disabled={!inputState || isLoading} onClick={handleAddProject} className={`float-right ${(!inputState || isLoading) ? 'cursor-not-allowed bg-red-300' : 'bg-btnClr'} text-white rounded w-14 py-1 ml-2`}>Add</button>
                    <button onClick={() => dispatch(setNewProjectOpen(false))} className="float-right text-white rounded bg-gray-700 py-1 w-20 ml-2">Cancel</button>
                </div>
            </div>
        </div >
    )
}
