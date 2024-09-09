import {createTheme} from "@mui/material";
import {makeStyles} from "@mui/styles";

import {COLORS} from "../../assets";

const theme = createTheme();

export const useStylesRecurringModal = makeStyles(() => ({
    paper: {
        position: "absolute",
        width: 350,
        backgroundColor: theme.palette.background.paper,
        border: "none",
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2)
    }
}));

export const useStylesWeekDays = makeStyles(() => ({
    toggleContainer: {
        margin: theme.spacing(1),
    },
    header: {
        margin: theme.spacing(1, 0),
    },
    root: {
        width: 25,
        height: 25,
        "&selected": {
            backgroundColor: COLORS.lightBlue,
            color: "white"
        }
    }
}));

export const useStylesMonthOptions = makeStyles(() => ({
    SelectSubOption: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: theme.spacing(1, 1),
        width: "fit-content",
    },
}));

export const useStylesCustomRecurrence = makeStyles(() => ({
    header: {
        fontSize: "16px",
        fontFamily: "Roboto",
        fontWeight: "bold",
        margin: theme.spacing(0, 0, 2, 0),
    },
    card: {
        fontSize: "15px",
        fontFamily: "Roboto",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
    },
}));

export const useStylesActionButton = makeStyles((theme: any) => ({
    root: {
        margin: theme.spacing(1),
        display: "flex",
        justifyContent: "flex-end",
    },
    grayButton: {
        color: "gray",
    },
}));

export const useStylesFrequency = makeStyles(() => ({
    frequency: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: theme.spacing(1, 1, 1, 1)
    },
    repeatText: {
        width: 100,
        margin: theme.spacing(0, 0.5, 0, 0)
    },
    count: {
        width: 100,
        margin: theme.spacing(0, 0.5, 0, 0),
        backgroundColor: "white"
    }
}));

export const useStylesEnds = makeStyles(() => ({
    formControl: {
        margin: theme.spacing(1),
        display: "flex",
    },
    header: {
        margin: theme.spacing(0, 0, 1, 0),
    },
    Never: {
        width: 300,
        maxWidth: 300,
        display: "flex",
        justifyContent: "flex-start",
        margin: theme.spacing(3, 0, 0, -3),
    },
    On: {
        width: 300,
        maxWidth: 300,
        display: "flex",
        justifyContent: "flex-start",
        margin: theme.spacing(1, 0, 0, -3),
    },
    After: {
        width: 280,
        maxWidth: 280,
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(1, 0, 0, 0),
    },
}));
