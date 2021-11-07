import { useState } from 'react'
import { tagType } from '../../../types'

export default function TagComponent(props: { tags: tagType[], setTag: Function }) {
    const [tagName, setTagName] = useState<string>('no tag selectd')
    const [tagColor, setTagColor] = useState<string>('bg-gray-700')
    const [isTagOpen, setIsTagOpen] = useState<boolean>(false)

    return (
        <>
            <div className="flex flex-col mt-3">
                <div className="flex w-full flex-col">
                    <label htmlFor="selectcolor" className='dark:text-gray-300'>Add a tag</label>
                    <div id="selectcolor" onClick={() => setIsTagOpen(!isTagOpen)} className='py-1 w-full cursor-pointer px-2 dark:text-gray-200 outline-none rounded ring-transparent ring focus:ring-blue-500 dark:bg-viewboxDark border border-gray-300 dark:border-transparent' >
                        <button className={`w-3 h-3 rounded-full ${tagColor}`}></button>
                        <span className="dark:text-gray-300 px-3">{tagName}</span>
                    </div>
                </div>
                {
                    isTagOpen &&
                    <div className="flex flex-col overflow-y-auto py-1 dark:bg-projWhite mt-1 h-28 proj w-full">
                        {
                            props.tags.map((tag) =>
                                <div onClick={() => { props.setTag(tag.name, tag.color); setTagName(tag.name); setTagColor(tag.color); setIsTagOpen(false) }} key={tag.id} className={`flex items-center my-1 rounded hover:bg-gray-800 cursor-pointer w-full px-2 py-1`}>
                                    <button className={`w-3 h-3 rounded-full ${tag.color}`}></button>
                                    <span className="dark:text-gray-300 px-3">{tag.name}</span>
                                </div>
                            )
                        }
                    </div>
                }
            </div>

        </>
    )
}
