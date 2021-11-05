import { useEffect, useState } from "react"

export default function ProjectPage() {
    const [pId, setPId] = useState<string>('')
    useEffect(() => {
        const linkArray: string[] = window.location.pathname.split('/');
        setPId(linkArray[linkArray.length - 1]);
    }, []);
    return (
        <div>

        </div>
    )
}
