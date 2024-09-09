import {Box,Button, Stack} from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, } from "@mui/x-data-grid";

const Modals = React.lazy(() => import("../../Modal/Modals"));
const SearchToolbar = React.lazy(() => import("./SearchToolbar"));
import React from "react";

import {ImportFileContent} from "../../ModalContent";


type AppDataGridToolbarType = {
    newFilter: boolean;
    upload: boolean
    onApplyClick: () => void;
    onSearchChange: (text: string | null) => void;
};

export default function AppDataGridToolbar (props: AppDataGridToolbarType) {
    const {
        newFilter,
        upload,
        onApplyClick,
        onSearchChange
    } = props;

    const handleApplyClick = () => {
        onApplyClick();
    };

    const handleValidate = () => {
        onApplyClick();
    };

    const handleSearchChange = (value: string | null) => {
        onSearchChange(value);
    };

    return (
        <Box
            sx={{
                p: 2,
                pb: 0,
                justifyContent: "space-between",
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "wrap",
            }}
        >
            <div>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <GridToolbarFilterButton/>
                    <Button sx={{ ml: 1 }} variant="outlined" disabled={!newFilter} onClick={handleApplyClick}>
                        Apply
                    </Button>
                    {upload ? (
                        <Modals buttonTitle={"importer"}>
                            <ImportFileContent />
                        </Modals>
                    ) : null}
                </Stack>

            </div>
            <div>
                <SearchToolbar
                    onValidate={handleValidate}
                    onTextChange={handleSearchChange}
                />
            </div>
            <div>
                <GridToolbarColumnsButton/>
                <GridToolbarDensitySelector/>
            </div>
        </Box>
    );
}
