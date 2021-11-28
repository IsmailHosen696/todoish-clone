import { getDocs, setDoc, doc, collection, deleteDoc, where, query, updateDoc } from 'firebase/firestore';
import { noteType, updateNoteType } from '../types';
import { firestore } from '../firebase/firebase'


export async function getAllNotesFromFirebase(uid: string) {
    const nameCollection = query(collection(firestore, 'notes'), where('uid', '==', uid));
    const collectionSnap = await getDocs(nameCollection);
    const collectionList = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as noteType);
    return collectionList;
}

export const addNoteToFirebase = async (note: noteType) => {
    await setDoc(doc(firestore, "notes", note.id), note);
}

export async function daleteNoteFromFirebase(id: string) {
    const deleteRef = await doc(firestore, 'notes', id);
    await deleteDoc(deleteRef);
}

export const updateFirebaseNote = async (note: updateNoteType) => {
    const deleteRef = await doc(firestore, 'notes', note.id);
    updateDoc(deleteRef, note)
}