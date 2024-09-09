import MultiSelectInput from "components/FormInputs/MultiSelectInput";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { arraysEqual } from "services/utils";

const ruleValues = [
    {
        key: "marketing.values.RANGE_AGE",
        value: "RANGE_AGE"
    },
    {
        key: "marketing.values.CITY_SELECT",
        value: "CITY_SELECT"
    },
    {
        key: "marketing.values.LAST_TRIP_PERIOD",
        value: "LAST_TRIP_PERIOD"
    }
];

interface RuleMultiSelectProps {
    value: string[];
    onValueChange?: (selection: string[]) => void;
}

const RuleMultiSelect = ({
    value,
    onValueChange
}: RuleMultiSelectProps) => {
    const {
        control,
        reset,
        watch,
        getValues
    } = useForm<{ selection: string[] }>();

    useEffect(() => {
        const { unsubscribe } = watch((value) => {
            if (typeof onValueChange !== "undefined" && typeof value.selection !== "undefined") {
                onValueChange(value.selection.filter(s => typeof s === "string") as string[]);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if(!arraysEqual(getValues("selection"), value)) {
            reset({
                selection: value ?? []
            });
        }
    }, [value]);

    return (
        <MultiSelectInput
            label={"Configuration Marketing"}
            values={ruleValues}
            name={"selection"}
            control={control}
            editable
        />
    );
};

export default RuleMultiSelect;
