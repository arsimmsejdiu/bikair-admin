import CheckIcon from "@mui/icons-material/Check";
import LayersIcon from "@mui/icons-material/Layers";
import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import { LayerStatusValues } from "models/values/LayerStatusValues";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { LayerStatusType } from "@bikairproject/shared";

type LayersButtonPropsType = {
    onClick: (status: LayerStatusType) => void,
}

export default function LayersButton (props: LayersButtonPropsType) {
    const { onClick } = props;

    const [filter, setFilter] = useState<LayerStatusType>("BIKES");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterSelect = (status: LayerStatusType) => () => {
        setFilter(status);
        handleClose();
        onClick(status);
    };

    const renderMenuItem = (status: LayerStatusType) => {
        if (status === filter) {
            return (
                <MenuItem
                    key={`filter-layer-menu-item-${status}`}
                    onClick={handleFilterSelect(status)}
                >
                    <CheckIcon/>
                    {t(`layer-status.${status}`)}
                </MenuItem>
            );
        } else {
            return (
                <MenuItem
                    key={`filter-layer-menu-item-${status}`}
                    onClick={handleFilterSelect(status)}
                >
                    {t(`layer-status.${status}`)}
                </MenuItem>
            );
        }
    };

    return (
        <Box>
            <Box className="app-map-controls" sx={{ backgroundColor: "#f1f1f1" }}>
                <IconButton
                    onClick={handleClick}
                    aria-label="filter-layer-control-button"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <LayersIcon sx={{ fontSize: 33 }}/>
                </IconButton>
            </Box>
            <Menu
                id="menu-layer-filter"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                keepMounted
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {LayerStatusValues.map(status => renderMenuItem(status))}
            </Menu>
        </Box>
    );
}
