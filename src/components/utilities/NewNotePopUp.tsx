import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { addData } from "../../api";
import TimeIcon from "../../icons/TimeIcon"
import { addNote, setLoading, useNoteAppDispatch, useNoteAppSelector } from "../../redux/noteSlice";
import { useAppDispatch, useAppSelector } from "../../redux/noteUtilsSlice";
import { setAddNotePopOpen } from "../../redux/noteUtilsSlice";
import { noteType } from "../../types";
import { UUIDGen } from './UUIDGen';

export default function NewNotePopUp() {
    const [headline, setNoteHeadline] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isImportant, setIsImportant] = useState<boolean>(false);
    const noteDispatch = useNoteAppDispatch();
    const dispatch = useAppDispatch();
    const divRef = useRef<HTMLDivElement>(null);
    const { isAddNoteOpen } = useAppSelector(state => state.notesutils);
    const { isLoading } = useNoteAppSelector(state => state.notes)
    useEffect(() => {
        const handlemouse = (e: any) => {
            if (isAddNoteOpen) {
                if (divRef.current?.contains(e.target)) {
                    return null;
                } else {
                    dispatch(setAddNotePopOpen(false));
                }
            }
        }
        window.addEventListener('mousedown', handlemouse);
        return () => {
            window.removeEventListener('mousedown', handlemouse);
        }
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        noteDispatch(setLoading(true));
        const note: noteType = { id: UUIDGen(), headline, description, isImportant, isCompleted: false, inTrash: false };
        await addData(note).then(() => {
            noteDispatch(setLoading(false));
        }).catch(err => {
            noteDispatch(setLoading(false));
            console.log(err);
        });
        noteDispatch(addNote(note));
        setNoteHeadline('');
        setDescription('');
        setIsImportant(false);
        noteDispatch(setLoading(false));
        dispatch(setAddNotePopOpen(false));
    }
    return (
        <div className="z-50 top-0 absolute left-0 w-screen h-screen bg-gray-800 bg-opacity-20 flex items-center justify-center">
            <div ref={divRef} className="flex flex-col rounded bg-white dark:bg-gray-800 border px-10 py-6 w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 relative">
                <button onClick={() => dispatch(setAddNotePopOpen(false))} className="absolute top-3 right-4 text-gray-600"><TimeIcon /></button>
                <form onSubmit={handleSubmit} className="flex flex-col w-full py-2">
                    <div className="flex w-full my-1">
                        <input value={headline}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNoteHeadline(e.currentTarget.value)}
                            type="text" className="px-2 rounded py-2 outline-none border w-full text-gray-500" placeholder="about" />
                    </div>
                    <div className="flex w-full my-1">
                        <textarea value={description}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
                            className="w-full outline-none resize-none border h-32 rounded text-gray-500 leading-5 py-2 px-2"
                            placeholder="description"></textarea>
                    </div>
                    <div className="flex my-1">
                        <label htmlFor="tags" className="text-gray-500">Add a tag</label>
                        <select className="border mx-2 border-gray-300 text-sm outline-none rounded cursor-pointer" onChange={(e) => e.currentTarget.value === 'important' ? setIsImportant(true) : setIsImportant(false)} id="tags">
                            <option value="default">select</option>
                            <option value="important" className="rounded-none px-1 ">important</option>
                        </select>
                    </div>
                    <button disabled={!headline || isLoading} className={`${(!headline || isLoading) ? "bg-red-200 cursor-not-allowed" : "cursor-pointer bg-btnClr"} text-sm w-20 rounded text-white px-1 py-2 my-2`}>Add note</button>
                </form>
            </div>
        </div>
    )
}
