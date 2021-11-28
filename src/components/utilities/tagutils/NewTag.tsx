import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FirebaseError } from "firebase/app/dist/app";
import { addTagToFirebase } from "../../../api/addProjectApi";
import { addTag } from "../../../redux/noteSlice";
import { setErrorState, setErrorString, setLoading, setNewTagOpen, useAppDispatch, useAppSelector } from "../../../redux/noteUtilsSlice";
import CustomSelect from "../popups/CustomSelect";
import { UUIDGen } from "../UUIDGen";
import { tagType } from "../../../types";
import useClick from "../../../hooks/useClick";

export default function NewTag() {
    const dispatch = useAppDispatch();

    const [inputState, setInputState] = useState<string>('');
    const [colorCode, setColorCode] = useState<string>('');

    const { isLoading, isNewTagOpen, user } = useAppSelector(state => state.notesutils);

    const inpRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);

    const { isInsideClick } = useClick(tagRef);

    const handleSubmit = (code: string) => setColorCode(code);

    useEffect(() => {
        if (isNewTagOpen) {
            if (!isInsideClick) {
                dispatch(setNewTagOpen(false))
            }
        }
    }, [isNewTagOpen, dispatch, isInsideClick])

    useEffect(() => {
        inpRef.current?.focus();
    }, []);

    const handleAddProject = async () => {
        dispatch(setLoading(true))
        dispatch(setErrorState(false))
        dispatch(setErrorString(''))
        // object for set project
        const payload: tagType = {
            id: UUIDGen(),
            uid: user.uid,
            name: inputState,
            color: colorCode
        };
        // adding project name and color to redux state
        dispatch(addTag(payload));
        // changing loading state
        dispatch(setNewTagOpen(false));
        // adding project to firebase
        dispatch(setLoading(false))
        await addTagToFirebase(payload).then(() => {
            dispatch(setErrorState(false))
            dispatch(setErrorString(''))
            setInputState('');
        }).catch((err: FirebaseError) => {
            dispatch(setLoading(false));
            dispatch(setErrorState(true))
            dispatch(setErrorString(err.message));
            console.log(err);
        });
    }
    return (
        <div className="absolute z-40 bg-black bg-opacity-25 p-2 top-0 flex justify-center items-center left-0 w-full h-screen">
            <div ref={tagRef} className="sm:w-96 w-full rounded h-120 dark:bg-projDark bg-white py-2 relative">
                <div className="absolute h-10 rounded-t dark:bg-projHeadDark px-3 py-2 top-0 left-0 w-full">
                    <p className="text-black dark:text-white">
                        Add Tag
                    </p>
                </div>
                <div className="absolute w-full border-t dark:border-gray-700 top-10 left-0 py-2 px-3">
                    <div className="flex flex-col mt-2">
                        <label htmlFor="name" className="dark:text-gray-200 py-1">Name</label>
                        <input
                            ref={inpRef}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputState(e.currentTarget.value)} value={inputState || ''}
                            type="text"
                            className="dark:bg-projHeadDark rounded dark:border-transparent focus:border-transparent border-gray-300 border py-1 outline-none ring-transparent focus:ring-blue-500 ring px-2 dark:text-gray-300" id="name" />
                    </div>
                    <div className="flex">
                        <CustomSelect name="Color" handleSubmit={handleSubmit} />
                    </div>
                </div>
                <div className="absolute rounded-b border-t px-3 w-full dark:border-gray-700 py-2 bottom-0 left-0">
                    <button disabled={!inputState || isLoading} onClick={handleAddProject} className={`float-right ${(!inputState || isLoading) ? 'cursor-not-allowed bg-red-300' : 'bg-btnClr'} text-white rounded w-14 py-1 ml-2`}>Add</button>
                    <button onClick={() => dispatch(setNewTagOpen(false))} className="float-right text-white rounded bg-gray-700 py-1 w-20 ml-2">Cancel</button>
                </div>
            </div>
        </div >
    )
}
