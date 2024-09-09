import {createTheme, Theme} from "@mui/material";
import {blue} from "@mui/material/colors";


declare module "@mui/material/styles" {
    interface ThemeOptions {
        overrides: {
            MuiInput: {
                textarea: {
                    "&::placeholder": {
                        padding: 10
                    }
                }
            }
        },
    }
}

export const theme: Theme = createTheme({
    overrides: {
        MuiInput: {
            textarea: {
                "&::placeholder": {
                    padding: 10
                }
            }
        }
    },
    palette: {
        secondary: { main: blue["500"]}
    },
});
