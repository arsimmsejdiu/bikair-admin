import {Grid} from "@mui/material";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";

import NumberInput from "../FormInputs/NumberInput";
import {MCCRuleRangeAge, MCCRules} from "@bikairproject/shared";

interface RangeAgeProps {
    rule?: MCCRuleRangeAge;
    onRuleChange: (rule: MCCRules) => void;
}

const RangeAge = ({rule, onRuleChange}: RangeAgeProps) => {
    const {setError, control, reset, watch, clearErrors, getValues} = useForm<MCCRuleRangeAge>();

    useEffect(() => {
        const {unsubscribe} = watch((value) => {
            const minValue = value.min === null ? null : Number(value.min);
            const maxValue = value.max === null ? null : Number(value.max);
            if (minValue === null && maxValue === null) {
                setError("min", {type: "required", message: "Veuillez renseigner au moins un champs"});
                setError("max", {type: "required", message: "Veuillez renseigner au moins un champs"});
            } else {
                clearErrors("min");
                clearErrors("max");
            }
            onRuleChange({
                type: "RANGE_AGE",
                min: value.min,
                max: value.max
            } as MCCRuleRangeAge);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (getValues("type") !== rule?.type || getValues("min") !== rule?.min || getValues("max") !== rule?.max) {
            reset({
                type: rule?.type ?? "RANGE_AGE",
                min: rule?.min ?? 18,
                max: rule?.max ?? 30
            });
        }
    }, [rule]);

    return (
        <Grid item xs={12} md={6}>
            <NumberInput name={"min"} label={"Age Minimum"} control={control} editable/>
            <NumberInput name={"max"} label={"Age Maximum"} control={control} editable/>
        </Grid>
    );
};

export default RangeAge;
