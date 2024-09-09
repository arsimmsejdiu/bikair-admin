import CloseIcon from "@mui/icons-material/Close";
import { Button, FormControl, Grid, IconButton, Modal, Paper, } from "@mui/material";
import Box from "@mui/material/Box";
import ConfirmButton from "components/ConfirmButton";
import BooleanInput from "components/FormInputs/BooleanInput";
import DateInput from "components/FormInputs/DateInput";
import NumberInput from "components/FormInputs/NumberInput";
import SelectInput from "components/FormInputs/SelectInput";
import StringInput from "components/FormInputs/StringInput";
import LoadingOverlay from "components/LoadingOverlay";
import { useAppSelector } from "hooks/useAppSelector";
import { Spot } from "models/dto/Spot";
import { StatusValues } from "models/values/StatusValues";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { createSpot, deleteSpot, getSpot, updateSpot, } from "services/spots";

import "./style.css";
import {ACCESS_RIGHTS} from "@bikairproject/shared";

export default function SpotDetailsScreen () {
    const { spot_id } = useParams();
    const {
        handleSubmit,
        control,
        reset
    } = useForm<Spot>();
    const [loading, setLoading] = useState(false);
    const [detailId, setDetailId] = useState<number | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const citiesName = useAppSelector((state) => state.global.citiesName);
    const user = useAppSelector(state => state.global.me);

    useEffect(() => {
        const newDetailId =
            !spot_id || spot_id === "new" ? null : parseInt(spot_id);
        setDetailId(newDetailId);
        fetchData(newDetailId);
    }, [spot_id]);

    const fetchData = (detailId: number | null) => {
        setLoading(true);
        if (detailId === null) {
            reset({
                city_name: citiesName[0],
                name: "Spot",
                app_client: false,
                app_tech: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
            setLoading(false);
        } else {
            getSpot(detailId)
                .then((spot) => {
                    reset(spot);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la récupération des données [${error.response.status}]`,
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

    const handleSaveClick: SubmitHandler<Spot> = (data, e) => {
        setLoading(true);
        const toSave = Object.assign({}, data) as Spot;
        delete toSave.created_at;
        delete toSave.updated_at;
        console.log(toSave);
        // toSave.app_client = data.app_client === "true" ? true : false;
        // // toSave.app_tech = data.app_tech === "true" ? true : false;
        if (detailId === null) {
            createSpot(toSave)
                .then((spot) => {
                    enqueueSnackbar("Spot crée avec succès !", {
                        variant: "success",
                    });
                    navigate(`../${spot.id}`);
                })
                .catch((error) => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la création du spot [${error.response.status}]`,
                            {
                                variant: "error",
                            }
                        );
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            updateSpot(toSave)
                .then((spot) => {
                    enqueueSnackbar("Spot modifié avec succès !", {
                        variant: "success",
                    });
                })
                .catch((error) => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la création du spot [${error.response.status}]`,
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

    const handleDeleteConfirm = () => {
        if (detailId !== null) {
            deleteSpot(detailId)
                .then(() => {
                    enqueueSnackbar("Spot supprimé avec succès !", {
                        variant: "success",
                    });
                    handleCloseModal();
                })
                .catch((error) => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la suppression du spot [${error.response.status}]`,
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

    const renderDeleteButton = () => {
        if (detailId !== null) {
            return (
                <ConfirmButton label={"Supprimer"} onConfirm={handleDeleteConfirm}/>
            );
        } else {
            return null;
        }
    };

    return (
        <Modal open={true} onClose={handleCloseModal}>
            <Box sx={styles.modalStyle}>
                <Box sx={styles.header}>
                    <Box flexGrow={1}>
                        <h1>{t("spot_screen_details.spot_title")}</h1>
                    </Box>
                    <Box>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{
                    overflowY: "scroll",
                    overflowX: "none",
                    height: "70%",
                    "&::-webkit-scrollbar": {
                        width: 5,
                        WebkitAppearance: "none",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#00A9D2"
                    }
                }}>
                    <FormControl style={{width: "95%"}} component="form" onSubmit={handleSubmit(handleSaveClick)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <StringInput
                                    name={"name"}
                                    label={t("spot_screen_details.spot_name")}
                                    editable
                                    control={control}
                                    rules={{ required: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectInput
                                    name={"city_name"}
                                    label={t("spot_screen_details.spot_cities")}
                                    values={citiesName.map(v => {
                                        return {
                                            label: v,
                                            value: v
                                        };
                                    })}
                                    editable
                                    control={control}
                                    rules={{ required: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <StringInput
                                    name={"address"}
                                    label={t("spot_screen_details.spot_address")}
                                    editable
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StringInput
                                    name={"latitude"}
                                    label={"Latitude"}
                                    editable
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StringInput
                                    name={"longitude"}
                                    label={"Longitude"}
                                    editable
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <NumberInput
                                    name={"max_bikes"}
                                    label={t("spot_screen_details.spot_max_bikes")}
                                    editable
                                    rules={{ required: true }}
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DateInput
                                    name={"created_at"}
                                    label={t("spot_screen_details.spot_created_at")}
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DateInput
                                    name={"updated_at"}
                                    label={t("spot_screen_details.spot_modified_at")}
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <SelectInput
                                    name={"status"}
                                    label={t("spot_screen_details.spot_status")}
                                    values={StatusValues.map(v => {
                                        return {
                                            label: t(`status-values.${v}`),
                                            value: v
                                        };
                                    })}
                                    editable
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <BooleanInput
                                    name={"app_tech"}
                                    label={"Visible pour l'app tech"}
                                    editable
                                    control={control}
                                />
                                <BooleanInput
                                    name={"app_client"}
                                    label={"Visible pour l'app client"}
                                    editable
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                        {user?.access_rights.includes(ACCESS_RIGHTS.SPOTS_WRITE) && (
                            <Paper sx={styles.footer}>
                                <Button type={"submit"}>Sauvegarder</Button>
                                {renderDeleteButton()}
                            </Paper>
                        )}
                    </FormControl>
                </Box>
                <LoadingOverlay open={loading}/>
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
