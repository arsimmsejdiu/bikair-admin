import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React, { memo,useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

import "./style.css";

interface NumberInputProps extends UseControllerProps<any> {
    label?: string,
    editable?: boolean,

    loading?: boolean,
    onFieldUpdate?: (value: any) => void
}

const NumberInput = (props: NumberInputProps) => {
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
        if(typeof loading !== "undefined") {
            setIsLoading(loading);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    const handleFieldUpdate = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newValue = event.target.value === "" ? null : Number(event.target.value);
        field.onChange(newValue);
        if (typeof onFieldUpdate !== "undefined") {
            onFieldUpdate(newValue);
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
        <FormControl sx={{ width: "100%" }}
            variant={"standard"}
            error={isInvalid}
        >
            <InputLabel error={isInvalid} htmlFor={field.name}>{label || field.name}</InputLabel>
            <Input
                ref={field.ref}
                onChange={handleFieldUpdate}
                onBlur={field.onBlur}
                value={field.value ?? ""}
                name={field.name}
                id={field.name}
                fullWidth
                readOnly={!editable}
                type={"number"}
                inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    title: "Veuillez renseigner un nombre entier."
                }}
                aria-describedby={`${field.name}-helper-text`}
            />
            <FormHelperText id={`${field.name}-helper-text`}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );

};

export default memo(NumberInput);
