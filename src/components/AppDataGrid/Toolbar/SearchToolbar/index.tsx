import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ChangeEvent, FormEvent, useState } from "react";

type SearchToolbarPropsType = {
    onTextChange: (text: string | null) => void;
    onValidate: () => void;
};

export default function SearchToolbar (props: SearchToolbarPropsType) {
    const {
        onTextChange,
        onValidate
    } = props;
    const [searchValue, setSearchValue] = useState("");

    const handleTextChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSearchValue(event.target.value);
        if (event.target.value === "") {
            onTextChange(null);
        } else {
            onTextChange(event.target.value);
        }
    };

    const handleClear = () => {
        onTextChange(null);
        setSearchValue("");
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onValidate();
    };

    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                width: 200,
            }}
        >
            <FormControl component="form" onSubmit={handleSubmit}>
                <TextField
                    variant="standard"
                    value={searchValue}
                    onChange={handleTextChange}
                    placeholder="Search…"
                    InputProps={{
                        startAdornment: <SearchIcon fontSize="small"/>,
                        endAdornment: (
                            <IconButton
                                title="Clear"
                                aria-label="Clear"
                                size="small"
                                style={{ visibility: searchValue ? "visible" : "hidden" }}
                                onClick={handleClear}
                            >
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                        ),
                    }}
                    sx={{
                        width: {
                            xs: 1,
                            sm: "auto",
                        },
                        m: (theme) => theme.spacing(1, 0.5, 1.5),
                        "& .MuiSvgIcon-root": {
                            mr: 0.5,
                        },
                        "& .MuiInput-underline:before": {
                            borderBottom: 1,
                            borderColor: "divider",
                        },
                    }}
                />
            </FormControl>
        </Box>
    );
}
