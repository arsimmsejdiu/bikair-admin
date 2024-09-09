import { Backdrop, CircularProgress } from "@mui/material";
import React, {memo} from "react";

type LoadingOverlayPropsType = {
    open: boolean
}

const LoadingOverlay = (props: LoadingOverlayPropsType) => {
    const { open } = props;

    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.appBar - 1
            }}
            open={open}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
};

export default memo(LoadingOverlay);
