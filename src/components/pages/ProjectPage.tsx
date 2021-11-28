import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/noteUtilsSlice";
import FetchCustomTask from "../utilities/noteutils/FetchCustomTask";

import ShowNotes from "../utilities/noteutils/ShowNotes";

export default function ProjectPage() {
    const params = useParams();
    const prj = useAppSelector(state => state.notes.projects)
    const [prjName, setPrjName] = useState<string | undefined>('')
    useEffect(() => {
        if (prj.length) {
            prj.map(proj => {
                if (proj.id === params.pid) {
                    return setPrjName(proj.name);
                }
                return () => setPrjName('')
            })
        }
        return
    }, [prj, params.pid])
    useEffect(() => {
        document.title = `${prjName} : Todoist`;
    }, [prjName])
    return (
        <div className="flex w-full flex-col">
            <div className="w-full mx-auto px-5 mt-5">
                <p className="text-lg dark:text-gray-200">{prjName}</p>
            </div>
            <ShowNotes id={`${params.pid}`} />
            <FetchCustomTask pid={`${params.pid}`} />
        </div>
    )
}
