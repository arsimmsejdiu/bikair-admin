import {useAppDispatch} from "hooks/useAppDispatch";
import useAuth from "hooks/useAuth";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {setMe} from "redux/slices/global";
import {getMe} from "services/admins";
import {diffTimestamp} from "services/utils";

export default function CheckAuth() {
    const {logout} = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getMe().then(me => {
            if (me !== null) {
                dispatch(setMe(me));
            } else {
                logout();
            }
        }).catch(error => {
            if (error.response) {
                if ((error.response.status === 403 || error.response.status === 401) && location.pathname !== "/login") {
                    const tokenTimestamp = Number(localStorage.getItem("@tokenTimestamp") || 0);
                    const {
                        diffDays,
                        diffHrs
                    } = diffTimestamp(tokenTimestamp, new Date());
                    if (diffDays >= 1 || diffHrs >= 12) {
                        localStorage.removeItem("@bearerToken");
                        localStorage.removeItem("@tokenTimestamp");
                        logout().then(() => navigate("/login"));
                    }
                }
            }
        });
    });

    return null;
}
