export type noteType = {
    parentid: string;
    id: string;
    uid?: string;
    description: string;
    about: string;
    tags?: { id: string }[];
    isCompleted: boolean;
    timestamp?: string
}
export type userType = {
    uid: string;
    username: string;
    email: string;
}
export type projectType = {
    timestamp?: string;
    uid?: string;
    id: string;
    name: string | undefined;
    color: string
}
export type tagType = {
    timestamp?: string;
    uid?: string;
    id: string;
    name: string | undefined;
    color: string
}
export type usertype = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null
}
export type updateNoteType = {
    id: string,
    about: string,
    description: string,
    tags?: { id: string }[]
}