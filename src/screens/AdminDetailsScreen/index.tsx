import CloseIcon from "@mui/icons-material/Close";
import {Button, FormControl, Grid, IconButton, Modal, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import {useSnackbar} from "notistack";
import React, {lazy, Suspense, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

import "./style.css";

const ConfirmButton = lazy(() => import("components/ConfirmButton"));
const AutocompleteInput = lazy(() => import("components/FormInputs/AutocompleteInput"));
import {AutocompleteInputValue} from "components/FormInputs/AutocompleteInput";

const DateInput = lazy(() => import("components/FormInputs/DateInput"));
const PasswordInput = lazy(() => import("components/FormInputs/PasswordInput"));
const SelectInput = lazy(() => import("components/FormInputs/SelectInput"));
const StringInput = lazy(() => import("components/FormInputs/StringInput"));
const LoadingOverlay = lazy(() => import("components/LoadingOverlay"));
import {useAppSelector} from "hooks/useAppSelector";
import {createAdmin, deleteAdmin, getAdmin, updateAdmin} from "services/admins";

import {ACCESS_RIGHTS, GetAdminOutput, PostAdminsInput, PutAdminsInput, ROLES} from "@bikairproject/shared";

interface AdminForm extends GetAdminOutput {
    city_names_data: AutocompleteInputValue[],
    role_name: string | null
}

export default function AdminDetailsScreen() {
    const {admin_id} = useParams();
    const {
        handleSubmit,
        control,
        reset,
        formState: {dirtyFields}
    } = useForm<AdminForm>();
    const [loading, setLoading] = useState(false);
    const [detailId, setDetailId] = useState<number | null>(null);
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const citiesName = useAppSelector((state) => state.global.citiesName);
    const roles = useAppSelector(state => state.global.roles);
    const rolesName = useAppSelector(state => state.global.rolesName);
    const user = useAppSelector(state => state.global.me);

    const getCitiesSelect = (cityNames: string[]) => {
        return citiesName
            .filter(c => cityNames.includes(c))
            .map(c => {
                return {
                    key: c,
                    value: c
                };
            });
    };

    const getRoleSelect = (roleId?: number | null) => {
        const roleSelect = roles.filter(r => roleId === r.id)[0];
        if (roleSelect) {
            return roleSelect.name;
        } else {
            return null;
        }
    };

    useEffect(() => {
        if (typeof admin_id !== "undefined" && admin_id !== null && admin_id !== "new") {
            const intAdminId = parseInt(admin_id);
            setDetailId(intAdminId);
            fetchData(intAdminId);
        }
    }, [admin_id]);

    const fetchData = (detailId: number | null) => {
        setLoading(true);
        if (detailId === null) {
            reset({
                locale: "fr",
                roles: [ROLES.TECHNICIAN],
                city_names_data: [],
                role_name: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
            setLoading(false);
        } else {
            getAdmin(detailId)
                .then(admin => {
                    if (admin) {
                        const adminForm: AdminForm = {
                            ...admin,
                            city_names_data: getCitiesSelect(admin.city_names ?? []),
                            role_name: getRoleSelect(admin.role_id)
                        };
                        reset(adminForm);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error?.response?.status !== 401) {
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

    const handleSaveClick: SubmitHandler<AdminForm> = (data, e) => {
        setLoading(true);
        if (detailId === null) {
            const toSave = Object.assign({}, data) as PostAdminsInput;
            toSave.city_names = (data.city_names_data ?? []).map(c => c.value);
            toSave.role_id = roles.filter(r => r.name === data.role_name)[0].id;
            createAdmin(toSave)
                .then(admin => {
                    enqueueSnackbar("Admin crée avec succès !", {
                        variant: "success"
                    });
                    if (admin) {
                        navigate(`../${admin.id}`);
                    }

                })
                .catch(error => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(`Erreur lors de la création de l'admin [${error.response.status}]`, {
                            variant: "error"
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            const toSave = Object.assign({}, data) as PutAdminsInput;
            if (!dirtyFields.password) {
                delete toSave.password;
            }
            toSave.city_names = data.city_names_data.map(c => c.value);
            toSave.role_id = roles.filter(r => r.name === data.role_name)[0].id;
            updateAdmin(toSave)
                .then(admin => {
                    enqueueSnackbar("Admin modifié avec succès !", {
                        variant: "success"
                    });
                    if (admin) {
                        navigate(`../${admin.id}`);
                    }
                })
                .catch(error => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(`Erreur lors de la création de l'admin [${error.response.status}]`, {
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
        setLoading(true);
        if (detailId !== null) {
            deleteAdmin(detailId)
                .then(() => {
                    enqueueSnackbar("Admin supprimé avec succès !", {
                        variant: "success"
                    });
                    handleCloseModal();
                })
                .catch(error => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(`Erreur lors de la création de l'admin [${error.response.status}]`, {
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
                    <ConfirmButton
                        label={"Supprimer"}
                        onConfirm={handleDeleteConfirm}
                    />
                </Suspense>
            );
        } else {
            return null;
        }
    };

    return (
        <Modal
            open={true}
            onClose={handleCloseModal}
        >
            <Box sx={styles.modalStyle}>
                <Box sx={styles.header}>
                    <Box flexGrow={1}>
                        <h1>Admin</h1>
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
                                        name={"firstname"}
                                        label={"Prénom"}
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
                                        name={"lastname"}
                                        label={"Nom"}
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
                                        name={"username"}
                                        label={"Username"}
                                        editable
                                        loading={loading}
                                        control={control}
                                        rules={{required: true}}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <PasswordInput
                                        name={"password"}
                                        label={"Mot de passe"}
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
                                        name={"email"}
                                        label={"Couriel"}
                                        editable
                                        loading={loading}
                                        control={control}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <StringInput
                                        name={"phone"}
                                        label={"Téléphone"}
                                        editable
                                        loading={loading}
                                        control={control}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12}>
                                <Suspense fallback={<div></div>}>
                                    <SelectInput
                                        name={"role_name"}
                                        label={"Role"}
                                        values={rolesName.map(r => {
                                            return {
                                                label: r,
                                                value: r
                                            };
                                        })}
                                        editable
                                        loading={loading}
                                        control={control}
                                        rules={{
                                            required: true
                                        }}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12}>
                                <Suspense fallback={<div></div>}>
                                    <AutocompleteInput
                                        name={"city_names_data"}
                                        label={"Ville"}
                                        values={citiesName.map(v => {
                                            return {
                                                key: v,
                                                value: v
                                            };
                                        })}
                                        loading={loading}
                                        editable
                                        control={control}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <DateInput
                                        name={"created_at"}
                                        label={"Date création"}
                                        control={control}
                                        loading={loading}
                                    />
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Suspense fallback={<div></div>}>
                                    <DateInput
                                        name={"updated_at"}
                                        label={"Date modification"}
                                        control={control}
                                        loading={loading}
                                    />
                                </Suspense>
                            </Grid>
                        </Grid>
                        {user?.access_rights.includes(ACCESS_RIGHTS.ADMINS_WRITE) && (
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
        padding: "0.5rem",
        left: 0,
        right: 0
    }
};
