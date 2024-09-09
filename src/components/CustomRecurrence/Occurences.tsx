import {InputAdornment, TextField} from "@mui/material";
import React, {useState} from "react";

const Occurrences = ({isDisabled}: any) => {
    const [occurrenceValue, setOccurrenceValue] = useState(13);

    const handleOccurrenceChange = (event: any) => {
        setOccurrenceValue(event.target.value);
    };

    return (
        <div>
            {isDisabled && (
                <TextField
                    variant="filled"
                    type="number"
                    size="small"
                    value={occurrenceValue}
                    onChange={handleOccurrenceChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <p>occurrences</p>
                            </InputAdornment>
                        ),
                    }}
                    disabled
                />
            )}
            {!isDisabled && (
                <TextField
                    variant="filled"
                    size="small"
                    type="number"
                    value={occurrenceValue}
                    onChange={handleOccurrenceChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <p>occurrences</p>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        </div>
    );
};

export default Occurrences;
