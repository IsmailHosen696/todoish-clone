export type noteType = {
    parentid: string;
    id: string;
    uuid?: string;
    description: string;
    about: string;
    tags: [];
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