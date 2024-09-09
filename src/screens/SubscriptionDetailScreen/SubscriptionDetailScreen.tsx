import CloseIcon from "@mui/icons-material/Close";
import {Button, FormControl, Grid, IconButton, Modal, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import NumberInput from "components/FormInputs/NumberInput";
import SelectInput from "components/FormInputs/SelectInput";
import StringInput from "components/FormInputs/StringInput";
import TextareaInput from "components/FormInputs/TextareaInput/TextareaInput";
import {useAppSelector} from "hooks/useAppSelector";
import {SubscriptionValues} from "models/values/SubscriptionValues";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {getSubscription, updateSubscription} from "services/Subscriptions";

import {ACCESS_RIGHTS, GetSubscriptionDetailOutput} from "@bikairproject/shared";

const SubscriptionDetailScreen = () => {
    const {subscription_id} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.global.me);

    const [detailId, setDetailId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof subscription_id !== "undefined" && subscription_id !== null && subscription_id !== "new") {
            const intSubscriptionId = parseInt(subscription_id);
            setDetailId(intSubscriptionId);
            fetchData(intSubscriptionId);
        }
    }, [subscription_id]);

    const {
        handleSubmit,
        control,
        reset,
    } = useForm<GetSubscriptionDetailOutput>();

    const fetchData = (detailId: number | null) => {
        setLoading(true);
        if (detailId !== null) {
            getSubscription(detailId)
                .then(subscription => {
                    if(subscription) {
                        return reset(subscription);
                    }
                })
                .catch((error: any) => {
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

    const handleSaveClick: SubmitHandler<GetSubscriptionDetailOutput> = (data, e) => {
        setLoading(true);
        if (detailId !== null) {
            console.log("handleSaveClick : ", data);
            updateSubscription(detailId, data)
                .then((saved) => {
                    enqueueSnackbar("Velo modifié avec succès !", {
                        variant: "success",
                    });
                    reset({
                        ...data,
                        ...saved
                    });
                })
                .catch((error) => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la modification de la souscription [${error.response.status}]`,
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
                        <h1>Pass & Abonnement</h1>
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
                                    name={"user_id"}
                                    label={"User ID"}
                                    control={control}
                                    loading={loading}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StringInput
                                    name={"user_name"}
                                    label={"User Name"}
                                    control={control}
                                    loading={loading}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StringInput
                                    name={"product_name"}
                                    label={"Produit ID"}
                                    control={control}
                                    loading={loading}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectInput
                                    name={"status"}
                                    label={"Statut"}
                                    values={SubscriptionValues.map(v => {
                                        return {
                                            label: `subscription_value.${v}`,
                                            value: v
                                        };
                                    })}
                                    editable
                                    control={control}
                                    loading={loading}
                                    rules={{required: true}}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextareaInput
                                    name={"canceled_note"}
                                    placeholder="Note d'annulation"
                                    minRows={5}
                                    maxChar={250}
                                    editable
                                    control={control}
                                    loading={loading}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <NumberInput
                                    name={"total_usage"}
                                    label={"Utilisation totale"}
                                    editable
                                    control={control}
                                    rules={{required: true}}
                                    loading={loading}
                                />
                            </Grid>
                        </Grid>
                        {user?.access_rights.includes(ACCESS_RIGHTS.SUBSCRIPTIONS_WRITE) && (
                            <Paper sx={styles.footer}>
                                <Button
                                    type={"submit"}
                                    disabled={loading}
                                >
                                    Sauvegarder
                                </Button>
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
        padding: "0.5rem",
        left: 0,
        right: 0
    }
};

export default SubscriptionDetailScreen;
