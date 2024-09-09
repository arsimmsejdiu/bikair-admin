import CloseIcon from "@mui/icons-material/Close";
import {Button, FormControl, Grid, IconButton, Modal, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import {RecurrenceModal} from "components/CustomRecurrence/RecurrenceModal";
import {useAppSelector} from "hooks/useAppSelector";
import {RecurenceData} from "models/dto/RecurenceData";
import {StatusValues} from "models/values/StatusValues";
import {useSnackbar} from "notistack";
import React, {lazy, Suspense, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {createMarketing, deleteMarketing, getMarketing, updateMarketing} from "services/marketing";
import {createCronExpression, createRecurenceData} from "services/utils";

import {
    ACCESS_RIGHTS,
    MarketingCampaigns,
    MarketingCampaignsCreate,
    MarketingCampaignsUpdate,
    STATUS
} from "@bikairproject/shared";

const ConfirmButton = lazy(() => import("components/ConfirmButton"));
const SelectInput = lazy(() => import("components/FormInputs/SelectInput"));
const StringInput = lazy(() => import("components/FormInputs/StringInput"));
const TextareaInput = lazy(() => import("components/FormInputs/TextareaInput/TextareaInput"));
const MarketingRuleSelector = lazy(() => import("components/MarketingRuleSelector/MarketingRuleSelector"));

const initRecurenceData: RecurenceData = {
    repetition: false,
    year: 2023,
    month: "JAN",
    dayOfWeek: [],
    dayOfMonth: 1,
    hour: 12,
    minute: 30
};

export const CampaignDetailsScreen = () => {
    const {t} = useTranslation();
    const user = useAppSelector(state => state.global.me);
    const [recurenceData, setRecurenceData] = useState(initRecurenceData);
    const [timeEnd, setTimeEnd] = useState<number | undefined>(undefined);
    const [detailId, setDetailId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const {marketing_id} = useParams();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (typeof marketing_id !== "undefined" && marketing_id !== null && marketing_id !== "new") {
            const intMarketingId = parseInt(marketing_id);
            setDetailId(intMarketingId);
            fetchData(intMarketingId);
        } else {
            fetchData(null);
        }
    }, [marketing_id]);

    const {
        handleSubmit,
        setValue,
        control,
        reset,
        setError,
        formState,
        clearErrors
    } = useForm<MarketingCampaigns>();

    const fetchData = (detailId: number | null) => {
        setLoading(true);
        if (detailId === null) {
            reset({
                status: STATUS.ACTIVE,
                configuration: {rules: []},
                created_at: String(new Date()),
                updated_at: String(new Date()),
            });
            setLoading(false);
        } else {
            getMarketing(detailId)
                .then(marketing => {
                    if (marketing) {
                        reset(marketing);
                        setRecurenceData(createRecurenceData(marketing.frequency));
                        setTimeEnd(marketing.date_end ? Number(marketing.date_end) : undefined);
                    } else {
                        navigate("..");
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.status !== 401) {
                        enqueueSnackbar(`Erreur lors de la récupération des données [${error.response.status}]`, {
                            variant: "error"
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleSaveClick: SubmitHandler<MarketingCampaigns> = (data, e) => {
        setLoading(true);
        if (!data.frequency) {
            setError("frequency", t("marketing.errors.missing_frequency"));
            setLoading(false);
            return;
        }
        if (detailId === null) {
            const toSave = Object.assign({}, data) as MarketingCampaignsCreate;
            createMarketing(toSave).then(
                (marketing) => {
                    enqueueSnackbar("Marketing crée avec succès !", {
                        variant: "success"
                    });
                    if (marketing) {
                        navigate(`../${marketing.id}`);
                    }
                }
            ).catch(error => {
                if (error.response.status !== 401) {
                    const message = error?.response?.data ?? `Erreur lors de la création du Marketing [${error.response.status}]`;
                    enqueueSnackbar(message, {
                        variant: "error"
                    });
                }
            }).finally(() => {
                setLoading(false);
            });
        } else {
            const toSave = Object.assign({}, data) as MarketingCampaignsUpdate;
            toSave.id = detailId;
            updateMarketing(toSave).then(() => {
                enqueueSnackbar("Marketing modifié avec succès !", {
                    variant: "success"
                });
            }).catch(error => {
                if (error.response.status !== 401) {
                    enqueueSnackbar(`Erreur lors de la création du Marketing [${error.response.status}]`, {
                        variant: "error"
                    });
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    const handleDeleteConfirm = () => {
        if (detailId !== null) {
            deleteMarketing(detailId)
                .then(() => {
                    enqueueSnackbar("Marketing supprimé avec succès !", {
                        variant: "success"
                    });
                    handleCloseModal();
                })
                .catch(error => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(`Erreur lors de la création du Marketing [${error.response.status}]`, {
                            variant: "error"
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleCronChange = (value: RecurenceData) => {
        setRecurenceData(value);
        setValue("frequency", createCronExpression(value));
        clearErrors("frequency");
    };

    const handleTimeEndChange = (value: number | undefined) => {
        setTimeEnd(value);
        if (typeof value !== "undefined") {
            setValue("date_end", String(value));
        }
    };

    const renderDeleteButton = () => {
        if (detailId !== null) {
            return (
                <ConfirmButton
                    label={"Supprimer"}
                    onConfirm={handleDeleteConfirm}
                />
            );
        } else {
            return null;
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
                        <h1>Campagne de Marketing</h1>
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
                    <FormControl
                        style={{width: "95%"}}
                        component="form"
                        onSubmit={handleSubmit(handleSaveClick)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Suspense fallback={<div></div>}>
                                    <StringInput
                                        name={"name"}
                                        label={"Nom de Campagne"}
                                        editable
                                        loading={loading}
                                        control={control}
                                        rules={{required: true}}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <StringInput
                                        name={"title_fr"}
                                        label={"Titre FR"}
                                        editable
                                        loading={loading}
                                        emoji
                                        control={control}
                                        rules={{required: true}}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <StringInput
                                        name={"title_en"}
                                        label={"Titre EN"}
                                        editable
                                        emoji
                                        loading={loading}
                                        control={control}
                                        rules={{required: true}}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <TextareaInput
                                        name={"message_fr"}
                                        placeholder="Ajouter un message en français"
                                        minRows={5}
                                        maxChar={250}
                                        editable
                                        emoji
                                        loading={loading}
                                        control={control}
                                        rules={{required: true}}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <TextareaInput
                                        name={"message_en"}
                                        placeholder="Ajouter un message en anglais"
                                        minRows={5}
                                        maxChar={250}
                                        editable
                                        loading={loading}
                                        emoji
                                        control={control}
                                        rules={{required: true}}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <SelectInput
                                        name={"status"}
                                        label={"Statut"}
                                        values={StatusValues.map(v => {
                                            return {
                                                label: `status-values.${v}`,
                                                value: v
                                            };
                                        })}
                                        editable
                                        loading={loading}
                                        control={control}
                                        rules={{required: true}}
                                    />
                                </Suspense>
                            </Grid>
                            {user?.access_rights.includes("MARKETINGS_WRITE") && (
                                <Grid item xs={12} md={6} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start"
                                }}>
                                    <RecurrenceModal
                                        loading={loading}
                                        recurenceData={recurenceData}
                                        timeEnd={timeEnd}
                                        onRecurenceChange={handleCronChange}
                                        onTimeEndChange={handleTimeEndChange}
                                    />
                                    <div>
                                        {formState.errors.frequency?.message ?? ""}
                                    </div>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <MarketingRuleSelector name={"configuration"} control={control} loading={loading}/>
                            </Grid>
                        </Grid>
                        {user?.access_rights.includes(ACCESS_RIGHTS.MARKETINGS_WRITE) && (
                            <Paper sx={styles.footer}>
                                <Button
                                    type={"submit"}
                                    disabled={loading}
                                >
                                    Sauvegarder
                                </Button>
                                {renderDeleteButton()}
                            </Paper>
                        )}
                    </FormControl>
                </Box>
            </Box>
        </Modal>
    );
};

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
        height: "80%",
    },
    header: {
        alignItems: "center",
        display: "flex",
    },
    footer: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0.5rem"
    }
};
