import { Stack } from "@mui/material";
import { RecurenceData } from "models/dto/RecurenceData";
import React from "react";

import { Termination } from "./Ends";
import HourPicker from "./HourPicker";
import Weekdays from "./Weekdays";

interface FrequenceSubOptionsProps {
    recurenceValue: RecurenceData,
    timeEnd: number | undefined
    onRecurenceChange: (data: RecurenceData) => void,
    onTimeEndChange?: (value: number | undefined) => void;
}

const FrequencyRecurencePicker = ({
    recurenceValue,
    timeEnd,
    onRecurenceChange,
    onTimeEndChange
}: FrequenceSubOptionsProps) => {
    const handleWeekDayChange = (dayOfWeek: string[]) => {
        onRecurenceChange({
            ...recurenceValue,
            dayOfWeek: dayOfWeek
        });
    };

    const handleHourChange = (hour: number, minute: number) => {
        onRecurenceChange({
            ...recurenceValue,
            hour: hour,
            minute: minute
        });
    };

    return (
        <Stack spacing={1}>
            <div>
                <Weekdays
                    value={recurenceValue.dayOfWeek}
                    onChange={handleWeekDayChange}
                />
                <HourPicker
                    hours={recurenceValue.hour}
                    minutes={recurenceValue.minute}
                    onChange={handleHourChange}
                />
                <Termination
                    value={timeEnd}
                    onTimeEndChange={onTimeEndChange}
                />
            </div>
        </Stack>
    );
};

export default FrequencyRecurencePicker;
