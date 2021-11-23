import { useEffect, useState } from 'react'
import { tagType } from '../../../types'

export default function TagComponent(props: { tags: tagType[], setTag: Function }) {
    const [tags, setTags] = useState<{ id: string }[]>([]);
    useEffect(() => {
        props.setTag(tags)
    }, [tags, props])
    const handleSelect = (id: string) => {
        if (tags.find(elem => elem.id === id)) {
            setTags(tags.filter(tag => tag.id !== id))
        } else {
            setTags([...tags, { id }])
        }
    }
    return (
        <div className="flex flex-col mt-2">
            <p>Add tags</p>
            <div className="flex flex-wrap mt-1">
                {
                    props.tags.map((tag) =>
                        <div onClick={() => handleSelect(tag.id)} className={`flex items-center mr-2 cursor-pointer`} key={tag.id}>
                            <button type='button' className={`${tag.color} w-4 h-4 rounded-full mr-1 ${tags.find(elem => elem.id === tag.id) ? "ring-2 ring-white" : ""}`}></button>
                            <span>{tag.name}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
