import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import {COLORS} from "./constant";

export const SkeletonLoad = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rectangular" width={210} height={60} style={{borderRadius: 10, marginLeft: "10px"}} />
        </Stack>
    );
};

export const SkeletonLoadItem = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rectangular" width={120} height={45} style={{
                marginLeft: "10px",
                marginRight: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
            }} />
        </Stack>
    );
};

export const SkeletonLoadLong = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rectangular" width={"95%"} height={50} style={{
                marginLeft: "10px",
                marginRight: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
            }} />
        </Stack>
    );
};

export const renderStatusBgColors = (type: string) => {
    switch (type){
        case "BEGIN":
        case "PAYMENT_INV_CREATED":
            return COLORS.bgYellowColor;
        case "START":
        case "PAYMENT_SUCCESS":
            return COLORS.bgGreenColor;
        case "CLOSED":
            return COLORS.bgRedColor;
        default:
            return COLORS.bgBlueColor;
            break;
    }
};

export const renderStatusColors = (type: string) => {
    switch (type){
        case "BEGIN":
        case "PAYMENT_INV_CREATED":
            return COLORS.yellowColor;
        case "START":
        case "PAYMENT_SUCCESS":
            return COLORS.greenColor;
        case "CLOSED":
            return COLORS.redColor;
        default:
            return COLORS.blueColor;
            break;
    }
};

export const renderBgColors = (type: string) => {
    switch (type) {
        case "USER_CLICK_OK_PAID":
        case "TRIP_STEP_LOCK_OPEN":
        case "TRIP_STEP_CLOSING":
        case "USER_CLICK_LOCK":
        case "USER_CLICK_RETRY_LOCK_CONNECTION":
        case "TRIP_STEP_START":
        case "TRIP_STEP_RETRY_CLOSING":
        case "USER_CLICK_RETRY_LOCK_CLOSING":
        case "PHOTO_SEND":
        case "USER_CLICK_UNLOCK":
        case "TRIP_STEP_END":
            return COLORS.bgGreenColor;
            break;
        case "TRIP_STEP_LOCK_TIMEOUT":
        case "TRIP_STEP_CANCEL":
        case "ERROR_OCCURED":
        case "USER_CLICK_SUPPORT_TICKET":
            return COLORS.bgRedColor;
            break;
        case "USER_CLICK_UNPAUSE":
        case "USER_CLICK_PAUSE":
        case "USER_OPEN_APP":
        case "DRAWER_LOGOUT_MENU":
        case "TRIP_STEP_VERIFY_LOCK_CLOSED":
        case "ASK_W3D_SECURE":
        case "USER_CLICK_CANCEL_TRIP":
        case "USER_CLICK_YES_LOCK_STATE":
            return COLORS.bgYellowColor;
            break;
        default:
            return COLORS.bgBlueColor;
            break;
    }
};

export const renderColors = (type: string) => {
    switch (type) {
        case "USER_CLICK_OK_PAID":
        case "TRIP_STEP_LOCK_OPEN":
        case "TRIP_STEP_CLOSING":
        case "USER_CLICK_LOCK":
        case "USER_CLICK_RETRY_LOCK_CONNECTION":
        case "TRIP_STEP_START":
        case "TRIP_STEP_RETRY_CLOSING":
        case "USER_CLICK_RETRY_LOCK_CLOSING":
        case "PHOTO_SEND":
        case "USER_CLICK_UNLOCK":
        case "TRIP_STEP_END":
            return COLORS.greenColor;
            break;
        case "TRIP_STEP_LOCK_TIMEOUT":
        case "TRIP_STEP_CANCEL":
        case "ERROR_OCCURED":
        case "USER_CLICK_SUPPORT_TICKET":
            return COLORS.redColor;
            break;
        case "USER_CLICK_UNPAUSE":
        case "USER_CLICK_PAUSE":
        case "USER_OPEN_APP":
        case "DRAWER_LOGOUT_MENU":
        case "TRIP_STEP_VERIFY_LOCK_CLOSED":
        case "ASK_W3D_SECURE":
        case "USER_CLICK_CANCEL_TRIP":
        case "USER_CLICK_YES_LOCK_STATE":
            return COLORS.yellowColor;
            break;
        default:
            return COLORS.blueColor;
            break;
    }
};
