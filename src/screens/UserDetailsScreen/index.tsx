import {Box, Button, Chip, IconButton, Modal, Paper, Skeleton, Stack, Tooltip} from "@mui/material";
import { GridRowId } from "@mui/x-data-grid/models";
import {CloseIcon} from "assets";
import { SkeletonLoad, SkeletonLoadItem } from "assets";
import { EventList } from "components/EventAccordion";
import LoadingOverlay from "components/LoadingOverlay";
import { TripList } from "components/TripsAccordion";
import { FilterData } from "models/interfaces/FilterData";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import { getUserEventLogs } from "services/events";
import { getTrips } from "services/trips";
import { getUserDetail, updateUserDetail } from "services/users";

import "./style.css";
import { GetTripsOutput, GetUserDetailOutput, GetUserEventLogsOutputData } from "@bikairproject/shared";

const tripActiveColumns: Record<GridRowId, boolean> = {
    "id": false,
    "uuid": false,
    "booking_id": false,
    "payment_method_id": false,
    "invoice": false,
    "reference": false,
    "payment_intent": false,
    "trip_deposit_id": false
};

export default function UserDetailsScreen() {
    const {user_id} = useParams();
    const [user, setUser] = useState<GetUserDetailOutput | null>(null);
    const [process, setProcess] = useState<string | null>(null);

    const [events, setEvents] = useState<GetUserEventLogsOutputData[]>([]);
    const [trips, setTrips] = useState<GetTripsOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [eventsLoading, setEventsLoading] = useState(false);
    const [tripsLoading, setTripsLoading] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (typeof user_id !== "undefined" && user_id !== null && user_id !== "new") {
            const intUserId = parseInt(user_id);
            handleGetData(intUserId);
        }
    }, [user_id]);

    const handleGetData = async (userId?: any): Promise<void> => {
        setLoading(true);
        try {
            setUserLoading(true);
            getUserDetail(userId).then(_user => {
                setUser(_user);
            }).finally(() => setUserLoading(false));
            setEventsLoading(true);
            getUserEventLogs(userId).then(_event => {
                setEvents(_event);
            }).finally(() => setEventsLoading(false));
            setTripsLoading(true);
            const filterData: FilterData = {
                limit: 100,
                offset: 0,
                orderBy: "id",
                order: "desc",
                column: "user_id",
                operator: "=",
                value: `${userId}`,
                search: null
            };
            getTrips(filterData, tripActiveColumns).then(_trips => {
                setTrips(_trips);
            }).finally(() => setTripsLoading(false));
        } catch (error: any) {
            console.log(error);
            if (error.response.status !== 401) {
                enqueueSnackbar(
                    `Erreur lors de la récupération des données [${error.response.status}]`,
                    {
                        variant: "error"
                    }
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBlockUser = async () => {
        try {
            setProcess("update_block");
            if(user_id){
                await updateUserDetail(user_id, {is_block: !user?.is_block});

                enqueueSnackbar("Utilisateur mise à jour avec succès !", {
                    variant: "success"
                });
                getUserDetail(user_id).then(_user => {
                    setUser(_user);
                });
            }
        } catch (error: any) {
            console.log(error);
        }finally{
            setProcess(null);
        }
    };

    const handleCloseModal = () => {
        navigate("..");
    };

    return (
        <Box>
            <Modal open={true} onClose={handleCloseModal}>
                <Box sx={styles.modalStyle}>
                    <Box sx={styles.header}>
                        <Box style={styles.title} flexGrow={1}>
                            <h1>{t("user_list.user")}(id: {user_id}): </h1>
                            {userLoading ? (<SkeletonLoad/>) : (
                                <Tooltip title={"Nom et prenom d'utilisateur"} placement={"top"}>
                                    <h2 style={styles.bikeName}>
                                        {userLoading ? t("user_list.firstname") : user?.firstname} {" "}
                                        {userLoading ? t("user_list.lastname") : user?.lastname}
                                    </h2>
                                </Tooltip>
                            )}
                            
                            {user?.deposit_status ? (
                                userLoading ? <SkeletonLoad/> :
                                    <Tooltip title={"Stripe payment intend lien"} placement={"top"}>
                                        <a className="a"
                                            href={`https://dashboard.stripe.com/payments/${user.deposit_stripe_id}`}
                                            target={"_blank"}>
                                        Payment intend
                                        </a>
                                    </Tooltip>
                            ) : null}
                            <Button 
                                sx={{marginLeft: 3}}
                                onClick={() => handleBlockUser()} 
                                disabled={process === "update_block"}
                                color={user?.is_block ? "info" : "error"} 
                                variant="contained">{user?.is_block ? "Débloquer" : "Bloquer"}
                            </Button>
                        </Box>
                        <Box>
                            <IconButton onClick={handleCloseModal}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                    <Stack sx={{margin: 2}} spacing={2} direction="row">
                        {
                            user ? 
                                <>
                                    <Chip color="info" label={user?.deposit_status  ? "Caution active" : "Pas de caution active"}/>
                                    <Chip color={user?.is_block ? "error" : "info"} label={user?.is_block  ? "Bloqué" : "Débloqué"}/>
                                </>
                                : <Skeleton variant="circular" width={40} height={40} />
                        }
                    </Stack>
                    {/*PaperModal Component*/}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginBottom: "1rem",
                            "& > :not(style)": {
                                m: 1,
                            },
                        }}
                    >
                        <Paper>
                            <Box sx={{ marginLeft: "1.5rem" }} style={styles.title} flexGrow={1}>
                                <h3>{t("user_list.phone")}: </h3>
                                <h4
                                    style={
                                        userLoading ? styles.bikeNameEmpty : styles.bikeName
                                    }>
                                    {userLoading ? <SkeletonLoadItem/> : user?.phone}
                                </h4>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{ marginLeft: "1.5rem" }} style={styles.title} flexGrow={1}>
                                <h3>{t("user_list.stripe_link")}: </h3>
                                <a style={styles.link}
                                    href={`https://dashboard.stripe.com/customers/${user?.stripe_customer}`}
                                    target="_blank">
                                    <h4 style={
                                        userLoading ? styles.bikeNameEmpty : styles.bikeName
                                    }>
                                        {userLoading ? <SkeletonLoadItem/> : user?.stripe_customer}
                                    </h4>
                                </a>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{ marginLeft: "1.5rem" }} style={styles.title} flexGrow={1}>
                                <h3>{t("user_list.version")}: </h3>
                                <h4
                                    style={
                                        userLoading ? styles.bikeNameEmpty : styles.bikeName
                                    }>
                                    {userLoading ? <SkeletonLoadItem/> : user?.client_version}
                                </h4>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{ marginLeft: "1.5rem" }} style={styles.title} flexGrow={1}>
                                <h3>{t("user_list.os")}: </h3>
                                <h4
                                    style={userLoading ? styles.bikeNameEmpty : styles.bikeName}>
                                    {userLoading ? <SkeletonLoadItem/> : user?.os}
                                </h4>
                            </Box>
                        </Paper>
                    </Box>
                    <EventList data={events} eventsLoading={eventsLoading}/>
                    <TripList data={trips} tripsLoading={tripsLoading}/>
                    <LoadingOverlay open={loading}/>
                </Box>
            </Modal>
            <Outlet/>
        </Box>
    );
}

const styles = {
    modalStyle: {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        overflow: "scroll",
        height: "80%",
    },
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
    },
    bikeName: {
        marginLeft: "10px",
        marginRight: "10px",
        padding: "10px",
        backgroundColor: "#e0dfdf",
        borderRadius: "5px",
    },
    bikeNameEmpty: {
        marginLeft: 0,
    },
    link: {
        color: "#47B2FF"
    },
    header: {
        alignItems: "center",
        display: "flex",
    },
    footer: {
        position: "fixed",
        padding: "0.5rem",
        bottom: 0,
        left: 0,
        right: 0,
    },
};

