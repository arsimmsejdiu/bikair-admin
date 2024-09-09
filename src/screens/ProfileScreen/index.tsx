import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import AccountProfile from "components/ProfileComponent/AccountProfile";
import AccountProfileDetails from "components/ProfileComponent/AccountProfileDetails";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import React, {memo} from "react";
import {useEffect} from "react";
import {setTitle} from "redux/slices/global";

const ProfileScreen = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.global.me);

    useEffect(() => {
        dispatch(setTitle("Profil"));
    }, []);

    return (
        <Box
            sx={{
                flexGrow: 1,
                py: 8
            }}
            component={"main"}
        >
            <Container maxWidth={"lg"}>
                <Stack spacing={3}>
                    <div>
                        <Typography variant={"h4"}>
                            Informations sur mon compte
                        </Typography>
                    </div>
                    <div>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <AccountProfile user={user}/>
                            </Grid>
                            <Grid item
                                xs={12}
                                md={6}
                                lg={8}
                            >
                                <AccountProfileDetails/>
                            </Grid>
                        </Grid>
                    </div>
                </Stack>
            </Container>
        </Box>
    );
};

export default memo(ProfileScreen);
