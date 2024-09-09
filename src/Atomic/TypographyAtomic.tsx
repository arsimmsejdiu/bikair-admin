import {Typography} from "@mui/material";
import {Theme} from "@mui/material/styles";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";
import {SxProps} from "@mui/system";
import {OverridableStringUnion} from "@mui/types";
import React from "react";

interface TypographyAtomicProps {
    children?: any,
    variant?: OverridableStringUnion<Variant | "inherit", TypographyPropsVariantOverrides>,
    component?: any,
    sx?: SxProps<Theme>,
    style?: React.CSSProperties
}

export const TypographyAtomic = ({children, variant, sx, component, style}: TypographyAtomicProps) => {
    return <Typography variant={variant} component={component} sx={sx} style={style}>
        {children}
    </Typography>;
};
