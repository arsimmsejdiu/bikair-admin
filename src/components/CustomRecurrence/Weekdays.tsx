import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";

import "./Weekdays.css";
import { useStylesWeekDays } from "./CustomStyles";

interface WeekdaysProps {
    value: string[],
    onChange: (value: string[]) => void
}

const Weekdays = ({
    value,
    onChange
}: WeekdaysProps) => {
    const classes = useStylesWeekDays();
    const [formats, setFormats] = useState<string[]>(value);

    const handleFormat = (_event: React.MouseEvent<HTMLElement>, updatedFormat: string[]) => {
        onChange(updatedFormat);
    };

    useEffect(() => {
        setFormats(value);
    }, [value]);

    return (
        <div className={classes.toggleContainer}>
            <header className={classes.header}>Répéter le</header>
            <p className={classes.header}>{!formats ? "You must select week days" : null}</p>
            <ToggleButtonGroup
                className={classes.root}
                color="primary"
                value={formats}
                onChange={handleFormat}
                size="small"
                aria-label={"Jour de semain"}
            >
                <ToggleButton style={{
                    width: 25,
                    height: 25
                }} value="MON" aria-label={"Lundi"}>L</ToggleButton>
                <ToggleButton style={{
                    width: 25,
                    height: 25
                }} value="THU" aria-label={"Mardi"}>M</ToggleButton>
                <ToggleButton style={{
                    width: 25,
                    height: 25
                }} value="WED" aria-label={"Mercredi"}>M</ToggleButton>
                <ToggleButton style={{
                    width: 25,
                    height: 25
                }} value="TUE" aria-label={"Jeudi"}>J</ToggleButton>
                <ToggleButton style={{
                    width: 25,
                    height: 25
                }} value="FRI" aria-label={"Vendredi"}>V</ToggleButton>
                <ToggleButton style={{
                    width: 25,
                    height: 25
                }} value="SAT" aria-label={"Samedi"}>S</ToggleButton>
                <ToggleButton style={{
                    width: 25,
                    height: 25
                }} value="SUN" aria-label={"Dimanche"}>D</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default Weekdays;
