import {ButtonAtomic} from "Atomic/ButtonAtomic";
import React from "react";

import {useStylesActionButton} from "./CustomStyles";

interface ActionButtonsProps {
    onCancel?: () => void
    onSubmit?: () => void
}

const ActionButtons = ({onCancel, onSubmit}: ActionButtonsProps) => {
    const classes = useStylesActionButton();

    const handleCancel = () => {
        if (typeof onCancel !== "undefined") {
            onCancel();
        }
    };

    const handleSubmit = () => {
        if (typeof onSubmit !== "undefined") {
            onSubmit();
        }
    };

    return (
        <div className={classes.root}>
            <ButtonAtomic
                className={classes.grayButton}
                onClick={handleCancel}
            >
                Annuler
            </ButtonAtomic>
            <ButtonAtomic
                color="secondary"
                onClick={handleSubmit}
            >
                Fait
            </ButtonAtomic>
        </div>
    );
};

export default ActionButtons;

