import { useAppDispatch } from "hooks/useAppDispatch";
import * as React from "react";
import { memo, useEffect } from "react";
import { setTitle } from "redux/slices/global";

const SettingsScreen = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle("Paramêtres"));
    }, []);

    return (
        <h1>Settings</h1>
    );
};

export default memo(SettingsScreen);
