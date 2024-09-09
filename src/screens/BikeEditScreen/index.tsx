import CloseIcon from "@mui/icons-material/Close";
import {Box, Button, FormControl, Grid, IconButton, Modal, Paper} from "@mui/material";
import {useAppSelector} from "hooks/useAppSelector";
import {Bike} from "models/dto/Bike";
import {BikeStatusValues} from "models/values/BikeStatusValues";
import {BikeTagValues} from "models/values/BikeTagValues";
import {useSnackbar} from "notistack";
import React, {lazy, Suspense, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {getBikeDetail, updateBike,} from "services/bikes";

import "./style.css";
import {BikeStatusType, BikeTagType} from "@bikairproject/shared";

const DateTimeInput = lazy(() => import("components/FormInputs/DateTimeInput"));
const MultiSelectInput = lazy(() => import("components/FormInputs/MultiSelectInput"));
const SelectInput = lazy(() => import("components/FormInputs/SelectInput"));
const StringInput = lazy(() => import("components/FormInputs/StringInput"));
const LoadingOverlay = lazy(() => import("components/LoadingOverlay"));

export default function BikeEditScreen() {
    const {bike_id} = useParams();

    const citiesName = useAppSelector((state) => state.global.citiesName);

    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        control,
        reset
    } = useForm<Bike>();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const newDetailId =
            !bike_id || bike_id === "new" ? null : parseInt(bike_id);
        handleGetData(newDetailId);
    }, [bike_id]);

    const handleGetData = async (bikeId?: any) => {
        setLoading(true);
        try {
            const bikeDetail = await getBikeDetail(bikeId);
            if (bikeDetail) {
                const tags: BikeTagType[] = bikeDetail?.tags ? bikeDetail.tags as BikeTagType[] : [];
                const status: BikeStatusType | undefined = bikeDetail?.status ? bikeDetail.status as BikeStatusType : undefined;
                const _bike: Bike = {
                    id: bikeDetail.id,
                    uuid: bikeDetail.uuid,
                    name: bikeDetail.name,
                    tags: tags,
                    status: status,
                    address: bikeDetail.address,
                    city_name: bikeDetail.city_name,
                    created_at: bikeDetail.created_at,
                    updated_at: bikeDetail.updated_at,
                };
                reset(_bike);
            }
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

    const handleCloseModal = () => {
        navigate("..");
    };

    const handleSaveClick: SubmitHandler<Bike> = (data, e) => {
        setLoading(true);
        const toSave = Object.assign({}, data) as Bike;
        if (bike_id !== null) {
            updateBike(toSave)
                .then((bike) => {
                    enqueueSnackbar("Velo modifié avec succès !", {
                        variant: "success",
                    });
                    reset(bike);
                })
                .catch((error) => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la création du velo [${error.response.status}]`,
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

    return (
        <Modal open={true} onClose={handleCloseModal}>
            <Box sx={styles.modalStyle}>
                <Box sx={styles.header}>
                    <Box flexGrow={1}>
                        <h1>Velo</h1>
                    </Box>
                    <Box>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </Box>
                <FormControl component="form" onSubmit={handleSubmit(handleSaveClick)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Suspense fallback={<div></div>}>
                                <StringInput
                                    name={"name"}
                                    label={"Nom"}
                                    control={control}
                                    rules={{required: true}}
                                />
                            </Suspense>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Suspense fallback={<div></div>}>
                                <SelectInput
                                    name={"city_name"}
                                    label={"Ville"}
                                    values={citiesName.map(v => {
                                        return {
                                            label: v,
                                            value: v
                                        };
                                    })}
                                    editable
                                    control={control}
                                    rules={{required: true}}
                                />
                            </Suspense>
                        </Grid>
                        <Grid item xs={12}>
                            <Suspense fallback={<div></div>}>
                                <StringInput
                                    name={"address"}
                                    label={"Adresse"}
                                    editable
                                    control={control}
                                />
                            </Suspense>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Suspense fallback={<div></div>}>
                                <SelectInput
                                    name={"status"}
                                    label={"Status"}
                                    values={BikeStatusValues.map(v => {
                                        return {
                                            label: t(`bike.status.${v}`),
                                            value: v
                                        };
                                    })}
                                    editable
                                    control={control}
                                    rules={{required: true}}
                                />
                            </Suspense>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Suspense fallback={<div></div>}>
                                <MultiSelectInput
                                    name={"tags"}
                                    label={"Tags"}
                                    values={BikeTagValues.map(v => {
                                        return {
                                            key: t(`bike.tags.${v}`),
                                            value: v
                                        };
                                    })}
                                    editable
                                    control={control}
                                />
                            </Suspense>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Suspense fallback={<div></div>}>
                                <DateTimeInput
                                    name={"created_at"}
                                    label={"Date création"}
                                    control={control}
                                />
                            </Suspense>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Suspense fallback={<div></div>}>
                                <DateTimeInput
                                    name={"updated_at"}
                                    label={"Date modification"}
                                    control={control}
                                />
                            </Suspense>
                        </Grid>
                    </Grid>

                    <Paper sx={styles.footer}>
                        <Button type={"submit"}>Sauvegarder</Button>
                    </Paper>
                </FormControl>
                <Suspense fallback={<div></div>}>
                    <LoadingOverlay open={loading}/>
                </Suspense>
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
        width: "80%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        overflow: "scroll",
        height: "80%",
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
