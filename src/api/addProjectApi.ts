import { setDoc, doc, collection, getDocs, deleteDoc, query, where } from 'firebase/firestore';

import { firestore } from '../firebase/firebase'
import { projectType } from '../types';

export const addProjectToFirebase = async (proj: projectType) => {
    await setDoc(doc(firestore, "projects", proj.id), {
        uid: proj.uid,
        name: proj.name,
        color: proj.color,
    });
}
export const getProjectsFromFirebase = async (uid: string) => {
    const nameCollection = query(collection(firestore, 'projects'), where('uid', '==', uid));
    const collectionSnap = await getDocs(nameCollection);
    const collectionList = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as projectType);
    return collectionList;
}
export const deletePtojectFromFirebase = async (id: string) => {
    await deleteDoc(doc(firestore, "projects", id));
}
export async function updateProjectNameIntoFirebase(id: string, name: string | undefined) {
    const updateRef = await doc(firestore, 'projects', id);
    setDoc(updateRef, { name }, { merge: true })
}
// for tags
export const addTagToFirebase = async (proj: projectType) => {
    await setDoc(doc(firestore, "tags", proj.id), {
        uid: proj.uid,
        name: proj.name,
        color: proj.color,
    });
}
export const getTagFromFirebase = async (uid: string) => {
    const nameCollection = query(collection(firestore, 'tags'), where('uid', '==', uid));
    const collectionSnap = await getDocs(nameCollection);
    const collectionList = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as projectType);
    return collectionList;
}
export const deleteTagFromFirebase = async (id: string) => {
    await deleteDoc(doc(firestore, "tags", id));
}
export async function updateTagNameIntoFirebase(id: string, name: string | undefined) {
    const updateRef = await doc(firestore, 'tags', id);
    setDoc(updateRef, { name }, { merge: true })
}