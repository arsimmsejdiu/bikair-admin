import {POST_LOGIN} from "config/endpoints";
import AuthContext from "contexts/AuthContext";
import {useAppDispatch} from "hooks/useAppDispatch";
import React, {useState} from "react";
import {setMe} from "redux/slices/global";
import {getMe} from "services/admins";
import {instanceApi} from "services/http";

export default function AuthProvider({children}: { children: React.ReactNode; }) {
    const [authed, setAuthed] = useState(
        localStorage.getItem("@bearerToken") !== null
    );
    const dispatch = useAppDispatch();

    const login = async (username: string, password: string) => {
        try {
            const authResponse = await instanceApi.post(POST_LOGIN, {
                username: username,
                password: password,
            });
            const auth = authResponse.data;

            // Store token in local storage
            localStorage.setItem("@bearerToken", auth.bearerToken);
            localStorage.setItem("@tokenTimestamp", String(new Date().getTime()));

            const me = await getMe();
            if (me !== null) {
                console.log("Me -->", me);
                dispatch(setMe(me));
            } else {
                throw new Error("Me is null");
            }

            setAuthed(true);
        } catch (error) {
            console.error("Error while login");
            console.error(error);
            throw error;
        }
    };
    const logout = async () => {
        setAuthed(false);
        localStorage.removeItem("@bearerToken");
        localStorage.removeItem("@tokenTimestamp");
    };

    const value = {
        authed,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
