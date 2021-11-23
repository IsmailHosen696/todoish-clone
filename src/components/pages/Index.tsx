import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../redux/noteUtilsSlice'
import ContextMenu from '../utilities/bars/ContextMenu'
import Navbar from '../utilities/bars/Navbar'
import Sidebar from '../utilities/bars/Sidebar'
import NewNotePopUp from '../utilities/noteutils/NewNotePopUp'
import RenameUtils from '../utilities/popups/RenameUtils'
import NewProject from '../utilities/projectutils/NewProject'
import NewTag from '../utilities/tagutils/NewTag'

export default function Index() {
    const { isAddNoteOpen, isNewTagOpen, isSidebarOpen, isNewProjectOpen, isContextMenuOpen, position, isRenamePopUpOpen } = useAppSelector(state => state.notesutils);

    return (
        <>
            <Navbar />
            <Sidebar />
            {isContextMenuOpen && <ContextMenu type={position.type} id={position.id} x={position.x} y={position.y} />}
            {isAddNoteOpen && <NewNotePopUp />}
            {isNewProjectOpen && <NewProject />}
            {isNewTagOpen && <NewTag />}
            {isRenamePopUpOpen && <RenameUtils type={position.type} id={position.id} />}
            <div className={`mt-12 ${isSidebarOpen ? 'ml-52' : "ml-10"} z-0 transition-all duration-200`}>
                <Outlet />
            </div>
        </>
    )
}
