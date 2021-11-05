import { useEffect, useState } from "react";

export default function CustomSelect(props: { handleSubmit: Function, name: string }) {
    const [isColorsOpen, setIsColorsOpen] = useState<boolean>(false);
    const [color, setColor] = useState({ color: 'Light Gray', code: 'bg-gray-500' });
    useEffect(() => {
        props.handleSubmit(color.code);
    }, [color, props])
    return (
        <div className='w-full relative py-2'>
            <div className="flex w-full flex-col">
                <label htmlFor="selectcolor" className='dark:text-gray-300'>{props.name}</label>
                <div id="selectcolor" onClick={() => setIsColorsOpen(!isColorsOpen)} className='py-1 w-full cursor-pointer px-2 dark:text-gray-200 outline-none rounded ring-transparent ring focus:ring-blue-500 dark:bg-viewboxDark border border-gray-300 dark:border-transparent' >
                    <button className={`w-3 h-3 rounded-full ${color.code}`}></button>
                    <span className="dark:text-gray-300 px-3">{color.color}</span>
                </div>
            </div>
            {
                isColorsOpen &&
                <div className="flex absolute top-14 flex-col overflow-y-auto py-1 h-36 dark:bg-projHeadDark w-full">
                    <div onClick={() => { setColor({ color: 'Fuchsia', code: 'bg-fuchsia-500' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-fuchsia-500' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-fuchsia-500"></button>
                        <span className="dark:text-gray-300 px-3">Fuchsia</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Dark Fuchsia', code: 'bg-fuchsia-700' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-fuchsia-700' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-fuchsia-700"></button>
                        <span className="dark:text-gray-300 px-3">Dark Fuchsia</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Purple', code: 'bg-purple-500' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-purple-500' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-purple-500"></button>
                        <span className="dark:text-gray-300 px-3">Purple</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Dark Purple', code: 'bg-purple-700' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-purple-700' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-purple-700"></button>
                        <span className="dark:text-gray-300 px-3">Dark Purple</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Green', code: 'bg-green-500' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-green-500' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-green-500"></button>
                        <span className="dark:text-gray-300 px-3">Green</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Light Green', code: 'bg-green-300' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-green-300' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-green-300"></button>
                        <span className="dark:text-gray-300 px-3">Light Green</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Dark Green', code: 'bg-green-700' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-green-700' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-green-700"></button>
                        <span className="dark:text-gray-300 px-3">Dark Green</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Light Gray', code: 'bg-gray-500' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-gray-500' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-gray-500"></button>
                        <span className="dark:text-gray-300 px-3">Light Gray</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Gray', code: 'bg-gray-700' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-gray-700' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-gray-700"></button>
                        <span className="dark:text-gray-300 px-3">Gray</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Rose', code: 'bg-rose-500' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-rose-500' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-rose-500"></button>
                        <span className="dark:text-gray-300 px-3">Rose</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Red', code: 'bg-red-500' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-red-500' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-red-500"></button>
                        <span className="dark:text-gray-300 px-3">Red</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Light Blue', code: 'bg-blue-300' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-blue-300' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-blue-300"></button>
                        <span className="dark:text-gray-300 px-3">Light Blue</span>
                    </div>
                    <div onClick={() => { setColor({ color: 'Blue', code: 'bg-blue-500' }); setIsColorsOpen(false) }} className={`flex items-center cursor-pointer w-full px-2 py-1 ${color.code === 'bg-blue-600' && 'bg-selectWhite dark:bg-selectDark'} dark:hover:bg-selectDark`}>
                        <button className="w-3 h-3 rounded-full bg-blue-500"></button>
                        <span className="dark:text-gray-300 px-3">Blue</span>
                    </div>
                </div>
            }
        </div>
    )
}
