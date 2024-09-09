import {ButtonAtomic} from "Atomic/ButtonAtomic";
import {
    DialogActionsAtomic,
    DialogAtomic,
    DialogContentAtomic,
    DialogContentTextAtomic,
    DialogTitleAtomic
} from "Atomic/DialogAtomic";
import React, {memo, useState} from "react";

interface ConfirmButtonProps {
    label: string,
    onConfirm?: () => void,
    onCancel?: () => void,
}

const ConfirmButton = (props: ConfirmButtonProps) => {
    const {
        label,
        onConfirm,
        onCancel
    } = props;
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        setOpen(false);
        if (typeof onConfirm !== "undefined" && onConfirm !== null) {
            onConfirm();
        }
    };

    const handleCancel = () => {
        setOpen(false);
        if (typeof onCancel !== "undefined" && onCancel !== null) {
            onCancel();
        }
    };

    const handleButtonClick = () => {
        setOpen(true);
    };

    return (
        <>
            <ButtonAtomic color="error" onClick={handleButtonClick}>
                {label}
            </ButtonAtomic>
            <DialogAtomic
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitleAtomic id="alert-dialog-title">
                    Confirmation
                </DialogTitleAtomic>
                <DialogContentAtomic>
                    <DialogContentTextAtomic id="alert-dialog-description">
                        {"Êtes-vous sur de vouloir faire ça ?"}
                    </DialogContentTextAtomic>
                </DialogContentAtomic>
                <DialogActionsAtomic>
                    <ButtonAtomic onClick={handleCancel} autoFocus>Non</ButtonAtomic>
                    <ButtonAtomic onClick={handleConfirm}>Oui</ButtonAtomic>
                </DialogActionsAtomic>
            </DialogAtomic>
        </>
    );

};

export default memo(ConfirmButton);
