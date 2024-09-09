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
import SelectInput from "components/FormInputs/SelectInput";
import LoadingOverlay from "components/LoadingOverlay";
import {TripStatusValues} from "models/values/TripStatusValues";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {updateTripStatus} from "services/trips";

import "./style.css";
import {TripDetailsScreenContextType} from "../TripDetailsScreen";
import {PutTripsOutput, TripStatusType} from "@bikairproject/shared";

interface FormType {
    status: TripStatusType,
}

export default function TripEditStatusScreen() {
    const {trip_id} = useParams();
    const {trip} = useOutletContext<TripDetailsScreenContextType>();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const {t} = useTranslation();
    const {enqueueSnackbar} = useSnackbar();

    const {
        handleSubmit,
        control,
        reset,
    } = useForm<FormType>();

    useEffect(() => {
        if (trip) {
            reset({
                status: trip.status as TripStatusType,
            });
        }
    }, [trip]);

    const handleSaveClick: SubmitHandler<FormType> = (data, e) => {
        if (typeof trip_id !== "undefined" && trip_id !== null) {
            setLoading(true);
            const toSave = Object.assign({}, data) as PutTripsOutput;
            toSave.status = data.status;
            toSave.id = Number(trip_id);
            updateTripStatus(toSave)
                .then((trip) => {
                    console.log("success");
                    enqueueSnackbar("Traje modifié avec succès !", {
                        variant: "success",
                    });
                })
                .catch((error) => {
                    console.log("error");
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la création du trajet [${error.response.status}]`,
                            {
                                variant: "error",
                            }
                        );
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleCloseModal = () => {
        navigate("..");
    };

    return (
        <Modal open={true} onClose={handleCloseModal}>
            <Box sx={styles.modalStyle}>
                <Box sx={styles.header}>
                    <Box flexGrow={1}>
                        <h1>{"Modifier le statut de trajet"}</h1>
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
                            <SelectInput
                                name={"status"}
                                label={"Status"}
                                values={TripStatusValues.map(v => {
                                    return {
                                        label: t(`trip-status.${v}`),
                                        value: v
                                    };
                                })}
                                editable
                                control={control}
                                rules={{required: true}}
                            />
                        </Grid>
                    </Grid>

                    <Paper sx={styles.footer}>
                        <Button type={"submit"}>{"Sauvegarder"}</Button>
                    </Paper>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Avant de mettre à jour statut"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {"Êtes - vous sûr de vouloir mettre à jour le statut ?"}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>non</Button>
                            <Button type={"submit"} onClick={handleClose} autoFocus>
                                oui
                            </Button>
                        </DialogActions>
                    </Dialog>
                </FormControl>
                <LoadingOverlay open={loading || typeof trip === "undefined"}/>
            </Box>
        </Modal>
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
        height: "30%",
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

