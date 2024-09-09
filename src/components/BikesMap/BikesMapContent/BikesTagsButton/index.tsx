import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { Box, Checkbox, FormControlLabel, IconButton, Menu } from "@mui/material";
import {
    BikeFilterTags,
    BikeFilterTagsRecord,
    BikeFilterTagsValues,
    BikeTagValues
} from "models/values/BikeTagValues";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./style.css";
import { BikeTagType } from "@bikairproject/shared";

type BikesFilterButtonPropsType = {
    onClick: (tags: BikeTagType[]) => void,
}

export default function BikesTagsButton (props: BikesFilterButtonPropsType) {
    const {
        onClick
    } = props;

    const [checked, setChecked] = useState<BikeFilterTagsRecord>({} as BikeFilterTagsRecord);
    const [tags, setTags] = useState<BikeTagType[]>(BikeTagValues);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { t } = useTranslation();

    const setAllFilterValue = (value: boolean) => {
        const filterTagsSelect = {} as BikeFilterTagsRecord;
        for (const tag of BikeFilterTagsValues) {
            filterTagsSelect[tag] = value;
        }
        return filterTagsSelect;
    };

    useEffect(() => {
        setChecked(setAllFilterValue(true));
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterSelect = (tag: BikeFilterTags) => {
        console.log("clicked on ", tag);
        let newFilter = { ...checked };
        let newTags = [...tags];
        if (tag === "ALL") {
            if (newFilter["ALL"]) {
                newFilter = setAllFilterValue(false);
                newTags = [];
            } else {
                newFilter = setAllFilterValue(true);
                newTags = [...BikeTagValues];
            }
        } else {
            const indexTag = newTags.indexOf(tag);
            newFilter[tag] = !newFilter[tag];
            if (indexTag !== -1) {
                newTags.splice(indexTag, 1);
            } else {
                newTags.push(tag);
            }
            if (newTags.length === BikeTagValues.length) {
                newFilter["ALL"] = true;
            } else {
                newFilter["ALL"] = false;
            }
        }
        console.log("newTags : ", newTags);
        console.log("newFilter : ", newFilter);
        onClick(newTags);
        setChecked(newFilter);
        setTags(newTags);
    };

    const renderIcon = () => {
        if (checked["ALL"]) {
            return <LocalOfferOutlinedIcon sx={{ fontSize: 33 }}/>;
        } else {
            return <LocalOfferIcon sx={{ fontSize: 33 }}/>;
        }
    };

    return (
        <Box>
            <Box className="app-map-controls" sx={{ backgroundColor: "#277cc2" }}>
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
                <Box className="tags-filter-element-list">
                    {BikeFilterTagsValues.map(tag => (
                        <FormControlLabel
                            key={tag}
                            label={t(`bike.tags.${tag}`)}
                            control={
                                <Checkbox
                                    checked={checked[tag]}
                                    onChange={() => handleFilterSelect(tag)}
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
