import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    FormControl,
    Grid, Unstable_Grid2
} from "@mui/material";
import AutocompleteInput, {AutocompleteInputValue} from "components/FormInputs/AutocompleteInput";
import DateInput from "components/FormInputs/DateInput";
import PasswordInput from "components/FormInputs/PasswordInput";
import SelectInput from "components/FormInputs/SelectInput";
import StringInput from "components/FormInputs/StringInput";
import {useAppSelector} from "hooks/useAppSelector";
import {useSnackbar} from "notistack";
import React, {memo, Suspense, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {createAdmin, getAdmin, updateAdmin} from "services/admins";

import {GetAdminOutput, PostAdminsInput, PutAdminsInput, ROLES} from "@bikairproject/shared";

interface AdminForm extends GetAdminOutput {
    city_names_data: AutocompleteInputValue[],
    role_name: string | null
}

const AccountProfileDetails = () => {
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
        if (user) {
            const intAdminId = user.id;
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
            console.log("data = ", data);
            console.log("city_names_data = ", data.city_names_data);
            toSave.city_names = (data.city_names_data ?? []).map(c => c.value);
            toSave.role_id = roles.filter(r => r.name === data.role_name)[0].id;
            createAdmin(toSave)
                .then(admin => {
                    enqueueSnackbar("Admin crée avec succès !", {
                        variant: "success"
                    });

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

    return (
        <Card>
            <CardHeader
                subheader={"Les informations peuvent être modifiées"}
                title={"Profil"}
            />
            <CardContent sx={{pt: 0}}>
                <Box sx={{m: -1.5}}>
                    <Unstable_Grid2
                        container
                        spacing={3}
                    >
                        <Unstable_Grid2
                            xs={12}
                            md={6}
                            style={{
                                width: "100%"
                            }}
                        >
                            <Box style={{padding: 10}} >
                                <FormControl component="form" onSubmit={handleSubmit(handleSaveClick)}>
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
                                    <CardActions sx={{ justifyContent: "flex-end" }}>
                                        <Button type={"submit"} variant="contained">
                                            Sauvegarder
                                        </Button>
                                    </CardActions>
                                </FormControl>
                            </Box>
                        </Unstable_Grid2>
                    </Unstable_Grid2>
                </Box>
            </CardContent>
        </Card>
    );
};

export default memo(AccountProfileDetails);
