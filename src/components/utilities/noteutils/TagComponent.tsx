import { useEffect, useState } from 'react'
import TagIcon from '../../../icons/TagIcon';
import { useAppSelector } from '../../../redux/noteUtilsSlice';

export default function TagComponent(props: { setTag: Function }) {

    const { tags } = useAppSelector(state => state.notes)
    const [tag, setTag] = useState<{ id: string }[]>([]);

    useEffect(() => {
        props.setTag(tag)
        return () => props.setTag([])
    }, [tag, props])

    const handleSelect = (id: string) => {
        if (tag.find(tg => tg.id === id)) {
            return setTag(tag.filter(tg => tg.id !== id))
        } else {
            setTag([...tag, { id }])
        }
    }
    return (
        <>
            <div className="flex dark:text-gray-200 proj items-start justify-center flex-col px-2 py-1">
                <div className="flex flex-wrap w-full truncate mt-2">
                    {
                        tags.map((tg) =>
                            <div className="flex border border-gray-200 dark:border-gray-700 py-1 my-1 mr-2 cursor-pointer px-2 items-center rounded" key={tg.id}>
                                <label onClick={() => handleSelect(tg.id)} htmlFor={tg.id} className={`flex cursor-pointer items-center`}>
                                    <TagIcon color={`${tg.color} w-5 h-5`} />
                                    <span className={`text-sm pl-1 w-16 truncate dark:text-gray-200 text-gray-700`}>{tg.name}</span>
                                </label>
                                <input id={tg.id} type="checkbox" className='border hue-rotate-180 border-gray-400 rounded-none ml-2 cursor-pointer' />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
