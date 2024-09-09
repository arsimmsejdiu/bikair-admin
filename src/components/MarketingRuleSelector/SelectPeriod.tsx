import { Grid } from "@mui/material";
import NumberInput from "components/FormInputs/NumberInput";
import SelectInput from "components/FormInputs/SelectInput";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { MCCRuleLastTripPeriod, MCCRules } from "@bikairproject/shared";

const periodSelectValues = [
    {
        label: "marketing.values.before",
        value: "BEFORE"
    },
    {
        label: "marketing.values.after",
        value: "AFTER"
    }
];

interface SelectPeriodProps {
    rule: MCCRuleLastTripPeriod;
    onRuleChange: (rule: MCCRules) => void;
}

const SelectPeriod = ({
    rule,
    onRuleChange
}: SelectPeriodProps) => {
    const [isBefore, setIsBefore] = useState(true);
    const {
        setError,
        control,
        reset,
        watch,
        clearErrors,
        getValues
    } = useForm<MCCRuleLastTripPeriod>();

    useEffect(() => {
        const { unsubscribe } = watch((value) => {
            const durationValue = value.duration === null ? null : Number(value.duration);
            if (durationValue === null) {
                setError("duration", {
                    type: "required",
                    message: "Veuillez renseigner au moins un jour"
                });
            } else {
                clearErrors("duration");
            }
            onRuleChange({
                type: "LAST_TRIP_PERIOD",
                period: value.period,
                duration: value.duration
            } as MCCRuleLastTripPeriod);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (getValues("type") !== rule?.type || getValues("period") !== rule?.period || getValues("duration") !== rule?.duration) {
            reset({
                type: rule?.type ?? "LAST_TRIP_PERIOD",
                period: rule?.period ?? "BEFORE",
                duration: rule?.duration ?? 30
            });
        }
        const newIsBefore = (rule?.period ?? "BEFORE") === "BEFORE";
        if (isBefore !== newIsBefore) {
            setIsBefore(newIsBefore);
        }
    }, [rule]);

    return (
        <Grid item xs={12} md={6}>
            <SelectInput
                name={"period"}
                values={periodSelectValues}
                control={control}
                editable
            />
            <NumberInput
                name={"duration"}
                label={`Dernier trajet ${isBefore ? "avant" : "après"} tant de jours`}
                control={control}
                editable
            />
        </Grid>

    );
};

export default SelectPeriod;
