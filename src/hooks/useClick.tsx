import { useEffect, useState } from 'react'

export default function useClick(adjustRef: any) {
    const [isInsideClick, setIsInsideClick] = useState<boolean>(true)
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    useEffect(() => {
        adjustRef.current?.addEventListener('contextmenu', (e: MouseEvent) => {
            setPosition({ x: e.pageX, y: e.pageY })
        })
        const handleClick = (e: any) => {
            if (adjustRef.current?.contains(e.target)) {
                setIsInsideClick(true);
            } else {

                setIsInsideClick(false);
            }
        }
        window.addEventListener('mousedown', handleClick)
    })
    const ret = {
        isInsideClick: isInsideClick as boolean, position: position as { x: number, y: number }
    }
    return ret
}
