import CloseIcon from "@mui/icons-material/Close";
import {Button, FormControl, Grid, IconButton, Modal, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import ConfirmButton from "components/ConfirmButton";
import AutocompleteInput, {AutocompleteInputValue} from "components/FormInputs/AutocompleteInput";
import DateInput from "components/FormInputs/DateInput";
import StringInput from "components/FormInputs/StringInput";
import LoadingOverlay from "components/LoadingOverlay";
import {useAppSelector} from "hooks/useAppSelector";
import {useSnackbar} from "notistack";
import React, {memo,useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {createRole, deleteRole, getRole, updateRole} from "services/roles";

import {ACCESS_RIGHTS, Roles, RolesCreate, RolesUpdate} from "@bikairproject/shared";

interface RolesForm extends Roles {
    access_right_data: AutocompleteInputValue[]
}

const RolesDetailsScreen = () => {
    const {role_id} = useParams();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const accessRights = useAppSelector((state) => state.global.accessRights);
    const user = useAppSelector(state => state.global.me);
    const [loading, setLoading] = useState(false);
    const [detailId, setDetailId] = useState<number | null>(null);

    useEffect(() => {
        if (typeof role_id !== "undefined" && role_id !== null && role_id !== "new") {
            const intRoleId = parseInt(role_id);
            setDetailId(intRoleId);
            handleGetData(intRoleId);
        }
    }, [role_id]);

    const {
        handleSubmit,
        control,
        reset
    } = useForm<RolesForm>();

    const handleGetData = async (roleId: number) => {
        setLoading(true);
        try {
            const roleDetails = await getRole(roleId);
            if (roleDetails) {
                const multiSelectAccessRight = (roleDetails.access_rights ?? []).map(ar => {
                    return {key: ar, value: ar};
                });
                const _role: RolesForm = {
                    id: roleDetails.id,
                    name: roleDetails.name,
                    description: roleDetails.description,
                    active: roleDetails.active,
                    access_rights: roleDetails.access_rights,
                    access_right_data: multiSelectAccessRight,
                    created_at: roleDetails.created_at,
                    updated_at: roleDetails.updated_at,
                };
                reset(_role);
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

    const handleSaveClick: SubmitHandler<RolesForm> = (data, e) => {
        setLoading(true);
        if (detailId === null) {
            const toSave = Object.assign({}, data) as RolesCreate;
            toSave.access_rights = data.access_right_data.map(ard => ard.value);
            createRole(toSave)
                .then(() => {
                    enqueueSnackbar("Role modifié avec succès !", {
                        variant: "success",
                    });
                })
                .catch((error) => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(
                            `Erreur lors de la création du role [${error.response.status}]`,
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
            const toSave = Object.assign({}, data) as RolesUpdate;
            toSave.id = detailId;
            toSave.access_rights = data.access_right_data.map(ard => ard.value);
            updateRole(toSave).then(() => {
                enqueueSnackbar("Role modifié avec succès !", {
                    variant: "success"
                });
            }).catch(error => {
                if (error.response.status !== 401) {
                    enqueueSnackbar(`Erreur lors de la création du Role [${error.response.status}]`, {
                        variant: "error"
                    });
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    const handleCloseModal = () => {
        navigate("..");
    };

    const handleDeleteConfirm = () => {
        if (detailId !== null) {
            deleteRole(detailId)
                .then(() => {
                    enqueueSnackbar("Role supprimé avec succès !", {
                        variant: "success"
                    });
                    handleCloseModal();
                })
                .catch(error => {
                    if (error.response.status !== 401) {
                        enqueueSnackbar(`Erreur lors de la création du Role [${error.response.status}]`, {
                            variant: "error"
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
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

    return (
        <Modal open={true} onClose={handleCloseModal}>
            <Box sx={styles.modalStyle}>
                <Box sx={styles.header}>
                    <Box flexGrow={1}>
                        <h1>Role</h1>
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
                    }
                }}>
                    <FormControl style={{width: "95%"}} component="form" onSubmit={handleSubmit(handleSaveClick)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <StringInput
                                    name={"name"}
                                    label={"Nom"}
                                    control={control}
                                    editable
                                    loading={loading}
                                    rules={{required: true}}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StringInput
                                    name={"active"}
                                    label={"Actif"}
                                    editable
                                    loading={loading}
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <StringInput
                                    name={"description"}
                                    label={"Description"}
                                    editable
                                    loading={loading}
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <AutocompleteInput
                                    name={"access_right_data"}
                                    label={"Access Right"}
                                    values={accessRights.map(c => {
                                        return {
                                            key: c.name ?? "",
                                            value: c.name ?? ""
                                        };
                                    })}
                                    loading={loading}
                                    control={control}
                                    editable
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DateInput
                                    name={"created_at"}
                                    label={"Date création"}
                                    loading={loading}
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DateInput
                                    name={"updated_at"}
                                    label={"Date modification"}
                                    loading={loading}
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                        {user?.access_rights.includes(ACCESS_RIGHTS.RATES_WRITE) && (
                            <Paper sx={styles.footer}>
                                <Button type={"submit"} disabled={loading}>Sauvegarder</Button>
                                {renderDeleteButton()}
                            </Paper>
                        )}
                    </FormControl>
                </Box>
                <LoadingOverlay open={loading}/>
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
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
    },
    bikeName: {
        marginLeft: "10px",
        marginRight: "10px",
        padding: "10px",
        backgroundColor: "#e0dfdf",
        borderRadius: "5px",
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


export default memo(RolesDetailsScreen);
