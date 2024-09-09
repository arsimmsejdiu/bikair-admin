import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {TypographyAtomic} from "Atomic/TypographyAtomic";
import {useAppSelector} from "hooks/useAppSelector";
import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import DrawerMenu from "../DrawerMenu";
import UserMenu from "../UserMenu";

export default function AppHeader() {
    const {title} = useAppSelector(state => state.global);
    const username = useAppSelector(state => state.global.firstname);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setVisible(location.pathname !== "/login");
    }, [location.pathname]);

    return (
        <Box sx={{...(visible ? {display: "flex"} : {display: "none"})}}>
            <AppBar position="fixed">
                <Toolbar>
                    <DrawerMenu/>
                    <TypographyAtomic variant="h6" component="div" sx={{
                        flexGrow: 1,
                        textAlign: "left"
                    }}>
                        {title}
                    </TypographyAtomic>
                    <TypographyAtomic style={{
                        fontSize: 17,
                        fontWeight: "700",
                        marginRight: 10
                    }}>
                        Bonjour {username}
                    </TypographyAtomic>
                    <UserMenu/>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </Box>
    );
}
