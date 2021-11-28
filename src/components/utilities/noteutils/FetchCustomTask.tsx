import React, { useState } from 'react'
import PlusIcon from '../../../icons/PlusIcon'
import AddTask from './AddTask'

export default function FetchCustomTask(props: { pid: string }) {
    const [isTaskOpen, setIsTaskOpen] = useState<boolean>(false)

    return (
        <div className="flex px-5 w-full mx-auto flex-col">
            <div className="my-1 w-full">
                {
                    !isTaskOpen &&
                    <button onClick={() => setIsTaskOpen(!isTaskOpen)}
                        className="rounded w-full dark:text-gray-200 flex text-sm items-center hover:text-red-400 group">
                        <span className="text-sm transition-all duration-100 mr-2 group-hover:bg-red-500 group-hover:text-gray-100 rounded-full w-5 h-5">
                            <PlusIcon />
                        </span>
                        <span className="font-light">
                            Add Task
                        </span>
                    </button>
                }
            </div>
            {
                isTaskOpen && (
                    <AddTask setIsTaskOpen={() => setIsTaskOpen(false)} pid={`${props.pid}`} />
                )
            }
        </div>
    )
}
