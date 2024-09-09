import { Box, Chip, FormControl, FormHelperText, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import React, { useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import {useTranslation} from "react-i18next";

import "./style.css";

interface MultiSelectInputValue {
    key: string;
    value: any;
}

interface MultiSelectInputProps extends UseControllerProps<any> {
    label?: string;
    values: MultiSelectInputValue[];
    editable?: boolean;
    loading?: boolean;
    onFieldUpdate?: (value: any) => void;
}

export default function MultiSelectInput (props: MultiSelectInputProps) {
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
    const {t, i18n} = useTranslation();
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

    const handleFieldUpdate = (event: SelectChangeEvent<string[]>) => {
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

    const getLabel = (label: string) => {
        return i18n.exists(label) ? t(label) : label;
    };

    if (isLoading) {
        return (
            <Skeleton variant="text" sx={{
                fontSize: "1rem",
                width: "100%"
            }}/>
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
                value={field.value || []}
                name={field.name}
                id={field.name}
                labelId={`${field.name}-select-label`}
                multiple
                inputProps={{
                    readOnly: !editable,
                }}
                error={isInvalid}
                aria-describedby={`${field.name}-helper-text`}
                renderValue={(selected: string[]) => (
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5
                    }}>
                        {selected.map((value) => (
                            <Chip key={value} label={getLabel(values.filter(v => v.value === value)[0].key)}/>
                        ))}
                    </Box>
                )}
            >
                {values.map((v, i) => <MenuItem key={`${field.name}-select-item-${i}`}
                    value={v.value}>{getLabel(v.key)}</MenuItem>)}
            </Select>
            <FormHelperText id={`${field.name}-helper-text`}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );

}
