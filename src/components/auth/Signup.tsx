import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, updateProfile } from 'firebase/auth'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase/firebase'
import EyeIcon from '../../icons/EyeIcon'
import EyeoffIcon from '../../icons/EyeoffIcon'
import TimeIcon from '../../icons/TimeIcon'
import { setUser, useAppDispatch } from '../../redux/noteUtilsSlice'
import { usertype } from '../../types'
import Loading from '../utilities/loader/Loading'

export default function Signup() {
    useEffect(() => {
        document.title = 'Signup: Todoist'
    })
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [cpassword, setCPassword] = useState<string>('')
    const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [message, setMessage] = useState<string>('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('')
        setMessage('')
        setLoading(true)
        if (!email || !password || !username || !cpassword) {
            setLoading(false)
            return setError('please fill all the fields carefully')
        }
        if (password.length < 6) {
            setLoading(false)
            return setError('password length must be greater than 6 charecter')
        }
        if (password !== cpassword) {
            setLoading(false)
            return setError('password and confirm password are not matching');
        } else {
            try {
                createUserWithEmailAndPassword(auth, email, password).then((user) => {
                    updateProfile(user.user, { displayName: username }).then((nuser) => {
                        if (!user.user.emailVerified) {
                            sendEmailVerification(user.user).then(() => {
                                setMessage('a verification mail has been sent! check thar for further information')
                                setLoading(false)
                            }).catch((err: FirebaseError) => {
                                setError(err.message)
                                setLoading(false)
                            })
                        } else {
                            dispatch(setUser({ uid: user.user.uid, email: user.user.email, displayName: user.user.displayName, photoURL: user.user.photoURL }))
                            navigate('/')
                            setLoading(false)
                        }
                    }).catch((err: FirebaseError) => {
                        setError(err.message)
                        setLoading(false)
                    })
                }).catch((err: FirebaseError) => {
                    setError(err.message)
                    setLoading(false)
                })
            } catch (err) {
                setLoading(false)
            }
        }
    }
    const handleGoogleSignin = async () => {
        setLoading(true)
        await signInWithPopup(auth, provider)
            .then((result) => {
                setLoading(false)
                const user: usertype = { displayName: result.user.displayName, email: result.user.email, uid: result.user.uid, photoURL: result.user.photoURL };
                dispatch(setUser(user))
                navigate('/')
            }).catch((error) => {
                setLoading(false)
                setError(error.message);
            });
    }
    return (
        <div className="flex w-full h-full">
            <div className="container mx-auto justify-center items-center flex">
                <div className="flex px-2 py-2 xl:w-4/12 lg:w-6/12 md:w-7/12 sm:w-8/12 w-full rounded border border-gray-200 flex-col mt-10">
                    <div className="flex flex-col w-full">
                        <h1 className="text-center py-2 text-lg">welcome let's create your account</h1>
                        {
                            error &&
                            <div className="text-center py-2 flex items-center relative px-5 justify-center text-lg bg-red-100 rounded mt-2">
                                <p className="text-red-500 px-2">
                                    {error}
                                </p>
                                <button className="text-red-500 absolute top-2 w-7 flex items-center justify-center rounded-full h-7 hover:bg-red-50 bg-opacity-25 right-4" onClick={() => setError('')}>
                                    <TimeIcon />
                                </button>
                            </div>
                        }
                        {
                            message &&
                            <div className="text-center py-2 flex items-center relative px-5 justify-center text-lg bg-green-100 rounded mt-2">
                                <p className="text-green-500 px-2">
                                    {message}
                                </p>
                                <button className="text-green-500 absolute top-2 w-7 flex items-center justify-center rounded-full h-7 hover:bg-green-50 bg-opacity-25 right-4" onClick={() => setMessage('')}>
                                    <TimeIcon />
                                </button>
                            </div>
                        }
                        <button onClick={handleGoogleSignin} type='button' className="items-center flex rounded mt-5 mb-3 outline-none border border-gray-200 hover:border-gray-300 justify-center mx-2 h-10">
                            <img src="googleicon.png" alt="google_login_image" className="w-6 h-6 object-contain" />
                            <span className="px-2">
                                Continue with google
                            </span>
                        </button>
                        <form onSubmit={handleSubmit} className="flex flex-col px-3">
                            <div className="flex flex-col">
                                <label htmlFor="username">Username</label>
                                <input value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} placeholder="add your username" autoComplete="off" type="text" id="username" className="placeholder-gray-400 border border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                            </div>
                            <div className="flex flex-col mt-3">
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="add your email address" autoComplete="off" type="email" id="email" className="placeholder-gray-400 border border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                            </div>
                            <div className="flex flex-col relative mt-3">
                                <label htmlFor="password">Password</label>
                                <input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} autoComplete="off" placeholder='add password here' type={isEyeOpen ? "text" : "password"} id="password" className="placeholder-gray-400 border border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                                <button onClick={() => setIsEyeOpen(!isEyeOpen)} className="absolute top-9 right-3" type="button">{isEyeOpen ? <EyeIcon /> : <EyeoffIcon />}</button>
                            </div>
                            <div className="flex flex-col relative mt-3">
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input value={cpassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setCPassword(e.target.value)} autoComplete="off" placeholder='add confirm password here' type={isEyeOpen ? "text" : "password"} id="confirm_password" className="placeholder-gray-400 border border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                                <button onClick={() => setIsEyeOpen(!isEyeOpen)} className="absolute top-9 right-3" type="button">{isEyeOpen ? <EyeIcon /> : <EyeoffIcon />}</button>
                            </div>
                            <button disabled={loading} className={`mt-5 mb-2 rounded w-full h-9 bg-btnClr text-gray-100`}>{loading ? <Loading /> : 'Signup'}</button>
                        </form>
                        <p className="w-full items-center justify-center mt-2 text-center">
                            <span>Already have an account ?</span>
                            <Link to='/signin' className="px-2 hover:text-blue-600 hover:underline">Signin</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
