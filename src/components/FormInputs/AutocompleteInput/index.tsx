import {AutocompleteChangeReason} from "@mui/base/AutocompleteUnstyled/useAutocomplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {Chip, FormControl, FormHelperText} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {useController, UseControllerProps} from "react-hook-form";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export interface AutocompleteInputValue {
    key: string,
    value: any
}

interface AutocompleteInputProps extends UseControllerProps<any> {
    label?: string,
    values: AutocompleteInputValue[]
    editable?: boolean
    loading?: boolean,
    onFieldUpdate?: (value: AutocompleteInputValue[]) => void
}

export default function AutocompleteInput(props: AutocompleteInputProps) {
    const {
        values,
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

    const handleFieldUpdate = (event: React.SyntheticEvent<Element, Event>, value: AutocompleteInputValue[], reason: AutocompleteChangeReason) => {
        field.onChange(value);
        if (typeof onFieldUpdate !== "undefined") {
            onFieldUpdate(value);
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

    const isChecked = (el: AutocompleteInputValue) => {
        return (field.value ?? []).filter((v: AutocompleteInputValue) => v.key === el.key).length > 0;
    };

    if (isLoading) {
        return (
            <Skeleton variant="text" sx={{fontSize: "1rem", width: "100%"}}/>
        );
    }

    return (
        <FormControl
            sx={{width: "100%", height: 200, overflow: "auto"}}
            variant={"standard"}
            error={isInvalid}
        >
            <Autocomplete
                ref={field.ref}
                freeSolo
                onChange={handleFieldUpdate}
                onBlur={field.onBlur}
                value={field.value}
                id={field.name}
                options={values}
                multiple
                aria-describedby={`${field.name}-helper-text`}
                getOptionLabel={(option) => typeof option === "string" ? option : option.key}
                disableCloseOnSelect
                readOnly={!editable}
                suppressContentEditableWarning={true}
                renderOption={(props, option) => {
                    return (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{marginRight: 8}}
                                checked={isChecked(option)}
                            />
                            {option.key}
                        </li>
                    );
                }}
                style={{width: "100%"}}
                renderInput={(params) => (
                    <TextField
                        style={{marginTop: 10}}
                        {...params}
                        label={label}
                    />
                )}
                renderTags={(value, getTagProps) => {
                    return value.map((v, index) => {
                        return (
                            <Chip variant="filled" label={v.key} {...getTagProps({index})} />
                        );
                    });
                }}
            />
            <FormHelperText id={`${field.name}-helper-text`}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );
}

