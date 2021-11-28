import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { setIsProfileSettingOpen, setUser, useAppDispatch, useAppSelector } from '../../../redux/noteUtilsSlice'
import useClick from '../../../hooks/useClick';
import Rename from '../../../icons/Rename';
import EyeIcon from '../../../icons/EyeIcon';
import EyeoffIcon from '../../../icons/EyeoffIcon';
import { useAuth } from '../../../contexts';
import { FirebaseError } from 'firebase/app';
import Loading from '../loader/Loading';

export default function UserProfile() {
    const { user } = useAppSelector(state => state.notesutils)
    const profileRef = useRef<HTMLDivElement>(null);
    const { isInsideClick } = useClick(profileRef)
    const { isProfileSettingsOpen } = useAppSelector(state => state.notesutils)
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState<string | null>(user.displayName)
    const [email, setEmail] = useState<string | null>(user.email)
    const [password, setPassword] = useState<string>('');
    const [cPassword, setCPassword] = useState<string>('')
    const [selectPhoto, setSelectPhoto] = useState<any | null>()
    const [temporaryPhoto, setTemporaryPhoto] = useState<string>()
    const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false)

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const { emailUpdate, displayNameUpdate, photoUrlUpdate, passwordUpdate } = useAuth();


    useEffect(() => {
        if (isProfileSettingsOpen) {
            if (!isInsideClick) {
                dispatch(setIsProfileSettingOpen(false))
            }
            return
        }
        return
    })
    useEffect(() => {
        if (selectPhoto) {
            console.log(selectPhoto[0]);
            const object = URL.createObjectURL(selectPhoto[0])
            setTemporaryPhoto(object)
            return () => URL.revokeObjectURL(object)
        } else {
            let test: string = user.photoURL as string
            setTemporaryPhoto(test);
        }
        return
    }, [selectPhoto, user.photoURL])


    const handleSubmit = () => {
        setLoading(true);
        setError('')
        setMessage('')
        if (email !== user.email) {
            emailUpdate(email as string).then(() => {
                dispatch(setUser({ ...user, email: email }))
                setMessage('email updated')
                setLoading(false)
            }).catch((err: FirebaseError) => {
                setError(err.message)

            })
        }
        if (username !== user.displayName) {
            setLoading(true)
            displayNameUpdate(username as string).then(() => {
                dispatch(setUser({ ...user, displayName: username }))
                setMessage('username updated')
                setLoading(false)
            }).catch((err: FirebaseError) => {
                setError(err.message)
            })
        }
        if (password) {
            setLoading(true)
            if (password !== cPassword) {
                setLoading(false);
                setError('password and confirm password must be same !')
            } else if (password.length < 6) {
                setLoading(false);
                setError('password length must be greater than 6 charecture!')
            } else {
                passwordUpdate(password).then(() => {
                    setMessage('password updated')
                    setLoading(false)
                }).catch((err: FirebaseError) => {
                    setLoading(false)
                    setError(err.message)
                })
            }
        }
        if (selectPhoto) {
            setLoading(true)
            photoUrlUpdate(selectPhoto[0]).then(() => {
                dispatch(setUser({ ...user, photoURL: temporaryPhoto }))
                setMessage('profile image updated')
                setLoading(false)
            }).catch((err: FirebaseError) => {
                setLoading(false)
                setError(err.message)
            })
        }
        else {
            setLoading(false)
            return
        }
    }

    return (
        <div className='absolute top-0 left-0 h-full w-full z-50 bg-gray-900 flex dark:text-gray-200 items-center justify-center bg-opacity-30'>
            <div ref={profileRef} className="xl:w-4/12 lg:w-6/12 md:w-7/12 sm:w-8/12 dark:bg-viewboxDark bg-white py-3 rounded px-5 relative">
                <h1 className='text-center dark:text-gray-200 text-gray-900 py-2'>Update Profile</h1>
                {error && <h1 className='text-center text-red-400 bg-red-100 rounded mt-2 mb-5 py-2'>{error}</h1>}
                {message && <h1 className='text-center text-green-400 bg-green-100 rounded mt-2 mb-5 py-2'>{message}</h1>}
                <div className="flex flex-col items-start">
                    <div className="flex w-full items-center">
                        <div className="flex group w-36 h-36 relative">
                            <div className="flex w-full h-full rounded-full items-center justify-center border-2 border-blue-500">
                                {
                                    (!temporaryPhoto) ?
                                        <p className='text-lg'>{user.displayName?.substring(0, 2)}</p>
                                        :
                                        <img src={temporaryPhoto} className='object-cover rounded-full w-full h-full' alt={user.displayName + 'profile_picture'} />
                                }
                            </div>
                            <label
                                htmlFor='photoUrl' style={{ height: "4.5rem" }}
                                className="absolute group-hover:opacity-100 opacity-0 cursor-pointer w-full bg-gray-700 dark:bg-opacity-100 bg-opacity-30 dark:bg-gray-800 rounded-b-full bottom-0 border-2 border-t-0 border-blue-500 left-0 outline-none">
                                <button className='w-full h-full flex items-center justify-center z-20 text-xl'>
                                    <Rename />
                                </button>
                                <input id='photoUrl' type="file" className='absolute z-50 top-0 w-full h-full cursor-pointer opacity-0'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectPhoto(e.currentTarget.files)} accept="image/*" />
                            </label>
                        </div>
                        <div className='mx-5'>
                            <p>Profile Photo</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full my-3">
                        <div className="flex flex-col">
                            <label htmlFor="username">Username</label>
                            <input value={username || ''}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                placeholder="your username" autoComplete="off" type="text" id="username"
                                className="dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-600 border dark:border-transparent dark:text-gray-300 border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="email">Email</label>
                            <input value={email || ''}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="your email address"
                                autoComplete="off" type="email" id="email"
                                className="dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-600 border dark:border-transparent dark:text-gray-300 border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                        </div>
                        <div className="flex flex-col relative mt-3">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                autoComplete="off" placeholder='you can leave this blank to keep the password same ! '
                                type={isEyeOpen ? "text" : "password"} id="password"
                                className="placeholder-gray-400 dark:placeholder-gray-600 dark:bg-gray-800 border dark:border-transparent dark:text-gray-300 border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                            <button onClick={() => setIsEyeOpen(!isEyeOpen)} className="absolute top-9 right-3" type="button">{isEyeOpen ? <EyeIcon /> : <EyeoffIcon />}</button>
                        </div>
                        <div className="flex flex-col relative mt-3">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input value={cPassword || ''} onChange={(e: ChangeEvent<HTMLInputElement>) => setCPassword(e.target.value)}
                                autoComplete="off" placeholder='you can leave this blank to keep the password same ! '
                                type={isEyeOpen ? "text" : "password"} id="confirm_password"
                                className="placeholder-gray-400 dark:placeholder-gray-600 dark:bg-gray-800 border dark:border-transparent dark:text-gray-300 border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                            <button onClick={() => setIsEyeOpen(!isEyeOpen)} className="absolute top-9 right-3" type="button">{isEyeOpen ? <EyeIcon /> : <EyeoffIcon />}</button>
                        </div>
                        <div className="flex mt-5 mb-3">
                            <button disabled={loading} onClick={() => dispatch(setIsProfileSettingOpen(false))} className='text-gray-100 bg-gray-600 mr-5 px-3 rounded py-1'>Cancel</button>
                            <button disabled={loading} onClick={handleSubmit} className={`${loading ? 'bg-red-200 cursor-not-allowed' : 'bg-btnClr'} px-3 rounded py-1 text-gray-200`}>{loading ? <Loading /> : 'Update'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
