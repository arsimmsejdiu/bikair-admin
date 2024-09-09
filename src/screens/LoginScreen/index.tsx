import LoadingButton from "@mui/lab/LoadingButton";
import {Alert, AlertTitle, Avatar, Box, Container, CssBaseline, FormControl, Typography} from "@mui/material";
import {COLORS, LockOutlinedIcon, VpnKeyIcon} from "assets";
import {TypographyAtomic} from "Atomic/TypographyAtomic";
import {useAppDispatch} from "hooks/useAppDispatch";
import useAuth from "hooks/useAuth";
import {columns} from "models/data/Spots";
import React, {lazy, Suspense, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {setCities, setCitiesNames, setCitiesPolygon, setCitiesRedZones, setMe} from "redux/slices/global";
import {getMe} from "services/admins";
import {getCities, getCitiesPolygon, getCitiesRedZones} from "services/cities";

import packageInfo from "../../../package.json";

const PasswordInput = lazy(() => import("components/FormInputs/PasswordInput"));
const StringInput = lazy(() => import("components/FormInputs/StringInput"));

type Inputs = {
    username: string,
    password: string,
};

interface LocationState {
    from?: {
        pathname?: string;
    };
}


export default function LoginScreen() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {login, logout} = useAuth();
    const location = useLocation();
    const {handleSubmit, control} = useForm<Inputs>();
    const [submitError, setSubmitError] = useState<string | null>("");
    const [loading, setLoading] = useState(false);
    const [from, setFrom] = useState<string>("/");
    const {t} = useTranslation();
    const version = packageInfo.version;

    useEffect(() => {
        const newFrom = (location.state as LocationState) ? (location.state as LocationState).from?.pathname ?? "/" : "/";
        setFrom(newFrom);
    }, [location.state]);

    const handleLogin: SubmitHandler<Inputs> = (data) => {
        setLoading(true);
        setSubmitError(null);
        login(data.username, data.password).then(() => {
            getMe().then(me => {
                if (me !== null) {
                    console.log("Me -->", me);
                    dispatch(setMe(me));

                    const citiesPromise = getCities(null, {});
                    const citiesRedZonePromise = getCitiesRedZones();
                    const citiesPolygonPromise = getCitiesPolygon();

                    Promise.all([citiesPromise, citiesRedZonePromise, citiesPolygonPromise]).then(values => {
                        const cities = values[0];
                        const citiesName = cities.rows.map((c) => c.name ?? "");
                        dispatch(setCities(cities.rows));
                        dispatch(setCitiesNames(citiesName));
                        for (const column of columns) {
                            if (column.field === "city_name") {
                                column.values = citiesName;
                                column.defaultValue = citiesName[0];
                            }
                        }
                        dispatch(setCitiesRedZones(values[1]));
                        dispatch(setCitiesPolygon(values[2]));
                    });
                    setLoading(false);
                    navigate(from, {replace: true});
                } else {
                    setLoading(false);
                    setSubmitError("Nous n'avons pas pu vous connecter");
                    logout().then(r => console.log(r));
                }
            }).catch(() => {
                setLoading(false);
                setSubmitError("Nous n'avons pas pu vous connecter");
                logout().then(r => console.log(r));
            });
        }).catch(() => {
            setSubmitError("Erreur lors de l'authetification");
            setLoading(false);
        });
    };

    const showLoginError = () => {
        if (submitError) {
            const errorMessage = String(submitError);
            return (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            );
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{
                    m: 1,
                    bgcolor: "secondary.main"
                }}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("user.signin")}
                </Typography>
                {showLoginError()}
                <FormControl component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{mt: 1}}>
                    <Suspense fallback={<div></div>}>
                        <StringInput
                            name={"username"}
                            label={t("user.username")}
                            editable
                            control={control}
                            rules={{required: true}}
                        />
                    </Suspense>
                    <Suspense fallback={<div></div>}>
                        <PasswordInput
                            name={"password"}
                            label={t("user.password")}
                            editable
                            visibility
                            control={control}
                            rules={{required: true}}
                        />
                    </Suspense>

                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2
                        }}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<VpnKeyIcon/>}
                    >
                        {t("user.signin")}
                    </LoadingButton>
                    <TypographyAtomic style={{fontSize: 11, color: COLORS.darkGrey}} variant={"h6"}>Backoffice V{version}</TypographyAtomic>
                </FormControl>
            </Box>
        </Container>
    );
}
