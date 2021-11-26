import { useEffect } from "react";
import FetchCustomTask from "../utilities/noteutils/FetchCustomTask";
import ShowNotes from "../utilities/noteutils/ShowNotes";

export default function Today() {
    useEffect(() => {
        document.title = 'Today: Todoist'
    }, [])
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-6/12 mx-auto px-5 mt-5">
                <p className="text-lg dark:text-gray-200">Today</p>
            </div>
            <ShowNotes id="Today" />
            <FetchCustomTask pid={`Today`} />
        </div>
    )
}
