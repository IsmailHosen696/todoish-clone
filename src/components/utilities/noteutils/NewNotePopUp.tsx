import { ChangeEvent, useEffect, useRef, useState } from "react";
import useClick from "../../../hooks/useClick";
import { addNote } from "../../../redux/noteSlice";
import { setAddNotePopOpen, useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice";
import { noteType } from "../../../types";
import { UUIDGen } from "../UUIDGen";
import DirSelect from "./DirSelect";
import TagComponent from "./TagComponent";

export default function NewNotePopUp() {

    const dispatch = useAppDispatch()
    const { isAddNoteOpen } = useAppSelector(state => state.notesutils);
    const { projects, tags } = useAppSelector(state => state.notes)

    const divRef = useRef<HTMLDivElement>(null);

    const { isInsideClick } = useClick(divRef);

    const [projectObj, setProjectObj] = useState({ pId: "Today", projcolor: "bg-blue-400" })
    const [tagObj, setTagObj] = useState<[]>([])
    const [note, setNote] = useState({ about: '', description: "" })

    const setTag = (tagid: []) => setTagObj(tagid)
    const setProj = (name: string, color: string) => setProjectObj({ pId: name, projcolor: color })

    useEffect(() => {
        if (isAddNoteOpen) {
            if (!isInsideClick) {
                dispatch(setAddNotePopOpen(false))
            }
            return
        }
        return
    }, [isAddNoteOpen, isInsideClick, dispatch]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log([tagObj, projectObj, note])
        let payload: noteType = {
            parentid: projectObj.pId,
            id: UUIDGen(),
            // uuid?: string | undefined;
            description: note.description,
            about: note.about,
            tags: tagObj,
            isCompleted: false
        }
        dispatch(addNote(payload))
    }
    return (
        <div className="absolute flex justify-center items-center top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-20">
            <div ref={divRef} className="relative bg-gray-900 py-2 px-5 rounded">
                <div className="w-96 dark:text-gray-300">
                    <p className="pt-2 text-center">Add note</p>
                    <form onSubmit={handleSubmit} className="my-2 flex flex-col">
                        <div className="flex flex-col my-2">
                            <label className="my-1" htmlFor="about ">about note</label>
                            <input value={note.about} onChange={(e: ChangeEvent<HTMLInputElement>) => setNote({ ...note, about: e.target.value })} type="text" id="about" autoComplete="off" className="dark:bg-gray-800 rounded h-10 px-2 py-1 outline-none focus:ring focus:ring-blue-500" />
                        </div>
                        <div className="flex flex-col my-2">
                            <label className="my-1" htmlFor="notedesc">description</label>
                            <textarea value={note.description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNote({ ...note, description: e.target.value })} id="notedesc" className="dark:bg-gray-800 h-20 rounded px-2 py-1 outline-none focus:ring focus:ring-blue-500 resize-none"></textarea>
                        </div>
                        {
                            <DirSelect setProj={setProj} projects={projects} />
                        }
                        {
                            tags.length > 0 &&
                            <TagComponent setTag={setTag} tags={tags} />
                        }
                    </form>
                </div>
                <div className="flex float-right my-3">
                    <button onClick={() => dispatch(setAddNotePopOpen(!isAddNoteOpen))} className="px-2 py-1 rounded bg-gray-600 text-gray-300">Cancel</button>
                    <button onClick={handleSubmit} className="px-3 py-1 rounded mx-2 bg-btnClr text-gray-300">Add</button>
                </div>
            </div>
        </div >
    )
}
