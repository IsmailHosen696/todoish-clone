import GreaterthanIcon from '../../../icons/GreaterthanIcon';
import PlusIcon from '../../../icons/PlusIcon';

export default function LablePrjojects({
    toggleButton,
    isOpen,
    name,
    newMenuOpen,
    setOpen,
    setIsOpen
}: {
    toggleButton: Function;
    setIsOpen: Function;
    isOpen: boolean;
    name: string;
    setOpen: Function;
    newMenuOpen: boolean
}) {

    return (
        <div className="flex justify-between my-1 pl-2 pr-1 group w-full py-1 items-center rounded">
            <button onClick={() => toggleButton()}
                className="flex flex-1 items-center">
                <span className={`dark:text-gray-500 text-gray-500 ${isOpen && 'transform rotate-90'}`}>
                    <GreaterthanIcon />
                </span>
                <span className="px-3 font-medium text-sm dark:text-gray-300">{name}</span>
            </button>
            <button onClick={() => {
                setIsOpen();
                setOpen()
            }}
                className="opacity-0 w-6 h-6 rounded dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center hover:text-gray-600 text-gray-500 dark:text-gray-300 text-sm group-hover:opacity-100">
                <PlusIcon />
            </button>
        </div>
    )
}
