import {Box} from "@mui/material";
import {useAppDispatch} from "hooks/useAppDispatch";
import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {setTitle} from "redux/slices/global";

const BikesMap = React.lazy(() => import("components/BikesMap"));

export default function BikesMapScreen() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setTitle("Carte"));
    });

    return (
        <Box>
            <BikesMap/>
            <Outlet/>
        </Box>
    );
}
