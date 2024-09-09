import { FormControl, FormControlLabel, FormHelperText, Switch } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React, { memo,useEffect, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

import "./style.css";

interface BooleanInputProps extends UseControllerProps<any> {
    label?: string,
    editable?: boolean,

    loading?: boolean,
    onFieldUpdate?: (value: any) => void
}

const BooleanInput = (props: BooleanInputProps) => {
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

    const handleFieldUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(event.target.checked);
        if (typeof onFieldUpdate !== "undefined") {
            onFieldUpdate(event.target.checked);
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
            <FormControlLabel
                value={field.value}
                control={<Switch ref={field.ref}
                    onChange={handleFieldUpdate}
                    onBlur={field.onBlur}
                    checked={field.value}
                    name={field.name}
                    id={field.name}
                    color="primary"
                    disabled={!editable}
                />}
                label={label || field.name}
                labelPlacement="start"
                aria-describedby={`${field.name}-helper-text`}
            />
            <FormHelperText id={`${field.name}-helper-text`}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );

};

export default memo(BooleanInput);

