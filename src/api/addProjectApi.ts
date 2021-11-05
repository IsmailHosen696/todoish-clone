import { setDoc, doc, collection, getDocs, deleteDoc } from 'firebase/firestore';

import { firestore } from '../firebase/firebase'
import { projectType } from '../types';

export const addProjectToFirebase = async (proj: projectType) => {
    await setDoc(doc(firestore, "projects", proj.id), {
        uid: proj.uid,
        name: proj.name,
        color: proj.color,
    });
}
export const getProjectsFromFirebase = async () => {
    const nameCollection = collection(firestore, 'projects');
    const collectionSnap = await getDocs(nameCollection);
    const collectionList = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as projectType);
    return collectionList;
}
export const deletePtojectFromFirebase = async (id: string) => {
    await deleteDoc(doc(firestore, "projects", id));
}

// for tags
export const addTagToFirebase = async (proj: projectType) => {
    await setDoc(doc(firestore, "tags", proj.id), {
        uid: proj.uid,
        name: proj.name,
        color: proj.color,
    });
}
export const getTagFromFirebase = async () => {
    const nameCollection = collection(firestore, 'tags');
    const collectionSnap = await getDocs(nameCollection);
    const collectionList = collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }) as projectType);
    return collectionList;
}
export const deleteTagFromFirebase = async (id: string) => {
    await deleteDoc(doc(firestore, "tags", id));
} 