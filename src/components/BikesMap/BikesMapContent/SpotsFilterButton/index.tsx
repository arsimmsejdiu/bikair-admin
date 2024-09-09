import {Box, IconButton} from "@mui/material";
import {LocationOffIcon, LocationOnIcon} from "assets";
import * as React from "react";
import { useState } from "react";

import "./style.css";

type SpotsFilterButtonPropsType = {
    onClick: (filter: boolean) => void,
}

export default function SpotsFilterButton (props: SpotsFilterButtonPropsType) {
    const {
        onClick
    } = props;

    const [filter, setFilter] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const newValue = !filter;
        setFilter(newValue);
        onClick(newValue);
    };

    const renderIcon = () => {
        if (filter) {
            return <LocationOnIcon sx={{ fontSize: 33 }}/>;
        } else {
            return <LocationOffIcon sx={{ fontSize: 33 }}/>;
        }
    };

    return (
        <Box className="app-map-controls" sx={{ backgroundColor: "#1BCE8A" }}>
            <IconButton onClick={handleClick} aria-label="filter-spot-control-button">
                {renderIcon()}
            </IconButton>
        </Box>
    );
}
