export type noteType = {
    parentid: string;
    id: string;
    uid?: string;
    description: string;
    about: string;
    tags?: { id: string }[];
    isCompleted: boolean;
}
export type userType = {
    uid: string;
    username: string;
    email: string;
}
export type projectType = {
    uid?: string;
    id: string;
    name: string | undefined;
    color: string
}
export type tagType = {
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