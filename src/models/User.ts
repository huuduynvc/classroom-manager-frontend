export interface User{
    username:string;
    id: string;
    password: string;
    fullname: string;
    email: string;
    rfToken: string;
    creation_time: string;
    modification_time: string;
    avatar?: string;
}