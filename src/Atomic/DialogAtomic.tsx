import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";

interface DialogProps {
    children?: any,
    open?: any,
    onClose?: any,
}

interface DialogTitleAtomicProps {
    children?: any,
    id?: string | undefined
}

interface DialogContentAtomicProps {
    children?: any,
    id?: string | undefined
}

interface DialogContentTextAtomicProps {
    children?: any,
    id?: string | undefined
}

interface DialogActionsAtomicProps {
    children?: any,
    id?: string | undefined
}

export const DialogAtomic = ({children, open ,onClose}: DialogProps) => {
    return <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        {children}
    </Dialog>;
};

export const DialogTitleAtomic = ({children, id}: DialogTitleAtomicProps) => {
    return <DialogTitle id={id}>
        {children}
    </DialogTitle>;
};

export const DialogContentAtomic = ({children}: DialogContentAtomicProps) => {
    return <DialogContent>
        {children}
    </DialogContent>;
};

export const DialogContentTextAtomic = ({children, id}: DialogContentTextAtomicProps) => {
    return <DialogContentText id={id}>
        {children}
    </DialogContentText>;
};

export const DialogActionsAtomic = ({children}: DialogActionsAtomicProps) => {
    return <DialogActions>
        {children}
    </DialogActions>;
};
