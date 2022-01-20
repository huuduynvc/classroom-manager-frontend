// Libs
import React, { createContext, useState } from "react";

// others
import { User } from 'models/User';
import { parseJwt } from "config/axios";

// create the theme context with default selected language
type ContextProps = {
    user: User,
    changeUser: (newUser: User) => void
};

export const AuthContext = createContext<Partial<ContextProps>>({
    user: { id: "", username: "", password: "", fullname: "", email: "", studentid: "" },
    changeUser: (newUser: User) => { },
});

interface Props {
    children: JSX.Element[] | JSX.Element;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const token = window.localStorage.getItem("token")
    const [currentUser, setCurrentUser] = useState<User>( token?parseJwt(token): { id: "", username: "", password: "", fullname: "", email: "",studentID:"" });
    

    const provider = {
        user: currentUser,
        changeUser: (newUser: User) => {
            console.log({newUser})
            setCurrentUser(newUser);
        },
    };

    return (
        <AuthContext.Provider value={provider}>
            {children}
        </AuthContext.Provider>
    );
};