import {EmojiEmotionsOutlined} from "@mui/icons-material";
import {FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import EmojiPicker from "emoji-picker-react";
import React, {memo,useEffect, useRef, useState} from "react";
import {useController, UseControllerProps} from "react-hook-form";

import "./style.css";

interface StringInputProps extends UseControllerProps<any> {
    label?: string,
    editable?: boolean,
    emoji?: boolean,
    loading?: boolean,
    onFieldUpdate?: (value: any) => void
}

const StringInput = (props: StringInputProps) => {
    const {
        label,
        editable,
        emoji,
        loading,
        onFieldUpdate
    } = props;
    const {
        field,
        fieldState,
    } = useController(props);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const pickerRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        document.addEventListener("mousedown", (event: any) => {
            if (pickerRef?.current && !pickerRef?.current.contains(event.target)) {
                setShowEmojis(false);
            }
        });
    }, []);

    const handleFieldUpdate = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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

    const addEmoji = (e: any) => {
        const sym = e.unified.split("-");
        const codesArray: any[] = [];
        sym.forEach((el: any) => codesArray.push("0x" + el));
        const emoji = String.fromCodePoint(...codesArray);
        field.onChange(`${field.value}${emoji}`);
    };

    if (isLoading) {
        return (
            <Skeleton variant="text" sx={{fontSize: "1rem", width: "100%"}}/>
        );
    }

    return (
        <FormControl sx={{width: "100%"}}
            variant={"standard"}
            error={isInvalid}
        >
            <Stack direction={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <InputLabel error={isInvalid} htmlFor={field.name}>{label || field.name}</InputLabel>
                <Input
                    ref={field.ref}
                    onChange={handleFieldUpdate}
                    onBlur={field.onBlur}
                    value={field.value || ""}
                    name={field.name}
                    id={field.name}
                    fullWidth
                    type={"text"}
                    readOnly={!editable}
                    aria-describedby={`${field.name}-helper-text`}
                />
                {
                    emoji && (
                        <InputAdornment position={"end"}>
                            <IconButton onClick={() => setShowEmojis(!showEmojis)}>
                                <EmojiEmotionsOutlined/>
                            </IconButton>
                            {showEmojis && (
                                <div ref={pickerRef} style={{position: "absolute", top: 50, right: 10, zIndex: 10}}>
                                    <EmojiPicker lazyLoadEmojis={true} onEmojiClick={addEmoji}/>
                                </div>
                            )}
                        </InputAdornment>
                    )
                }
            </Stack>

            <FormHelperText id={`${field.name}-helper-text`}>
                {helperText}
            </FormHelperText>
        </FormControl>
    );

};

export default memo(StringInput);
