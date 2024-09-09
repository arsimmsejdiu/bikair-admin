import {Modal, Paper} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React, {useEffect, useState} from "react";

import {ButtonAtomic} from "../../Atomic/ButtonAtomic";
import {RecurenceData} from "../../models/dto/RecurenceData";
import CustomRecurrence from "./CustomRecurrence";
import {useStylesRecurringModal} from "./CustomStyles";

function getModalStyle() {
    return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    };
}

interface RecurrenceModalProps {
    recurenceData: RecurenceData,
    timeEnd: number | undefined,
    loading?: boolean,
    onRecurenceChange?: (value: RecurenceData) => void;
    onTimeEndChange?: (value: number | undefined) => void;
}

export const RecurrenceModal = (
    {
        recurenceData,
        timeEnd,
        loading,
        onRecurenceChange,
        onTimeEndChange
    }: RecurrenceModalProps) => {
    const classes = useStylesRecurringModal();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof loading !== "undefined") {
            setIsLoading(loading);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRecurenceChange = (value: RecurenceData) => {
        if (typeof onRecurenceChange !== "undefined") {
            onRecurenceChange(value);
        }
    };

    const handleTimeEndChange = (value: number | undefined) => {
        if (typeof onTimeEndChange !== "undefined") {
            onTimeEndChange(value);
        }
    };

    if (isLoading) {
        return (
            <Skeleton variant="text" sx={{fontSize: "1rem", width: "100%"}}/>
        );
    }

    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <h3 style={{marginRight: 10}}>Récurrence personnalisée:</h3>
                <ButtonAtomic variant="outlined" onClick={handleOpen}>
                    Programmer
                </ButtonAtomic>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Paper style={modalStyle} className={classes.paper}>
                    <CustomRecurrence
                        recurenceValue={recurenceData}
                        timeEnd={timeEnd}
                        onClose={handleClose}
                        onRecurenceChange={handleRecurenceChange}
                        onTimeEndChange={handleTimeEndChange}
                    />
                </Paper>
            </Modal>
        </div>
    );
};
