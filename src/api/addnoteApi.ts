import { getDocs, setDoc, doc, collection, deleteDoc } from 'firebase/firestore';
import { noteType } from '../types';
import { firestore } from '../firebase/firebase'


export async function getAllNotesFromFirebase() {
    const nameCollection = collection(firestore, 'notes');
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

// export async function updateTagsForDelete(id: string, tags: noteType[]) {
//     const updateRef = await doc(firestore, 'notes', id);
//     // let newTag = tags.filter(note => note.tags?.filter(tag => tag.id !== id))
//     // setDoc(updateRef, { tags: newTag }, { merge: true })
// }