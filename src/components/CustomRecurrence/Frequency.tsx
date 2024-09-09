import {Switch} from "@mui/material";
import React from "react";

import {useStylesFrequency} from "./CustomStyles";

const Frequency = ({repetition, setRepetition}: any) => {
    const classes = useStylesFrequency();

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepetition(event.target.checked);
    };

    return (
        <div className={classes.frequency}>
            <header className={classes.repeatText}>Répétition</header>
            <Switch checked={repetition} onChange={handleCheckChange}/>
        </div>
    );
};

export default Frequency;
