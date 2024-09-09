import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";

interface DateCardProps {
    value?: Date | number | undefined;
    isDisabled?: boolean;
    onChange?: (value: number) => void;
}

export const DateCard = ({
    value,
    isDisabled,
    onChange
}: DateCardProps) => {
    const [date, setDate] = useState<Date | null>(null);
    console.log("Pick a date -- > ", date);

    const handleChange = (d: Date | null) => {
        if (typeof onChange !== "undefined") {
            if( d !== null) {
                onChange(d.getTime());
            }
        }
    };

    useEffect(() => {
        if (typeof value === "number") {
            setDate(new Date(value));
        } else if (typeof value === "undefined") {
            setDate(null);
        } else {
            setDate(value);
        }
    }, [value]);

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label={"Pick a date"}
                    value={date}
                    onError={reason => console.error(reason)}
                    onChange={handleChange}
                    disabled={isDisabled}
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                />
            </LocalizationProvider>
        </>
    );
};
