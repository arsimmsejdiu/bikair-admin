import {Button} from "@mui/material";
import React from "react";

interface ButtonAtomicProps {
    children?: any,
    onClick?: any,
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    autoFocus?: boolean | undefined,
    className?: any,
    variant?: "text" | "outlined" | "contained",
}

export const ButtonAtomic = ({children, color, onClick, autoFocus, className, variant}: ButtonAtomicProps) => {
    return <Button variant={variant} color={color} onClick={onClick} autoFocus={autoFocus} className={className}>
        {children}
    </Button>;
};
