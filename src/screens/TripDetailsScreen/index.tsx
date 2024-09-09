import "react-medium-image-zoom/dist/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Grid,
    IconButton,
    Modal,
    Paper,
    Tooltip,
    Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {SkeletonLoad, SkeletonLoadItem} from "assets";
import LoadingOverlay from "components/LoadingOverlay";
import { END_TRIP_PHOTO } from "config/endpoints";
import {useAppSelector} from "hooks/useAppSelector";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Zoom from "react-medium-image-zoom";
import { useLocation } from "react-router-dom";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {getTripDetails, getTripsStatuses} from "services/trips";
import {formatPriceWithLocal, formatTimestamp} from "services/utils";

import "./style.css";
import {GetTripDetailsOutput} from "@bikairproject/shared";

export type TripDetailsScreenContextType = { trip: GetTripDetailsOutput | null }

export default function TripDetailsScreen() {
    const {trip_id} = useParams();
    const [trip, setTrip] = useState<GetTripDetailsOutput | null>(null);
    const [statusHistory, setStatusHistory] = useState<any[]>([]);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [photoUrlValidation, setPhotoUrlValidation] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [tripLoading, setTripLoading] = useState(false);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [statusHistoryLoading, setStatusHistoryLoading] = useState(false);
    const user = useAppSelector(state => state.global.me);

    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (typeof trip_id !== "undefined" && trip_id !== null && trip_id !== "new" && !location.pathname.includes("force") && !location.pathname.includes("edit") ) {
            const intTripId = parseInt(trip_id);
            handleGetData(intTripId).then(r => console.log(r));
        }
    }, [trip_id, location]);

    const handleGetData = async (tripId: number): Promise<void> => {
        setLoading(true);
        try {
            setTripLoading(true);
            getTripDetails(tripId).then(_trip => {
                setTrip(_trip);
                setPhotoUrl(_trip?.end_photo ? `${END_TRIP_PHOTO}${_trip.end_photo}` : null);
                setPhotoUrlValidation(_trip?.validation_photo ? `${END_TRIP_PHOTO}${_trip.validation_photo}` : null);
            }).finally(() => setTripLoading(false));
            setStatusHistoryLoading(true);
            getTripsStatuses(tripId).then(_statuses => {
                setStatusHistory(_statuses);
            }).finally(() => setStatusHistoryLoading(false));
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

    const handleCloseModal = () => {
        navigate("..");
    };
    const handleClickForce = () => {
        navigate("force");
    };

    const handleClickEdit = () => {
        navigate("edit");
    };

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean): void => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box>
            <Modal open={true} onClose={handleCloseModal}>
                <Box sx={styles.modalStyle}>
                    <Box sx={styles.header}>
                        <Box style={styles.title} flexGrow={1}>
                            <h1>{t("trip_detail.trip")}(id: {trip_id}): </h1>
                            {tripLoading ? (<SkeletonLoad/>) : (
                                <h2 style={styles.tripDetailElement}>
                                    {trip?.user_name && trip?.user_id ?
                                        `${trip.user_name} (${trip.user_id})`
                                        :
                                        t("trip_detail.user_name")
                                    }
                                </h2>
                            )}
                            {trip?.status === "OPEN" || trip?.status === "WAIT_VALIDATION" ? tripLoading ? (<SkeletonLoadItem/>) : (
                                user?.access_rights.includes("TRIPS_WRITE") && (
                                    <Button style={{marginRight: 10}} variant="outlined" color="primary"
                                        onClick={handleClickForce}>
                                        Forcer fin trajet
                                    </Button>
                                )
                            ) : null}

                            {tripLoading ? (<SkeletonLoadItem/>) : (
                                user?.access_rights.includes("TRIPS_WRITE") && (
                                    <Button variant="outlined" color="success" onClick={handleClickEdit}>
                                        Modifier
                                    </Button>
                                )
                            )}
                        </Box>
                        <Box>
                            <IconButton onClick={handleCloseModal}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                    </Box>
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
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h3>{t("trip_detail.bike_name")}: </h3>
                                <h4
                                    style={
                                        tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement
                                    }>
                                    {tripLoading ? <SkeletonLoadItem/> : trip?.bike_name}
                                </h4>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h3>{t("trip_detail.city_name")}: </h3>
                                <h4
                                    style={
                                        tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement
                                    }>
                                    {tripLoading ? <SkeletonLoadItem/> : trip?.city_name}
                                </h4>
                            </Box>
                        </Paper>
                        <Paper>
                            <Tooltip
                                title={
                                    `Promotion: ${typeof trip?.discounted_amount !== "undefined" ? formatPriceWithLocal(trip?.discounted_amount) : 0} ${trip?.discount_code ? trip?.discount_code : ""}
                                    , Remboursement: ${typeof trip?.refund_amount !== "undefined" ? formatPriceWithLocal(trip?.refund_amount) : 0}`
                                }
                                placement={"top"}
                            >
                                <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                    <h3>{t("trip_detail.price")}: </h3>
                                    <h4 style={tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement}>
                                        {tripLoading ? <SkeletonLoadItem/>
                                            :
                                            trip?.price ?
                                                <span>
                                                    <span style={{textDecoration: "line-through", color: "gray"}}>{formatPriceWithLocal(trip.price)}</span>
                                                    {" "}
                                                    <span>{formatPriceWithLocal(trip.price-trip.discounted_amount-trip.refund_amount)}</span>
                                                </span>
                                                : ""
                                        }
                                    </h4>
                                </Box>
                            </Tooltip>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h3>{t("trip_detail.duration")}: </h3>
                                <h4
                                    style={
                                        tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement
                                    }>
                                    {tripLoading ? <SkeletonLoadItem/> : trip?.duration + " min"}
                                </h4>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h3>{t("trip_detail.status")}: </h3>
                                <h4
                                    style={
                                        tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement
                                    }>
                                    {tripLoading ? <SkeletonLoadItem/> : trip?.status}
                                </h4>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h3>{t("trip_detail.payment_intent")}: </h3>
                                <a
                                    style={styles.link}
                                    href={`https://dashboard.stripe.com/payments/${trip?.payment_intent}`}
                                    target="_blank">
                                    <h4 style={
                                        tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement
                                    }>
                                        {tripLoading ?
                                            <SkeletonLoadItem/> : trip?.payment_intent ? trip?.payment_intent : "null"}
                                    </h4>
                                </a>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h3>{t("trip_detail.time_start")}: </h3>
                                <h4
                                    style={
                                        tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement
                                    }>
                                    {tripLoading ?
                                        <SkeletonLoadItem/> : trip?.time_start ? formatTimestamp(new Date(trip.time_start)) : null}
                                </h4>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h3>{t("trip_detail.start_coords")}: </h3>
                                <a
                                    style={styles.link}
                                    href={`https://www.google.com/maps/search/?api=1&query=${trip?.start_coords.coordinates[1]},${trip?.start_coords.coordinates[0]}`}
                                    target="_blank">
                                    <h4 style={
                                        tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement
                                    }>
                                        {tripLoading ?
                                            <SkeletonLoadItem/> : `[${trip?.start_coords.coordinates[1]},${trip?.start_coords.coordinates[0]}]`}
                                    </h4>
                                </a>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h3>{t("trip_detail.time_end")}: </h3>
                                <h4
                                    style={
                                        tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement
                                    }>
                                    {tripLoading ?
                                        <SkeletonLoadItem/> : trip?.time_end ? formatTimestamp(new Date(trip.time_end)) : null}
                                </h4>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h3>{t("trip_detail.end_coords")}: </h3>
                                <a
                                    style={styles.link}
                                    href={trip?.end_coords?.coordinates ? `https://www.google.com/maps/search/?api=1&query=${trip.end_coords.coordinates[1]},${trip.end_coords.coordinates[0]}` : ""}
                                    target="_blank">
                                    <h4 style={
                                        tripLoading ? styles.tripDetailElementEmpty : styles.tripDetailElement
                                    }>
                                        {tripLoading ?
                                            <SkeletonLoadItem/> : (trip?.end_coords?.coordinates ? `[${trip.end_coords.coordinates[1]},${trip.end_coords.coordinates[0]}]` : "")}
                                    </h4>
                                </a>
                            </Box>
                        </Paper>
                    </Box>
                    {photoUrl && (
                        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography component={"span"} sx={{
                                    width: "33%",
                                    flexShrink: 0
                                }}>Photo fin trajet </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Zoom>
                                    <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <img style={{width: 200, height: 350, objectFit: "cover"}} src={photoUrl}
                                            alt={"End trip Photo"} loading={"lazy"}/>
                                    </Box>
                                </Zoom>
                            </AccordionDetails>
                        </Accordion>
                    )}
                    {photoUrlValidation && (
                        <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography component={"span"} sx={{
                                    width: "33%",
                                    flexShrink: 0
                                }}>Photo validation de trajet </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Zoom>
                                    <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <img style={{width: 200, height: 350, objectFit: "cover"}} src={photoUrlValidation}
                                            alt={"End trip Photo Validation"} loading={"lazy"}/>
                                    </Box>
                                </Zoom>
                            </AccordionDetails>
                        </Accordion>
                    )}
                    <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography component={"span"} sx={{
                                width: "33%",
                                flexShrink: 0
                            }}>L'historique des status des trajets</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                {statusHistory.map((status, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Item style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-around",
                                            alignItems: "center"
                                        }}>
                                            <span style={{
                                                width: "50%",
                                                fontWeight: "bold",
                                                color: "black",
                                                overflowWrap: "break-word"
                                            }}>{status.status}</span>
                                            <span style={{
                                                width: "50%",
                                                fontWeight: "bold",
                                                color: "black",
                                                overflowWrap: "break-word"
                                            }}>{formatTimestamp(new Date(status.created_at))}</span>
                                        </Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <LoadingOverlay open={loading}/>
                </Box>
            </Modal>
            <Outlet context={{trip}}/>
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
    tripDetailElement: {
        marginLeft: "10px",
        marginRight: "10px",
        padding: "10px",
        backgroundColor: "#e0dfdf",
        borderRadius: "5px",
    },
    tripDetailElementEmpty: {
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
