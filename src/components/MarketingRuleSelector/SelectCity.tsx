import {Grid} from "@mui/material";
import AutocompleteInput, {AutocompleteInputValue} from "components/FormInputs/AutocompleteInput";
import {useAppSelector} from "hooks/useAppSelector";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {arraysEqual} from "services/utils";

import {MCCRuleCitySelect, MCCRules} from "@bikairproject/shared";

interface SelectCityProps {
    rule?: MCCRuleCitySelect;
    onRuleChange: (rule: MCCRules) => void;
}

interface MCCRuleCitySelectForm extends MCCRuleCitySelect {
    cities_data: AutocompleteInputValue[]
}

const SelectCity = ({rule, onRuleChange}: SelectCityProps) => {
    const cities = useAppSelector((state) => state.global.cities);
    const {
        setError,
        control,
        reset,
        watch,
        clearErrors,
        getValues
    } = useForm<MCCRuleCitySelectForm>();

    const getCitiesSelect = (citiyIds: number[]) => {
        return cities
            .filter(c => citiyIds.includes(c.id))
            .map(c => {
                return {
                    key: c.name ?? "",
                    value: c.id ?? 0
                };
            });
    };

    useEffect(() => {
        const {unsubscribe} = watch((value) => {
            if ((value.cities_data ?? []).length === 0) {
                setError("cities", {type: "required", message: "Veuillez renseigner au moins une ville"});
            } else {
                clearErrors("cities");
            }
            onRuleChange({
                type: "CITY_SELECT",
                cities: (value.cities_data ?? []).map(c => c?.value ?? 0)
            } as MCCRuleCitySelectForm);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (getValues("type") !== rule?.type || !arraysEqual(getValues("cities_data").map(c => c?.value ?? 0), rule?.cities)) {
            reset({
                type: rule?.type ?? "CITY_SELECT",
                cities_data: getCitiesSelect(rule?.cities ?? []),
            });
        }
    }, [rule]);

    return (
        <Grid item xs={12} md={6}>
            <AutocompleteInput
                name={"cities_data"}
                label={"Villes"}
                values={cities.map(c => {
                    return {
                        key: c.name ?? "",
                        value: c.id ?? 0
                    };
                })}
                control={control}
                editable
            />
        </Grid>
    );
};

export default SelectCity;
