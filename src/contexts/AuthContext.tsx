import * as React from "react";

interface AuthContextType {
    authed: boolean;
    login: (username: string, password: string) => Promise<unknown>;
    logout: () => Promise<unknown>;
}

const defaultContext: AuthContextType = {
    authed: false,
    login: async (username, password) => {
        console.log("default login function");
    },
    logout: async () => {
        console.log("default logout function");
    }
};

const AuthContext = React.createContext<AuthContextType>(defaultContext);

export default AuthContext;
