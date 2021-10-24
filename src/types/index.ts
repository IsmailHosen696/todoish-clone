export type noteType = {
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
    id: string;
    name: string;
    color: string
}