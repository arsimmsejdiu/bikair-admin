import DateFnsAdapter from "@date-io/date-fns";
import { Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { RecurenceData } from "models/dto/RecurenceData";
import React, { useEffect, useState } from "react";

const dateFns = new DateFnsAdapter();

const monthNames = [
    "JAN", "FEB", "MAR",
    "APR", "MAY", "JUN", "JUL",
    "AUG", "SEP", "OCT",
    "NOV", "DEC"
];

interface FrequenceSubOptionsProps {
    recurenceValue: RecurenceData,
    onRecurenceChange: (data: RecurenceData) => void,
}

const FrequencyDatePicker = ({
    recurenceValue,
    onRecurenceChange
}: FrequenceSubOptionsProps) => {
    const [date, setDate] = useState(dateFns.date());
    const [time, setTime] = useState(dateFns.date());

    const convertMonthToText = (month: number) => {
        return monthNames[month];
    };
    const convertTextToMonth = (month: string) => {
        return monthNames.indexOf(month);
    };

    const handleDateChange = (newValue: Date | null) => {
        if (newValue) {
            const day = newValue.getDate();
            const month = convertMonthToText(newValue.getMonth());
            const year = newValue.getFullYear();
            onRecurenceChange({
                ...recurenceValue,
                dayOfMonth: day,
                month: month,
                year: year
            });
        }
    };
    const handleTimeChange = (newValue: Date | null) => {
        if (newValue) {
            const hour = newValue.getHours();
            const minute = newValue.getMinutes();
            onRecurenceChange({
                ...recurenceValue,
                hour: hour,
                minute: minute,
            });
        }
    };

    useEffect(() => {
        const dateValue = new Date();
        const hourValue = new Date();

        dateValue.setDate(recurenceValue.dayOfMonth ?? 1);
        dateValue.setMonth(convertTextToMonth(recurenceValue.month ?? "JAN"));
        dateValue.setFullYear(recurenceValue.year ?? 2023);

        hourValue.setHours(recurenceValue.hour);
        hourValue.setMinutes(recurenceValue.minute);

        setDate(dateValue);
        setTime(hourValue);
    }, [recurenceValue]);

    return (
        <Stack spacing={1}>
            <div style={{ width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={2}>
                        <DatePicker
                            label={"Choisissez une date"}
                            value={date}
                            onError={reason => console.error(reason)}
                            onChange={handleDateChange}
                            readOnly={false}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                        <TimePicker
                            label={"Choisissez une heure"}
                            value={time}
                            onError={reason => console.error(reason)}
                            onChange={handleTimeChange}
                            readOnly={false}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                    </Stack>
                </LocalizationProvider>
            </div>
        </Stack>
    );
};

export default FrequencyDatePicker;
