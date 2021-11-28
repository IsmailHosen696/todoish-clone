import { FirebaseError } from "firebase/app";
import { sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, provider } from "../../firebase/firebase";
import EyeIcon from "../../icons/EyeIcon";
import EyeoffIcon from "../../icons/EyeoffIcon";
import TimeIcon from "../../icons/TimeIcon";
import { setUser, useAppDispatch } from "../../redux/noteUtilsSlice";
import { usertype } from "../../types";
import Loading from "../utilities/loader/Loading";

export default function Signin() {
    useEffect(() => {
        document.title = 'Signin: Todoist'
    })
    const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false)
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState<string>('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('')
        setLoading(true)
        if (!email || !password) {
            setLoading(false)
            return setError('please fill all the fields carefully')
        }
        else {
            try {
                signInWithEmailAndPassword(auth, email, password).then((user) => {
                    if (!user.user.emailVerified) {
                        sendEmailVerification(user.user).then(() => {
                            setMessage('a verification mail has been sent! check thar for further information')
                            setLoading(false)
                        }).catch((err: FirebaseError) => {
                            setError(err.message)
                            setLoading(false)
                        })
                    } else {
                        navigate('/')
                        dispatch(setUser({ uid: user.user.uid, email: user.user.email, displayName: user.user.displayName, photoURL: user.user.photoURL }))
                        setLoading(false);
                    }
                }).catch((err: FirebaseError) => {
                    setError(err.message);
                    setLoading(false)
                })
            } catch (error) {
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
                <div className="flex px-2 py-2 w-4/12 rounded border dark:border-gray-800 dark:bg-viewboxDark dark:text-gray-100 border-gray-200 flex-col mt-10">
                    <div className="flex flex-col w-full">
                        <h1 className="text-center py-2 text-lg">welcome back! <span className="font-medium">signin</span> to continue</h1>
                        {
                            error &&
                            <div className="text-center py-2 flex items-center relative px-5 justify-center text-lg bg-red-100 rounded mt-2">
                                <p className="text-red-500 px-2">
                                    {error}
                                </p>
                                <button className="text-red-400 absolute top-3 right-4" onClick={() => setError('')}>
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
                        <button onClick={handleGoogleSignin} className="items-center flex rounded mt-5 mb-3 outline-none dark:bg-gray-800 border dark:border-gray-800 border-gray-200 hover:border-gray-300 justify-center mx-2 h-10">
                            <img src="googleicon.png" alt="google_login_image" className="w-6 h-6 object-contain" />
                            <span className="px-2">
                                Continue with google
                            </span>
                        </button>
                        <form onSubmit={handleSubmit} className="flex flex-col px-3 mt-2">
                            <div className="flex flex-col">
                                <label htmlFor="email">email</label>
                                <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="add your email address" autoComplete="off" type="email" id="email" className="dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-600 border dark:border-transparent dark:text-gray-300 border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                            </div>
                            <div className="flex flex-col relative mt-3">
                                <label htmlFor="password">password</label>
                                <input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="add password here" autoComplete="off" type={isEyeOpen ? "text" : "password"} id="password" className="placeholder-gray-400 dark:placeholder-gray-600 dark:bg-gray-800 border dark:border-transparent dark:text-gray-300 border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                                <button onClick={() => setIsEyeOpen(!isEyeOpen)} className="absolute top-9 right-3" type="button">{isEyeOpen ? <EyeIcon /> : <EyeoffIcon />}</button>
                            </div>
                            <button disabled={loading} className="mt-5 mb-2 rounded w-full h-9 bg-btnClr text-gray-100">{loading ? <Loading /> : 'Signin'}</button>
                        </form>
                        <p className="w-full items-center justify-center mt-2 text-center mb-3">
                            <span>Don't have an account ?</span>
                            <Link to='/signup' className="px-2 hover:text-blue-600 hover:underline">Signup</Link>
                        </p>
                        <p className="w-full items-center justify-center mt-2 text-center mb-3">
                            <Link to='/auth/forgetpassword' className="px-2 hover:text-blue-600 hover:underline">Forget password</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
