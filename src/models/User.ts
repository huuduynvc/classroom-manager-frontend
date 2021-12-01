export interface User{
    username:string;
    id: string;
    password: string;
    fullname: string;
    email: string;
    rfToken?: string;
    creation_time?: string;
    modification_time?: string;
    avatar?: string;
    role_member?: number;
    studentID?:string;
}

export interface SignInForm{
    username:string;
    password: string;
}

export interface UpdateProfileForm{
    id:string;
    fullname:string;
    //password:string;
    studentid:string;
}