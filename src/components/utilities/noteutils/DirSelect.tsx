import { useState } from 'react'
import { projectType } from '../../../types';

export default function DirSelect(props: { projects: projectType[], setProj: Function }) {
    const [isColorOpen, setIsColorOpen] = useState<boolean>(false)
    const [dirName, setDirName] = useState<string>('Today');
    const [color, setColor] = useState<string>('bg-blue-400');

    return (
        <div className="flex flex-col">
            <div className="flex w-full flex-col">
                <label htmlFor="selectcolor" className='dark:text-gray-300'>Add this to </label>
                <div id="selectcolor" onClick={() => setIsColorOpen(!isColorOpen)} className='py-1 w-full cursor-pointer px-2 dark:text-gray-200 outline-none rounded ring-transparent ring focus:ring-blue-500 dark:bg-viewboxDark border border-gray-300 dark:border-transparent' >
                    <button className={`w-3 h-3 rounded-full ${color}`}></button>
                    <span className="dark:text-gray-300 px-3">{dirName}</span>
                </div>
            </div>
            {
                isColorOpen &&
                <div className="flex flex-col overflow-y-auto py-1 dark:bg-projWhite mt-1 h-28 proj w-full">
                    <>
                        <div onClick={() => { props.setProj('Today', 'bg-blue-400'); setColor('bg-blue-400'); setIsColorOpen(false); setDirName('Today') }} className={`flex items-center my-1 rounded hover:bg-gray-800 cursor-pointer w-full px-2 py-1`}>
                            <button className={`w-3 h-3 rounded-full bg-blue-400`}></button>
                            <span className="dark:text-gray-300 px-3">Today</span>
                        </div>
                        <div onClick={() => { setColor('bg-purple-500'); props.setProj('Upcoming', 'bg-purple-500'); setIsColorOpen(false); setDirName('Upcoming') }} className={`flex items-center my-1 rounded hover:bg-gray-800 cursor-pointer w-full px-2 py-1`}>
                            <button className={`w-3 h-3 rounded-full bg-purple-500`}></button>
                            <span className="dark:text-gray-300 px-3">Upcoming</span>
                        </div>
                    </>
                    {
                        props.projects.map((project) =>
                            <div onClick={() => { setDirName(project.name); props.setProj(project.name, project.color); setColor(project.color); setIsColorOpen(false) }} key={project.id} className={`flex items-center my-1 rounded hover:bg-gray-800 cursor-pointer w-full px-2 py-1`}>
                                <button className={`w-3 h-3 rounded-full ${project.color}`}></button>
                                <span className="dark:text-gray-300 px-3">{project.name}</span>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}
