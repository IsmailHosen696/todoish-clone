import { useEffect, useState } from "react";
import TagIcon from "../../../icons/TagIcon";
import { useAppSelector } from "../../../redux/noteUtilsSlice";

export default function EditNoteTag(props: { tags?: { id: string }[], getSelectedTags: Function }) {
    const alltags = useAppSelector(state => state.notes.tags)
    const [selectedTagId, setSelectedTagId] = useState<{ id: string }[]>([])

    useEffect(() => {
        alltags.forEach(tag => {
            if (props.tags?.find(tg => tg.id === tag.id)) {
                setSelectedTagId((prevTag) => [...prevTag, { id: tag.id }]);
            }
            return null
        })
        return () => setSelectedTagId([])
    }, [alltags, props.tags])

    const handleSelect = (id: string) => {
        if (selectedTagId.find(tg => tg.id === id)) {
            props.getSelectedTags(selectedTagId.filter(tg => tg.id !== id))
            return setSelectedTagId(selectedTagId.filter(tg => tg.id !== id))
        } else {
            setSelectedTagId((prevTag) => [...prevTag, { id }]);
            setTimeout(() => {
                props.getSelectedTags([...selectedTagId, { id }])
            }, 200)
        }
    }
    return (
        <div className="flex dark:text-gray-200 proj items-start justify-center flex-col px-2 py-1">
            <div className="flex flex-wrap w-full truncate mt-2">
                {
                    alltags?.map((tg) =>
                        <div className="flex border border-gray-200 dark:border-gray-700 py-1 my-1 mr-2 cursor-pointer px-2 items-center rounded" key={tg.id}>
                            <label onClick={() => handleSelect(tg.id)} htmlFor={tg.id} className={`flex cursor-pointer items-center`}>
                                <TagIcon color={`${tg.color} w-5 h-5`} />
                                <span className={`text-sm pl-1 w-16 truncate dark:text-gray-200 text-gray-700`}>{tg.name}</span>
                            </label>
                            <input readOnly checked={selectedTagId.find(ta => ta.id === tg.id) ? true : false} id={tg.id} type="checkbox" className='border hue-rotate-180 border-gray-400 rounded-none ml-2 cursor-pointer' />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
