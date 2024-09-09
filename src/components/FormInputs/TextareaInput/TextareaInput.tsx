import {EmojiEmotionsOutlined} from "@mui/icons-material";
import {FormControl, FormHelperText, IconButton, InputAdornment, TextareaAutosize} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import EmojiPicker from "emoji-picker-react";
import React, {useEffect, useRef, useState} from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface TextareaInputProps extends UseControllerProps<any> {
    maxChar?: number,
    minRows?: number,
    placeholder?: string,
    emoji?: boolean,
    editable?: boolean,
    loading?: boolean,
    onFieldUpdate?: (value: any) => void
}

export default function TextareaInput (props: TextareaInputProps) {
    const {
        editable,
        loading,
        onFieldUpdate,
        placeholder,
        maxChar,
        minRows,
        emoji
    } = props;
    const {
        field,
        fieldState
    } = useController(props);

    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [helperText, setHelperText] = useState<string>("");
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
            if(pickerRef?.current && !pickerRef.current.contains(event.target)) {
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
            <Skeleton variant="rounded" sx={{
                height: `${minRows ?? 3}rem`,
                width: "100%"
            }}/>
        );
    }

    return (
        <FormControl sx={{ width: "100%" }} variant={"standard"} error={isInvalid}>
            <Stack direction={"row"} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <TextareaAutosize
                    ref={field.ref}
                    onChange={handleFieldUpdate}
                    onBlur={field.onBlur}
                    required={true}
                    value={field.value || ""}
                    name={field.name}
                    id={field.name}
                    readOnly={!editable}
                    aria-describedby={`${field.name}-helper-text`}
                    placeholder={placeholder}
                    style={{ width: "100%", zIndex: 0, resize: "none" }}
                    maxLength={maxChar}
                    minRows={minRows}
                />
                {
                    emoji && (
                        <InputAdornment position={"end"}>
                            <IconButton onClick={() => setShowEmojis(!showEmojis)}>
                                <EmojiEmotionsOutlined />
                            </IconButton>
                            {showEmojis && (
                                <div ref={pickerRef} style={{position: "absolute", top: 60, right: 10, zIndex: 10}}>
                                    <EmojiPicker lazyLoadEmojis={true} onEmojiClick={addEmoji} />
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
}
