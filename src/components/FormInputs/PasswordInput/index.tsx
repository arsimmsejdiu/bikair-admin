import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React, { memo, useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

import "./style.css";

interface PasswordInputProps extends UseControllerProps<any> {
    label?: string,
    editable?: boolean,

    loading?: boolean,
    visibility?: boolean,
    onFieldUpdate?: (value: any) => void
}

const PasswordInput = (props: PasswordInputProps) => {
    const {
        label,
        editable,
        loading,
        visibility,
        onFieldUpdate
    } = props;
    const {
        field,
        fieldState
    } = useController(props);
    const [show, setShow] = useState(true);
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
        field.onChange(event.target.value);
        if (typeof onFieldUpdate !== "undefined") {
            onFieldUpdate(event.target.value);
        }
    };

    const handleVisibility = () => {
        setShow(show => !show);
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

    const renderEndAdornment = () => {
        return visibility ? (
            <InputAdornment position="end">
                <IconButton
                    color={isInvalid ? "error" : "primary"}
                    aria-label="toggle password visibility"
                    onClick={handleVisibility}
                    edge="end"
                >
                    {show ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                </IconButton>
            </InputAdornment>
        )
            : null;
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
                value={field.value || ""}
                name={field.name}
                id={field.name}
                fullWidth
                type={show ? "password" : "text"}
                autoComplete="current-password"
                readOnly={!editable}
                endAdornment={renderEndAdornment()}
                aria-describedby={`${field.name}-helper-text`}
            />
            <FormHelperText id={`${field.name}-helper-text`}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );

};

export default memo(PasswordInput);
