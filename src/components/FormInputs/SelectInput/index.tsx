import { FormControl, FormHelperText, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import React, { memo,useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { useTranslation } from "react-i18next";

import "./style.css";

interface SelectInputProps extends UseControllerProps<any> {
    label?: string,
    values: Array<{ value: string, label: string }>,
    editable?: boolean,
    loading?: boolean,
    onFieldUpdate?: (value: string) => void
}

const SelectInput = (props: SelectInputProps) => {
    const {
        label,
        values,
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
    const {t, i18n} = useTranslation();

    useEffect(() => {
        setIsInvalid(typeof fieldState.error !== "undefined");
        setHelperText(getHelperText());
    }, [fieldState]);

    useEffect(() => {
        if(typeof loading !== "undefined") {
            setIsLoading(loading);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    const handleFieldUpdate = (event: SelectChangeEvent) => {
        field.onChange(event.target.value);
        if (typeof onFieldUpdate !== "undefined") {
            onFieldUpdate(event.target.value);
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

    if(isLoading) {
        return (
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        );
    }

    return (
        <FormControl
            sx={{ width: "100%" }}
            variant={"standard"}
            error={isInvalid}
        >
            <InputLabel error={isInvalid} htmlFor={field.name}>{label || field.name}</InputLabel>
            <Select
                ref={field.ref}
                onChange={handleFieldUpdate}
                onBlur={field.onBlur}
                value={field.value ?? ""}
                name={field.name}
                id={field.name}
                labelId={`${field.name}-select-label`}
                label={label ?? ""}
                variant={"standard"}
                inputProps={{
                    readOnly: !editable,
                }}
                error={isInvalid}
                aria-describedby={`${field.name}-helper-text`}
            >
                {(values ?? []).map((v, i) => {
                    return (
                        <MenuItem key={`${field.name}-select-item-${i}`} value={v.value}>
                            {i18n.exists(v.label) ? t(v.label) : v.label}
                        </MenuItem>
                    );
                })}
            </Select>
            <FormHelperText id={`${field.name}-helper-text`}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );

};

export default memo(SelectInput);
