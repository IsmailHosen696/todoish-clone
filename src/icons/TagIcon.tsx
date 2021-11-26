import { useEffect, useState } from "react";

export default function TagIcon(props: { color: string }) {
    const [setColor, setSetColor] = useState<string>('')
    useEffect(() => {
        if (props.color) {
            let newColor = props.color.split('-');
            newColor[0] = 'text'
            setSetColor(newColor.join('-'));
        } else {
            return
        }
    }, [setColor, props.color])
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${setColor} w-5 transform rotate-90 h-5`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
    )
}
