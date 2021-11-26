import { useEffect } from "react";
import FetchCustomTask from "../utilities/noteutils/FetchCustomTask";
import ShowNotes from "../utilities/noteutils/ShowNotes";

export default function Inbox() {
    useEffect(() => {
        document.title = 'Inbox: Todoist'
    }, [])
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-6/12 mx-auto px-5 mt-5">
                <p className="text-lg dark:text-gray-200">Inbox</p>
            </div>
            <ShowNotes id="Inbox" />
            <FetchCustomTask pid={`Inbox`} />
        </div>
    )
}
