import CloseIcon from "@mui/icons-material/Close";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    Modal,
    Paper
} from "@mui/material";
import Box from "@mui/material/Box";
import DateTimeInput from "components/FormInputs/DateTimeInput";
import LoadingOverlay from "components/LoadingOverlay";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {putForceEndTrip} from "services/trips";

import "./style.css";
import {TripDetailsScreenContextType} from "../TripDetailsScreen";
import {PutEndTripForceInput} from "@bikairproject/shared";

interface FormType {
    time_end: string,
}

export default function TripForceEndScreen() {
    const {trip_id} = useParams();
    const {trip} = useOutletContext<TripDetailsScreenContextType>();
    const [loading, setLoading] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [timeEnd, setTimeEnd] = useState<string | null | undefined>(null);
    const [duration, setDuration] = useState(0);

    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const {
        handleSubmit,
        control,
        reset,
    } = useForm<FormType>();

    useEffect(() => {
        if (trip?.time_end) {
            reset({
                time_end: new Date(trip.time_end).toISOString()
            });
        } else {
            reset({
                time_end: new Date().toISOString(),
            });
        }
    }, [trip]);

    useEffect(() => {
        if (timeEnd && trip) {
            setDuration(Math.floor((new Date(timeEnd).getTime() - new Date(trip.time_start).getTime()) / 1000 / 60) + 1);
        }

    }, [timeEnd]);

    const handleSaveClick: SubmitHandler<FormType> = (data, e) => {
        if (typeof trip_id !== "undefined" && trip_id !== null) {
            setTimeEnd(data.time_end);
            setOpenConfirm(true);
        }
    };

    const handleForceTrip = () => {
        setOpenConfirm(false);
        if (timeEnd) {
            setLoading(true);
            const toSave: PutEndTripForceInput = {};
            toSave.userId = trip?.user_id;
            toSave.time_end = new Date(timeEnd).getTime();
            putForceEndTrip(toSave)
                .then((trip) => {
                    console.log("success");
                    enqueueSnackbar("Le trajet à été cloturé avec succès", {
                        variant: "success",
                    });
                    setLoading(false);
                    handleCloseModal();
                })
                .catch((error) => {
                    console.log("error");
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la modification du status [${error.response.status}]`,
                            {
                                variant: "error",
                            }
                        );
                    }
                    setLoading(false);
                });
        }
    };

    const handleCloseModal = () => {
        navigate("..");
    };

    return (
        <>
            <Modal open={true} onClose={handleCloseModal}>
                <Box sx={styles.modalStyle}>
                    <Box sx={styles.header}>
                        <Box flexGrow={1}>
                            <h1>Forcer le fin de trajet</h1>
                        </Box>
                        <Box>
                            <IconButton onClick={handleCloseModal}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                    <FormControl style={{width: "100%"}} component="form" onSubmit={handleSubmit(handleSaveClick)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <DateTimeInput
                                    name={"time_end"}
                                    label={"End Time"}
                                    editable
                                    control={control}
                                    loading={loading}
                                    rules={{
                                        required: true
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Paper sx={styles.footer}>
                            <Button type={"submit"}>Sauvegarder</Button>
                        </Paper>
                    </FormControl>
                    <LoadingOverlay open={loading}/>
                </Box>
            </Modal>
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Êtes-vous sûr·e de vouloir faire payer {duration} minutes ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)} autoFocus>Non</Button>
                    <Button onClick={handleForceTrip}>Oui</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const styles = {
    modalStyle: {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "40%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        overflow: "scroll",
        height: "40%",
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

