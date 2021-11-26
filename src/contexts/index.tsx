import React, { useContext } from "react";
import { sendPasswordResetEmail, updateEmail, updatePassword, updateProfile, User } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase/firebase";

interface IContextProps {
    emailUpdate: (email: string) => Promise<void>;
    passwordUpdate: (password: string) => Promise<void>;
    displayNameUpdate: (displayName: string) => Promise<void>;
    photoUrlUpdate: (photoURL: string) => Promise<void>;
    passwordReset: (photoURL: string) => Promise<void>;
}
const AuthContexts = React.createContext({} as IContextProps);

export const useAuth = () => {
    return useContext(AuthContexts);
}

export default function AuthProvider(props: { children: any }) {
    const user = auth

    async function emailUpdate(email: string) {
        return await updateEmail(user.currentUser as User, email)
    }
    async function passwordUpdate(password: string) {
        return await updatePassword(user.currentUser as User, password)
    }
    async function displayNameUpdate(displayName: string) {
        return await updateProfile(user.currentUser as User, { displayName })
    }
    async function photoUrlUpdate(file: any) {
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => {
                return error.message
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateProfile(user.currentUser as User, { photoURL: downloadURL })
                    return downloadURL
                });
            }
        );
    }
    async function passwordReset(email: string) {
        return await sendPasswordResetEmail(auth, email)
    }
    const value = {
        emailUpdate,
        passwordUpdate,
        displayNameUpdate,
        photoUrlUpdate,
        passwordReset
    }
    return (
        <AuthContexts.Provider value={value}>
            {props.children}
        </AuthContexts.Provider>
    )
}
//


