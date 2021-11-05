import { useEffect, useState } from 'react'

export default function useClick(adjustRef: any) {
    const [isInsideClick, setIsInsideClick] = useState<boolean>(true)

    useEffect(() => {
        const handleClick = (e: any) => {
            if (adjustRef.current?.contains(e.target)) {
                setIsInsideClick(true);
            } else {

                setIsInsideClick(false);
            }
        }
        window.addEventListener('mousedown', handleClick)
    })
    return isInsideClick as boolean;
}
