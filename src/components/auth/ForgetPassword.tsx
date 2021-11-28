import { FirebaseError } from 'firebase/app'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts'
import TimeIcon from '../../icons/TimeIcon'
import Loading from '../utilities/loader/Loading'

export default function ForgetPassword() {
    useEffect(() => {
        document.title = 'Forget Password: Todoist'
    })
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const { passwordReset } = useAuth()
    const handleForgetPassword = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('')
        setLoading(true)
        if (!email) {
            setLoading(false)
            setError('please provide and email address')
        } else {
            setLoading(true);
            try {
                await passwordReset(email)
                    .then(() => {
                        setLoading(false)
                        setMessage('a email has been sent to your mail box ! follow that for further instruction')
                    }).catch((err: FirebaseError) => {
                        setError(err.message);
                        setLoading(false)
                    })
            } catch (error) {
                setLoading(false)
            }
        }
    }
    return (
        <div className="flex w-full h-full">
            <div className="container mx-auto justify-center items-center flex">
                <div className="flex px-2 py-2 w-4/12 rounded border dark:border-gray-800 dark:bg-viewboxDark dark:text-gray-100 border-gray-200 flex-col mt-10">
                    <div className="flex flex-col w-full">
                        <h1 className="text-center py-2 text-lg">Forget Password</h1>
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
                        <form onSubmit={handleForgetPassword} className="flex flex-col px-3 mt-2">
                            <div className="flex flex-col">
                                <label htmlFor="email">email</label>
                                <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="add your email address" autoComplete="off" type="email" id="email" className="dark:bg-gray-800 shadow placeholder-gray-400 dark:placeholder-gray-600 border dark:border-transparent dark:text-gray-300 border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                            </div>
                            <button disabled={loading} className="mt-5 mb-2 rounded w-full h-9 bg-btnClr text-gray-100">{loading ? <Loading /> : 'Send'}</button>
                        </form>
                        <p className="w-full items-center justify-center mt-2 text-center mb-3">
                            <span>Continue with</span>
                            <Link to='/signin' className="px-2 hover:text-blue-600 hover:underline">Signin</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
