import { useParams } from "react-router-dom"

import ShowNotes from "../utilities/noteutils/ShowNotes";

export default function ProjectPage() {
    const params = useParams();
    return (
        <div>
            <ShowNotes id={`${params.pid}`} />
        </div>
    )
}
