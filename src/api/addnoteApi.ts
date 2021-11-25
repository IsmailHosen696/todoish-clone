import { getDocs, setDoc, doc, collection, deleteDoc, where, query } from 'firebase/firestore';
import { noteType } from '../types';
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
    const updateRef = await doc(firestore, 'notes', id);
    await deleteDoc(updateRef);
}