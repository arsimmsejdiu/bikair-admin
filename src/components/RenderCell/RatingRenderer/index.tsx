import { Rating } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

export function RatingRenderer (params: GridRenderCellParams<number>) {
    return (
        <Rating name="read-only" value={params.value} readOnly/>
    );
}
