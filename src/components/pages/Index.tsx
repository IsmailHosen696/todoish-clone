import { FirebaseError } from 'firebase/app'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAllNotesFromFirebase } from '../../api/addnoteApi'
import { getProjectsFromFirebase, getTagFromFirebase } from '../../api/addProjectApi'
import { auth } from '../../firebase/firebase'
import { getAllNotes, getALlProject, getAllTag } from '../../redux/noteSlice'
import { setUser, useAppDispatch, useAppSelector } from '../../redux/noteUtilsSlice'
import ContextMenu from '../utilities/bars/ContextMenu'
import Navbar from '../utilities/bars/Navbar'
import Sidebar from '../utilities/bars/Sidebar'
import NewNotePopUp from '../utilities/noteutils/NewNotePopUp'
import RenameUtils from '../utilities/popups/RenameUtils'
import SettingMenu from '../utilities/popups/SettingMenu'
import ThemePopup from '../utilities/popups/ThemePopup'
import NewProject from '../utilities/projectutils/NewProject'
import NewTag from '../utilities/tagutils/NewTag'
import UserProfile from '../utilities/popups/UserProfile'

export default function Index() {
    const { isAddNoteOpen,
        isNewTagOpen,
        isSidebarOpen,
        isProfileSettingsOpen,
        isNewProjectOpen,
        isThemePopUpOpen,
        isSettingMenuOpen,
        isContextMenuOpen,
        position,
        isRenamePopUpOpen,
        user } = useAppSelector(state => state.notesutils);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    // getting users
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    alert('please verify your email to continue ! check your email for further instruction')
                    navigate('/signin')
                } else {
                    dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }))
                }
            } else {
                navigate('/signin')
            }
        })
    }, [dispatch, navigate, user.uid])
    // getting notes, project and tags
    useEffect(() => {
        getAllNotesFromFirebase(user.uid).then(data => {
            dispatch(getAllNotes(data))
        }).catch((err: FirebaseError) => {
            console.log(err.message)
        })
        getProjectsFromFirebase(user.uid).then(data => {
            dispatch(getALlProject(data));
        }).catch((err) => {
            console.log(err);
        })
        getTagFromFirebase(user.uid).then(data => {
            dispatch(getAllTag(data));
        }).catch((err) => {
            console.log(err);
        })
    }, [dispatch, user.uid]);
    return (
        <>
            <Navbar />
            <Sidebar />
            {isSettingMenuOpen && <SettingMenu />}
            {isContextMenuOpen && <ContextMenu type={position.type} id={position.id} x={position.x} y={position.y} />}
            {isAddNoteOpen && <NewNotePopUp />}
            {isNewProjectOpen && <NewProject />}
            {isNewTagOpen && <NewTag />}
            {isRenamePopUpOpen && <RenameUtils type={position.type} id={position.id} />}
            {isThemePopUpOpen && <ThemePopup />}
            {isProfileSettingsOpen && <UserProfile />}
            <div className={`mt-12 ${isSidebarOpen ? 'ml-52' : "ml-10"} z-0 transition-all duration-200`}>
                <Outlet />
            </div>
        </>
    )
}
