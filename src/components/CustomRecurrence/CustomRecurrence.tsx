import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";

import { RecurenceData } from "../../models/dto/RecurenceData";
import ActionButtons from "./ActionButton";
import { useStylesCustomRecurrence } from "./CustomStyles";
import Frequency from "./Frequency";
import FrequencyDatePicker from "./FrequencyDatePicker";
import FrequencyRecurencePicker from "./FrequencyRecurencePicker";

interface CustomRecurrenceProps {
    recurenceValue: RecurenceData,
    timeEnd: number | undefined
    onClose?: () => void,
    onRecurenceChange?: (value: RecurenceData) => void;
    onTimeEndChange?: (value: number | undefined) => void;
}

const CustomRecurrence = ({
    recurenceValue,
    timeEnd,
    onClose,
    onRecurenceChange,
    onTimeEndChange
}: CustomRecurrenceProps) => {
    const classes = useStylesCustomRecurrence();
    const [repetition, setRepetition] = useState(false);
    const [recurenceDataRepeat, setRecurenceDataRepeat] = useState<RecurenceData>(recurenceValue);
    const [recurenceDataNotRepeat, setRecurenceDataNotRepeat] = useState<RecurenceData>(recurenceValue);
    const [backupRecurenceData, setBackupRecurenceData] = useState(recurenceValue);
    const [newTimeEnd, setNewTimeEnd] = useState(timeEnd);
    const [backupTimeEnd, setBackupTimeEnd] = useState(timeEnd);

    const handleSubmit = () => {
        if(typeof onRecurenceChange !== "undefined") {
            if(repetition) {
                onRecurenceChange(recurenceDataRepeat);
            } else {
                onRecurenceChange(recurenceDataNotRepeat);
            }
        }
        if(typeof onTimeEndChange !== "undefined") {
            onTimeEndChange(newTimeEnd);
        }
        if(typeof onClose !== "undefined") {
            onClose();
        }
    };

    const handleCancel = () => {
        if(typeof onClose !== "undefined") {
            onClose();
        }
        resetRecurenceData(backupRecurenceData);
        setNewTimeEnd(backupTimeEnd);
    };

    const handleTimeEndChange = (value: number | undefined) => {
        setNewTimeEnd(value);
    };

    const handleRecurenceChange = (value: RecurenceData) => {
        setRecurenceData(value);
    };

    const handleRepetitionChange = (value: boolean) => {
        setRepetition(value);
    };

    const setRecurenceData = (value: RecurenceData) => {
        if(value.repetition) {
            setRecurenceDataRepeat({ ...value });
        } else {
            setRecurenceDataNotRepeat({ ...value });
        }
    };

    const resetRecurenceData = (value: RecurenceData) => {
        let newRecurenceDataRepeat: RecurenceData;
        let newRecurenceDataNotRepeat: RecurenceData;
        if (value.repetition) {
            newRecurenceDataRepeat = { ...value };
            newRecurenceDataNotRepeat = {
                repetition: false,
                dayOfWeek: [],
                year: 2023,
                month: "JAN",
                dayOfMonth: 1,
                hour: 12,
                minute: 30
            };
        } else {
            newRecurenceDataNotRepeat = { ...value };
            newRecurenceDataRepeat = {
                repetition: true,
                dayOfWeek: [],
                year: null,
                month: null,
                dayOfMonth: null,
                hour: 12,
                minute: 30
            };
        }
        setRecurenceDataRepeat(newRecurenceDataRepeat);
        setRecurenceDataNotRepeat(newRecurenceDataNotRepeat);
        setRepetition(value.repetition);
    };

    useEffect(() => {
        setBackupRecurenceData(recurenceValue);
        resetRecurenceData(recurenceValue);
    }, [recurenceValue]);

    useEffect(() => {
        setBackupTimeEnd(timeEnd);
        setNewTimeEnd(timeEnd);
    }, [timeEnd]);

    return (
        <Card className={classes.card}>
            <header className={classes.header}> Récurrence personnalisée</header>
            <Frequency repetition={repetition} setRepetition={handleRepetitionChange}/>
            {
                repetition ?
                    <FrequencyRecurencePicker
                        recurenceValue={recurenceDataRepeat}
                        timeEnd={newTimeEnd}
                        onRecurenceChange={handleRecurenceChange}
                        onTimeEndChange={handleTimeEndChange}
                    />
                    :
                    <FrequencyDatePicker
                        recurenceValue={recurenceDataNotRepeat}
                        onRecurenceChange={handleRecurenceChange}
                    />
            }
            <ActionButtons onCancel={handleCancel} onSubmit={handleSubmit}/>
        </Card>
    );
};

export default CustomRecurrence;
