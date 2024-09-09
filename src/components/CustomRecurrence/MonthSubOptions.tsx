import { FormControl, Select } from "@mui/material";
import React, { useState } from "react";

import {useStylesMonthOptions} from "./CustomStyles";

const MonthSubOptions = () => {
    const classes = useStylesMonthOptions();
    const [subOption, setSubOption] = useState("days");
    const handleSubOptionChange = (e: any) => {
        setSubOption(e.target.value);
    };

    const dateTime = new Date();
    const day = dateTime.getDate();

    return (
        <FormControl>
            <Select
                size="small"
                variant="filled"
                native
                value={subOption}
                onChange={handleSubOptionChange}
                className={classes.SelectSubOption}
            >
                <option value="day">Monthly on the day {day}</option>
                <option value="second-saturday">Monthly on the second Saturday</option>
            </Select>
        </FormControl>
    );
};

export default MonthSubOptions;
