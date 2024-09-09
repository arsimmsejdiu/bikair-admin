import TextField from "@mui/material/TextField";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import React, { useEffect, useState } from "react";

import "./Weekdays.css";
import {useStylesWeekDays} from "./CustomStyles";

interface HourPickerProps {
    hours: number,
    minutes: number,
    onChange: (hours: number, minutes: number) => void
}

const HourPicker = ({hours, minutes, onChange}: HourPickerProps) => {
    const classes = useStylesWeekDays();
    const [value, setValue] = useState(new Date());
    // console.log("Time Picker --> ", value);

    useEffect(() => {
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        setValue(date);
    }, [hours, minutes]);

    const handleChange = (newValue: Date | null) => {
        if(newValue) {
            const hour = newValue.getHours();
            const minute = newValue.getMinutes();
            onChange(hour, minute);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={classes.toggleContainer}>
                <header className={classes.header}>Hour</header>
                <TimePicker
                    label="Temps"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
        </LocalizationProvider>
    );
};

export default HourPicker;
