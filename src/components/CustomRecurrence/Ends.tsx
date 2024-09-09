import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useStylesEnds } from "./CustomStyles";
import { DateCard } from "./DateCard";

interface FrequenceSubOptionsProps {
    value: number | undefined;
    onTimeEndChange?: (value: number | undefined) => void;
}

export const Termination = ({
    value,
    onTimeEndChange
}: FrequenceSubOptionsProps) => {
    const classes = useStylesEnds();
    const [radioValue, setRadioValue] = useState("Never");
    const [backupDateEnd, setBackupDateEnd] = useState<number>(new Date().getTime());

    useEffect(() => {
        console.log("TimeEnd change = ", value);
        setBackupDateEnd(value ?? backupDateEnd ?? new Date().getTime());
        if(typeof value === "undefined") {
            setRadioValue("Never");
        } else {
            setRadioValue("On");
        }
    }, [value]);

    const handleRadioChange = (radio: string) => {
        console.log("handleRadioChange => ", radio);
        if (radio === "On") {
            if (typeof onTimeEndChange !== "undefined") {
                onTimeEndChange(backupDateEnd);
            }
        } else {
            if (typeof onTimeEndChange !== "undefined") {
                onTimeEndChange(undefined);
            }
        }
    };

    const handleTimeEndChange = (dateEnd: number) => {
        setBackupDateEnd(dateEnd);
        if (typeof onTimeEndChange !== "undefined") {
            onTimeEndChange(dateEnd);
        }
    };

    return (
        <form className={classes.formControl}>
            <header className={classes.header}>Fin</header>
            <RadioGroup
                aria-label="ends-radio-group"
                name="ends-radio-group"
                value={radioValue}
                onChange={event => handleRadioChange(event.target.value)}
            >
                <div className={classes.Never}>
                    <FormControlLabel value="Never" control={<Radio/>} label="Jamais"/>
                </div>

                <div className={classes.On}>
                    <FormControlLabel
                        value="On"
                        control={<Radio/>}
                        label="Le"
                    />
                    <DateCard value={backupDateEnd} isDisabled={radioValue === "Never"} onChange={handleTimeEndChange}/>
                </div>
            </RadioGroup>
        </form>
    );
};
