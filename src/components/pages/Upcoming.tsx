import { useEffect } from "react";
import FetchCustomTask from "../utilities/noteutils/FetchCustomTask";
import ShowNotes from "../utilities/noteutils/ShowNotes";

export default function Upcoming() {
    useEffect(() => {
        document.title = 'Upcoming: Todoist'
    }, [])
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full mx-auto px-5 mt-5">
                <p className="text-lg dark:text-gray-200">Upcoming</p>
            </div>
            <ShowNotes id="Upcoming" />
            <FetchCustomTask pid={`Upcoming`} />
        </div>
    )
}
