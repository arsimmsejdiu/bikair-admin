import {FormControl, FormHelperText, TextField} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import React, {useEffect, useState} from "react";
import {useController, UseControllerProps} from "react-hook-form";

import "./style.css";
import {DateUtils} from "@bikairproject/utils";

interface DateInputProps extends UseControllerProps<any> {
    label?: string,
    editable?: boolean,

    loading?: boolean,
    onFieldUpdate?: (value: string | null) => void
}

export default function DateInput(props: DateInputProps) {
    const {
        label,
        editable,
        loading,
        onFieldUpdate,
        control
    } = props;
    const {
        field,
        fieldState,
    } = useController(props);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [helperText, setHelperText] = useState("");
    console.log(control);

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
        console.log("handleFieldUpdate");
        let newDateSting;
        try {
            newDateSting = newDate ? DateUtils.dateToString(newDate) : null;
        } catch (error) {
            newDateSting = null;
        }
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
        console.log("field : ", field.name);
        console.log("getvalue : ", field.value);
        if(typeof field.value === "undefined" || field.value === null) {
            return "";
        }
        try {
            return DateUtils.databaseDateSerializedToDate(field.value);
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    if (isLoading) {
        return (
            <Skeleton variant="text" sx={{fontSize: "1rem", width: "100%"}}/>
        );
    }

    return (
        <FormControl sx={{width: "100%"}}
        >
            <DatePicker
                label={label}
                inputFormat="dd/MM/yyyy"
                onChange={handleFieldUpdate}
                value={getValue() ?? ""}
                readOnly={!editable}
                renderInput={(props) => (
                    <TextField
                        {...props}
                        ref={field.ref}
                        id={field.name}
                        onBlur={field.onBlur}
                        name={field.name}
                        value={getValue() ?? ""}
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
