export type noteType = {
    parent: string;
    id: string;
    uuid?: string;
    description: string;
    headline: string;
    date?: string;
    isCompleted: boolean;
    inTrash: boolean;
    isImportant: boolean;
}
export type userType = {
    uid: string;
    username: string;
    email: string;
}
export type projectType = {
    uid?: string;
    id: string;
    name: string;
    color: string
}
export type tagType = {
    uid?: string;
    id: string;
    name: string;
    color: string
}