import {FormControl, FormHelperText, TextField} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import React, {useEffect, useState} from "react";
import {useController, UseControllerProps} from "react-hook-form";

import "./style.css";
import {DateUtils} from "@bikairproject/utils";

interface TimeInputProps extends UseControllerProps<any> {
    label?: string,
    editable?: boolean,

    loading?: boolean,
    onFieldUpdate?: (value: string | null) => void
}

export default function TimeInput(props: TimeInputProps) {
    const {
        label,
        editable,
        loading,
        onFieldUpdate
    } = props;
    const {
        field,
        fieldState
    } = useController(props);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [helperText, setHelperText] = useState("");

    useEffect(() => {
        setIsInvalid(typeof fieldState.error !== "undefined");
        setHelperText(getHelperText());
    }, [fieldState]);

    useEffect(() => {
        if (typeof loading !== "undefined") {
            setIsLoading(loading);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    const handleFieldUpdate = (newDate: Date | null) => {
        const newDateSting = newDate ? DateUtils.dateToString(newDate) : null;
        field.onChange(newDateSting);
        if (typeof onFieldUpdate !== "undefined") {
            onFieldUpdate(newDateSting);
        }
    };

    const getHelperText = () => {
        let result: string;
        switch (fieldState.error?.type) {
            case "required":
                result = "Requis";
                break;
            default:
                result = fieldState.error?.message ?? "";
                break;
        }
        return result;
    };

    const getValue = () => {
        return DateUtils.databaseDateSerializedToDate(field.value);
    };

    if (isLoading) {
        return (
            <Skeleton variant="text" sx={{fontSize: "1rem", width: "100%"}}/>
        );
    }

    return (
        <FormControl sx={{width: "100%"}}
        >
            <TimePicker
                label={label}
                value={getValue() || ""}
                onError={reason => console.error(reason)}
                onChange={handleFieldUpdate}
                readOnly={!editable}
                renderInput={(props) => (
                    <TextField
                        {...props}
                        ref={field.ref}
                        id={field.name}
                        onBlur={field.onBlur}
                        name={field.name}
                        variant={"standard"}
                        error={isInvalid}
                        aria-describedby={`${field.name}-helper-text`}
                    />
                )}
            />
            <FormHelperText id={`${field.name}-helper-text`}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );

}
