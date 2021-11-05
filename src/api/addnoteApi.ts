import { getDocs, setDoc, doc, collection, deleteDoc } from 'firebase/firestore';
import { noteType } from '../types';
import { firestore } from '../firebase/firebase'


export async function getNoteCollectiontData() {
    const nameCollection = collection(firestore, 'notes');
    const collectionSnap = await getDocs(nameCollection);
    const collectionList = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as noteType);
    return collectionList;
}
export async function updateNoteTrashCollectiontData(id: string, trashp: boolean) {
    const updateRef = await doc(firestore, 'notes', id);
    setDoc(updateRef, { inTrash: trashp }, { merge: true })
}
export async function updateNoteCompleteCollectiontData(id: string, imp: boolean) {
    const updateRef = await doc(firestore, 'notes', id);
    setDoc(updateRef, { isCompleted: imp }, { merge: true })
}
export async function updateNoteImportantCollectiontData(id: string, imp: boolean) {
    const updateRef = await doc(firestore, 'notes', id);
    setDoc(updateRef, { isImportant: imp }, { merge: true })
}
export async function deleteDataFromNoteCollectiont(id: string) {
    const updateRef = await doc(firestore, 'notes', id);
    await deleteDoc(updateRef);
}
export async function addData(note: noteType) {
    await setDoc(doc(firestore, "notes", note.id), {
        headline: note.headline,
        description: note.description,
        inTrash: note.inTrash,
        isImportant: note.isImportant,
        isCompleted: note.isCompleted
    });

}
