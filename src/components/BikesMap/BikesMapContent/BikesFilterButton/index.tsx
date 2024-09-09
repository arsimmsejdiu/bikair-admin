import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import {
    BikeFilterStatus,
    BikeFilterStatusRecord,
    BikeFilterStatusValues,
    BikeStatusValues
} from "models/values/BikeStatusValues";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./style.css";
import { BikeStatusType } from "@bikairproject/shared";

type BikesFilterButtonPropsType = {
    onClick: (status: BikeStatusType[]) => void,
}

export default function BikesFilterButton (props: BikesFilterButtonPropsType) {
    const { onClick } = props;

    const [checked, setChecked] = useState<BikeFilterStatusRecord>({} as BikeFilterStatusRecord);
    const [statuses, setStatuses] = useState<BikeStatusType[]>(BikeStatusValues);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const setAllFilterValue = (value: boolean) => {
        const filterStatusSelect = {} as BikeFilterStatusRecord;
        for (const status of BikeFilterStatusValues) {
            filterStatusSelect[status] = value;
        }
        return filterStatusSelect;
    };

    useEffect(() => {
        setChecked(setAllFilterValue(true));
    }, []);

    const handleFilterSelect = (status: BikeFilterStatus) => {
        console.log(`handleFilterSelect(${status})`);
        let newFilter = { ...checked };
        let newStatuses = [...statuses];
        if (status === "ALL") {
            if (newFilter["ALL"]) {
                newFilter = setAllFilterValue(false);
                newStatuses = [];
            } else {
                newFilter = setAllFilterValue(true);
                newStatuses = [...BikeStatusValues];
            }
        } else {
            const indexStatus = newStatuses.indexOf(status);
            console.log("indexStatus = ", indexStatus);
            newFilter[status] = !newFilter[status];
            if (indexStatus !== -1) {
                newStatuses.splice(indexStatus, 1);
            } else {
                newStatuses.push(status);
            }
            if (newStatuses.length === BikeStatusValues.length) {
                newFilter["ALL"] = true;
            } else {
                newFilter["ALL"] = false;
            }
        }
        console.log("newStatuses : ", newStatuses);
        console.log("newFilter : ", newFilter);
        onClick(newStatuses);
        setChecked(newFilter);
        setStatuses(newStatuses);
    };

    const renderIcon = () => {
        if (checked["ALL"]) {
            return <FilterAltOffIcon sx={{ fontSize: 33 }}/>;
        } else {
            return <FilterAltIcon sx={{ fontSize: 33 }}/>;
        }
    };

    return (
        <Box>
            <Box className="app-map-controls" sx={{ backgroundColor: "#FDC556" }}>
                <IconButton
                    onClick={handleClick}
                    aria-label="filter-bikes-control-button"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    {renderIcon()}
                </IconButton>
            </Box>
            <Menu
                id="menu-bikes-filter"
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
                <Box className="statuses-filter-element-list">
                    {BikeFilterStatusValues.map((status, index) => (
                        <FormControlLabel
                            key={index}
                            label={t(`bike.status.${status}`)}
                            control={
                                <Checkbox
                                    checked={checked[status]}
                                    onChange={() => handleFilterSelect(status)}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            }
                        />
                    ))}
                </Box>
            </Menu>
        </Box>
    );
}
