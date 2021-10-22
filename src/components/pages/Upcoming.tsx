import { useAppSelector } from "../../redux/noteUtilsSlice";

export default function Upcoming() {
    const isSidebarOpen = useAppSelector(state => state.notesutils.isSidebarOpen);

    return (
        <div className="overflow-hidden w-full h-full">
            <div className="mt-12 flex w-full">
                <div className={`${isSidebarOpen ? "ml-56" : "ml-10"} transition-all duration-200 pt-2 overflow-hidden flex-wrap flex`}>
                    <p className="text-gray-700 dark:text-gray-300">Coming</p>
                </div>
            </div>
        </div>
    )
}
