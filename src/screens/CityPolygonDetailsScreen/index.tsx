import CloseIcon from "@mui/icons-material/Close";
import {Button, FormControl, Grid, IconButton, Modal, Paper,} from "@mui/material";
import Box from "@mui/material/Box";
import ConfirmButton from "components/ConfirmButton";
import DateInput from "components/FormInputs/DateInput";
import SelectInput from "components/FormInputs/SelectInput";
import StringInput from "components/FormInputs/StringInput";
import TextareaInput from "components/FormInputs/TextareaInput/TextareaInput";
import LoadingOverlay from "components/LoadingOverlay";
import {useAppSelector} from "hooks/useAppSelector";
import {CityPolygon} from "models/dto/CityPolygon";
import {StatusValues} from "models/values/StatusValues";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {createCityPolygon, deleteCityPolygon, getCityPolygon} from "services/cities";

import "./style.css";
import {ACCESS_RIGHTS} from "@bikairproject/shared";

export default function CityPolygonDetailsScreen() {
    const {spot_id} = useParams();
    const {
        handleSubmit,
        control,
        reset
    } = useForm<CityPolygon>();
    const [loading, setLoading] = useState(false);
    const [detailId, setDetailId] = useState<number | null>(null);
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const {t} = useTranslation();
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
                name: "Polygon name",
                status: "ACTIVE",
            });
            setLoading(false);
        } else {
            getCityPolygon(detailId)
                .then((polygon) => {
                    if (polygon) {
                        reset(polygon);
                    }
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

    const handleSaveClick: SubmitHandler<CityPolygon> = (data) => {
        setLoading(true);
        const toSave = Object.assign({}, data) as CityPolygon;
        delete toSave.created_at;
        delete toSave.updated_at;
        if (detailId === null) {
            createCityPolygon(toSave)
                .then((polygon) => {
                    enqueueSnackbar("Polygon crée avec succès !", {
                        variant: "success",
                    });
                    navigate(`../${polygon?.id}`);
                })
                .catch((error) => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la création du polygon [${error.response.status}]`,
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
            deleteCityPolygon(detailId)
                .then(() => {
                    enqueueSnackbar("Polygon supprimé avec succès !", {
                        variant: "success",
                    });
                    handleCloseModal();
                })
                .catch((error) => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la suppression du polygon [${error.response.status}]`,
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
                        <h1>{t("Polygon")}</h1>
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
                                    label={t("red_zone_screen_details.red_zone_name")}
                                    editable
                                    control={control}
                                    rules={{required: true}}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectInput
                                    name={"city_name"}
                                    label={t("red_zone_screen_details.red_zone_cities")}
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextareaInput
                                    name={"polygon.coordinates"}
                                    placeholder="longitude1 latitude1, longitude2 latitude2 ... ect. ex: 7.1373385 43.5541959, 7.1384811 43.5539186, 7.1398973 43.5543074, "
                                    minRows={5}
                                    maxChar={250}
                                    editable
                                    loading={loading}
                                    control={control}
                                    rules={{required: true}}
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
                        </Grid>
                        {user?.access_rights.includes(ACCESS_RIGHTS.POLYGON_WRITE) && (
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
