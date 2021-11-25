import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/noteUtilsSlice'

export default function UserProfile() {
    const { user } = useAppSelector(state => state.notesutils)
    return (
        <div>
            <Link to='/'>
                Back to home
            </Link>
            {user.displayName}
        </div>
    )
}
