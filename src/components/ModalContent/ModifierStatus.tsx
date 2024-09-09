import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DateTimeInput from "components/FormInputs/DateTimeInput";
import {ModalChildrenProps} from "models/interfaces/ModalChildrenProps";
import {useSnackbar} from "notistack";
import React, {useEffect, useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {putForceEndTrip} from "services/trips";

import {PutEndTripForceInput} from "@bikairproject/shared";

interface FormType {
    time_end: Date,
    lat: string,
    lng: string
}

type ForceEndTripProps = ModalChildrenProps;

const ModifierStatus: React.FC<ForceEndTripProps> = (
    {
        onClose,
    }) => {
    const {trip_id} = useParams();
    const [loading, setLoading] = useState(false);
    const closeCallback = useRef<() => void>();
    const [open, setOpen] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    console.log("trips id --> ", trip_id);

    const {
        handleSubmit,
        control,
        reset,
        getValues
    } = useForm<FormType>();

    useEffect(() => {
        reset({
            time_end: new Date(),
            lat: "",
            lng: ""
        });
    }, []);

    useEffect(() => {
        closeCallback.current = onClose;
    }, [onClose]);

    const handleSaveClick: SubmitHandler<FormType> = (data, e) => {
        console.log("call handleSaveClick");
        if (trip_id !== null) {
            setLoading(true);
            const toSave: PutEndTripForceInput = {};
            toSave.time_end = data.time_end.getTime();
            toSave.lat = data.lat ? Number(data.lat) : undefined;
            toSave.lng = data.lng ? Number(data.lng) : undefined;
            console.log("call putForceEndTrip");
            putForceEndTrip(toSave)
                .then((trip) => {
                    console.log("success");
                    enqueueSnackbar("Traje modifié avec succès !", {
                        variant: "success",
                    });
                    if (typeof closeCallback.current !== "undefined") {
                        console.log("call on close in success");
                        closeCallback.current();
                    }
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
                    console.log("typeof closeCallback.current = ", typeof closeCallback.current);
                    if (typeof closeCallback.current !== "undefined") {
                        console.log("call on close in error");
                        closeCallback.current();
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Box>
            <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                style={{display: "flex", justifyContent: "center"}}
            >
                Modifier le statut
            </Typography>
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
                <Stack spacing={1} direction={"row"} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Button onClick={handleClickOpen} variant="outlined" style={{marginTop: 20}}>
                        Sauvegarder
                    </Button>
                </Stack>
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
                            Êtes-vous sûr de vouloir mettre à jour le statut ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>no</Button>
                        <Button type={"submit"} onClick={handleClose} autoFocus>
                            Validation
                        </Button>
                    </DialogActions>
                </Dialog>
            </FormControl>
        </Box>
    );
};

export default ModifierStatus;
