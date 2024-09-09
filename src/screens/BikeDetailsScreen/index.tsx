import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    IconButton,
    Modal,
    Paper,
    Stack,
    styled,
    Typography
} from "@mui/material";
import BikesTags from "components/BikesMap/BikesMapContent/BikesTags";
import LoadingOverlay from "components/LoadingOverlay";
import {useAppSelector} from "hooks/useAppSelector";
import {LastReport} from "models/data/LastReport";
import {BikePositionHistory} from "models/dto/BikePositionHistory";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {getBikeDetail, getBikeHistory,} from "services/bikes";
import {getLastReport, getLastReview} from "services/reports";

import "./style.css";
import {GetBikeDetailOutput, GetBikeReviewOutput} from "@bikairproject/shared";
import {DateUtils} from "@bikairproject/utils";

export default function BikeDetailsScreen() {
    const {bike_id} = useParams();

    const [bike, setBike] = useState<GetBikeDetailOutput | null>(null);
    const [lastReport, setLastReport] = useState<LastReport | null>(null);
    const [review, setReview] = useState<GetBikeReviewOutput | null>(null);
    const [bikeHistory, setBikeHistory] = useState<BikePositionHistory[]>([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState<string | false>(false);
    const user = useAppSelector(state => state.global.me);

    const navigate = useNavigate();
    const {t} = useTranslation();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (typeof bike_id !== "undefined" && bike_id !== null && bike_id !== "new") {
            const intBikeId = parseInt(bike_id);
            handleGetData(intBikeId);
            handleBikePositionHistory(intBikeId);
            fetchLastReportReview(intBikeId);
        }
    }, [bike_id]);

    const fetchLastReportReview = (bikeId: number | undefined): void => {
        if (typeof bikeId === "undefined") {
            return;
        }
        getLastReport(bikeId).then(response => {
            if (!response) {
                setLastReport(null);
            } else {
                setLastReport(response);
            }
        }).catch(error => {
            if (error.response.status !== 401) {
                enqueueSnackbar(`Erreur lors de la récupération des raports [${error.response?.status}]`, {
                    variant: "error"
                });
            }
        });

        getLastReview(bikeId).then(response => {
            if (!response) {
                setReview(null);
            } else {
                setReview(response);
            }
        }).catch(error => {
            if (error.response.status !== 401) {
                enqueueSnackbar(`Erreur lors de la récupération des remontés client [${error.response?.status}]`, {
                    variant: "error"
                });
            }
        });
    };

    const handleGetData = async (bikeId?: any): Promise<void> => {
        setLoading(true);
        try {
            const _bike = await getBikeDetail(bikeId);
            setBike(_bike);
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

    const renderDate = (created_at: string | undefined, text: string) => {
        if (created_at) {
            return DateUtils.toLocaleDateTimeString(DateUtils.databaseDateSerializedToDate(created_at));
        } else {
            return text;
        }
    };

    const handleBikePositionHistory = async (bikeId?: any) => {
        setLoading(true);
        try {
            const _bikeHistory = await getBikeHistory(bikeId);
            setBikeHistory(_bikeHistory);
        } catch (error: any) {
            console.log(error);
            if (error.response.status !== 401) {
                enqueueSnackbar(
                    `Erreur lors de la récupération des données [${error.response.status}]`,
                    {
                        variant: "error",
                    }
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean): void => {
        setExpanded(isExpanded ? panel : false);
    };

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const handleCloseModal = () => {
        navigate("..");
    };

    const handleDetailsClick = () => {
        navigate("edit");
    };

    return (
        <Box>
            <Modal open={true} onClose={handleCloseModal}>
                <Box sx={styles.modalStyle}>
                    <Box sx={styles.header}>
                        <Box style={styles.title} flexGrow={1}>
                            <h1>{t("bike_list.bike")}: </h1>
                            <h2 style={styles.bikeName}>{!bike?.name ? t("bike_list.bike_name") : `${bike?.name}`}</h2>
                            {user?.access_rights.includes("BIKES_WRITE") && (
                                <Button variant="outlined" color="success" onClick={handleDetailsClick}>
                                    Modifier
                                </Button>
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
                                width: 350,
                                height: 90,
                            },
                        }}
                    >
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h2>{t("bike_list.state")}: </h2>
                                <h3
                                    style={styles.bikeName}>{!bike?.status ? t("bike_list.state") : t(`bike.status.${bike?.status}`)}</h3>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h2>{t("marker_details_bike.battery")}: </h2>
                                <h3 style={styles.bikeName}>{!bike?.capacity ? "0 km" : `${bike?.capacity} km`}</h3>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box sx={{marginLeft: "1.5rem"}} style={styles.title} flexGrow={1}>
                                <h2>{t("validate_add_bike_screen.city")}: </h2>
                                <h3
                                    style={styles.bikeName}>{!bike?.city_name ? t("validate_add_bike_screen.city") : `${bike?.city_name}`}</h3>
                            </Box>
                        </Paper>
                    </Box>
                    {/*AccordionMenu Component*/}
                    <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography component={"span"} sx={{
                                width: "33%",
                                flexShrink: 0
                            }}>
                                Coordonnées GPS
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={"span"}>
                                <Stack spacing={1}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            marginBottom: "1rem",
                                            "& > :not(style)": {
                                                m: 1,
                                                width: 1200,
                                                height: 90,
                                            },
                                        }}
                                    >
                                        {bikeHistory.map((history: BikePositionHistory) => (
                                            <Paper>
                                                <Box sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }} flexGrow={1}>
                                                    <h3 style={{marginLeft: "1.5rem"}}>
                                                        <span>{history.coordinates[0]}</span> {" , "}
                                                        <span>{history.coordinates[1]}</span> {" , "}
                                                        <span>{new Date(history.created_at).toLocaleString()}</span>
                                                    </h3>
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Box>
                                </Stack>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography component={"span"} sx={{
                                width: "33%",
                                flexShrink: 0
                            }}>
                                Plus d'infos pour les vélos
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <Item>
                                    <h2>ID: </h2>
                                    <h3>{bike?.id}</h3>
                                </Item>
                                <Item>
                                    <h2>Adresse: </h2>
                                    <h3>{bike?.address}</h3>
                                </Item>
                                <Item>
                                    <h2>ID Tracker: </h2>
                                    <h3>{bike?.tracker_id}</h3>
                                </Item>
                                <Item>
                                    <h2>ID Battery: </h2>
                                    <h3>{bike?.battery_id}</h3>
                                </Item>
                                <Item>
                                    <h2>Coordonnée: </h2>
                                    <h3><span>{bike?.lat}</span>{", "}<span>{bike?.lng}</span></h3>
                                </Item>
                                <Item>
                                    <h2>Date Création: </h2>
                                    {/*<h3>{renderDateUtils(bike?.created_at, "Aucune Date Création")}</h3>*/}
                                    <h3>{renderDate(bike?.created_at, "Aucune Date Création")}</h3>
                                </Item>
                                <Item>
                                    <h2>Date Modification: </h2>
                                    <h3>{renderDate(bike?.updated_at, "Aucune Date Modification")}</h3>
                                </Item>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography component={"span"} sx={{
                                width: "33%",
                                flexShrink: 0
                            }}>Informations de Contrôle</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <Item>
                                    <h2>Pièces endommagées ou manquante : </h2>
                                    {lastReport?.incidents ?
                                        lastReport?.incidents.map((x: any, i: number) => {
                                            return (
                                                <h3 key={i}>&#8226; {x}</h3>
                                            );
                                        }) : <h3 style={{color: "black"}}>Aucune données dans le dernier report </h3>
                                    }
                                    <h2>Date du dernier report
                                        : {renderDate(lastReport?.created_at, "Aucune contrôle")}</h2>
                                </Item>
                                <Item>
                                    <h2>Technicien : </h2>
                                    <h3>{`${lastReport?.lastname} ${lastReport?.firstname}`}</h3>
                                </Item>
                                <Item>
                                    <h2>Dernier deplacement : </h2>
                                    <h3>{lastReport?.workshop}</h3>
                                </Item>
                                <Item>
                                    <h2>Batterie changé : </h2>
                                    <h3>{lastReport?.battery_changed ? "Oui" : "Non"}</h3>
                                </Item>
                                <Item>
                                    <h2>A ramasser : </h2>
                                    <h3>{lastReport?.pick_up ? "Oui" : "Non"}</h3>
                                </Item>
                                <Item>
                                    <h2>Observations : </h2>
                                    <h3>{lastReport?.comment || ""}</h3>
                                </Item>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography component={"span"} sx={{
                                width: "33%",
                                flexShrink: 0
                            }}>Informations de remontée client</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <Item>
                                    <h2>Remontée client: </h2>
                                    {review?.issue ?
                                        review?.issue.map((x: any, i: number) => {
                                            return (
                                                <h3 key={i} style={{color: "red"}}>&#8226; {x}</h3>
                                            );
                                        }) : <h3 style={{color: "black"}}>Aucune données dans le dernier review</h3>
                                    }
                                    <h3>Date du dernier review : {renderDate(review?.created_at, "Aucune review")}</h3>
                                </Item>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography component={"span"} sx={{
                                width: "33%",
                                flexShrink: 0
                            }}>Tags</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {bike && bike.tags ? <BikesTags tags={bike.tags}/> : null}
                        </AccordionDetails>
                    </Accordion>
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

