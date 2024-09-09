import CloseIcon from "@mui/icons-material/Close";
import { Button, FormControl, Grid, IconButton, Modal, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import "./style.css";
const ConfirmButton = lazy(() => import("components/ConfirmButton"));
const BooleanInput = lazy(() => import("components/FormInputs/BooleanInput"));
const DateInput = lazy(() => import("components/FormInputs/DateInput"));
const NumberInput = lazy(() => import("components/FormInputs/NumberInput"));
const SelectInput = lazy(() => import("components/FormInputs/SelectInput"));
const StringInput = lazy(() => import("components/FormInputs/StringInput"));
const LoadingOverlay = lazy(() => import("components/LoadingOverlay"));
import {useAppSelector} from "../../hooks/useAppSelector";
import { DiscountTypeValues, DiscountTypeWithProductValues } from "../../models/values/DiscountTypeValue";
import { StatusValues } from "../../models/values/StatusValues";
import { createDiscount, deleteDiscount, getDiscount, updateDiscount } from "../../services/discounts";
import { getProducts } from "../../services/products";
import {
    ACCESS_RIGHTS,
    DISCOUNT_CODE,
    Discounts,
    DiscountsCreate,
    DiscountsUpdate,
    DiscountType,
    STATUS
} from "@bikairproject/shared";


export default function DiscountDetailsScreen () {
    const user = useAppSelector(state => state.global.me);

    const { discount_id } = useParams();
    const {
        handleSubmit,
        control,
        reset
    } = useForm<Discounts>();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<any>([]);
    const [discountTypeValues, setDiscountTypeValues] = useState<DiscountType[]>(DiscountTypeValues);
    const [detailId, setDetailId] = useState<number | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const newDetailId = !discount_id || discount_id === "new" ? null : parseInt(discount_id);
        setDetailId(newDetailId);
        fetchData(newDetailId);
        fetchProducts();
    }, [discount_id]);

    const fetchProducts = async () => {
        const products = await getProducts();
        setProducts([...[{
            name: "Aucun",
            id: 0
        }], ...products]);
    };

    const fetchData = (detailId: number | null) => {
        setLoading(true);
        if (detailId === null) {
            reset({
                status: STATUS.ACTIVE,
                type: DISCOUNT_CODE.ONE_SHOT,
                value: 10,
                code: "CODE",
                priority: 0,
                reusable: false,
                product_id: null,
                expired_at: null,
                created_at: String(new Date()),
                updated_at: String(new Date()),
            });
            setLoading(false);
        } else {
            getDiscount(detailId)
                .then(discount => {
                    if(discount) {
                        reset(discount);
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

    const handleSaveClick: SubmitHandler<Discounts> = (data, e) => {
        setLoading(true);
        if (detailId === null) {
            const toSave = Object.assign({}, data) as DiscountsCreate;
            createDiscount(toSave)
                .then(discount => {
                    enqueueSnackbar("Code crée avec succès !", {
                        variant: "success"
                    });
                    if(discount) {
                        navigate(`../${discount.id}`);
                    }
                })
                .catch(error => {
                    if (error.response.status !== 401) {
                        const message = error?.response?.data ?? `Erreur lors de la création de la promotion [${error.response.status}]`;
                        enqueueSnackbar(message, {
                            variant: "error"
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            const toSave = Object.assign({}, data) as DiscountsUpdate;
            updateDiscount(toSave)
                .then(discount => {
                    enqueueSnackbar("Code modifié avec succès !", {
                        variant: "success"
                    });
                })
                .catch(error => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(`Erreur lors de la création de la promotion [${error.response.status}]`, {
                            variant: "error"
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleDeleteConfirm = () => {
        if (detailId !== null) {
            deleteDiscount(detailId)
                .then(() => {
                    enqueueSnackbar("Code supprimé avec succès !", {
                        variant: "success"
                    });
                    handleCloseModal();
                })
                .catch(error => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(`Erreur lors de la suppression de la promotion [${error.response.status}]`, {
                            variant: "error"
                        });
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
                <Suspense fallback={<div></div>}>
                    <ConfirmButton label={"Supprimer"} onConfirm={handleDeleteConfirm}/>
                </Suspense>
            );
        } else {
            return null;
        }
    };

    const discountType = (productId: number | string) => {
        return productId ? setDiscountTypeValues(DiscountTypeWithProductValues) : setDiscountTypeValues(DiscountTypeValues);
    };

    return (
        <Modal open={true} onClose={handleCloseModal}>
            <Box sx={styles.modalStyle}>
                <Box sx={styles.header}>
                    <Box flexGrow={1}>
                        <h1>Discount</h1>
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
                                <Suspense fallback={<div></div>}>
                                    <StringInput
                                        name={"code"}
                                        label={"Code"}
                                        editable
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <SelectInput
                                        name={"type"}
                                        label={"Type"}
                                        values={discountTypeValues.map((v: DiscountType) => {
                                            return {
                                                label: t(`discount-values.${v}`),
                                                value: v
                                            };
                                        })}
                                        editable
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <NumberInput
                                        name={"value"}
                                        label={"Valeur"}
                                        editable
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <BooleanInput
                                        name={"reusable"}
                                        label={"Réutilisable"}
                                        editable
                                        control={control}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <DateInput
                                        name={"expired_at"}
                                        label={"Expiration"}
                                        editable
                                        control={control}
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
                                                label: t(`status-values.${v}`),
                                                value: v
                                            };
                                        })}
                                        editable
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <SelectInput
                                        name={"product_id"}
                                        label={"Produit associé"}
                                        onFieldUpdate={discountType}
                                        values={products.map((v: any) => {
                                            return {
                                                label: v.name,
                                                value: v.id
                                            };
                                        })}
                                        editable
                                        control={control}
                                        rules={{ required: false }}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <NumberInput
                                        name={"priority"}
                                        label={"Priorité"}
                                        editable
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <DateInput
                                        name={"created_at"}
                                        label={"Date création"}
                                        control={control}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <DateInput
                                        name={"updated_at"}
                                        label={"Date modification"}
                                        control={control}
                                    />
                                </Suspense>
                            </Grid>
                        </Grid>
                        {user?.access_rights.includes(ACCESS_RIGHTS.DISCOUNTS_WRITE) && (
                            <Paper sx={styles.footer}>
                                <Button
                                    type={"submit"}
                                >
                                    Sauvegarder
                                </Button>
                                {renderDeleteButton()}
                            </Paper>
                        )}
                    </FormControl>
                </Box>
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
        right: 0
    }
};
