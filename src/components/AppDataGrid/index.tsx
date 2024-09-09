import Box from "@mui/material/Box";
import {
    DataGrid,
    GridCellParams,
    GridColumnVisibilityModel,
    GridFilterModel,
    GridSelectionModel,
    GridSortModel,
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { useAppSelector } from "hooks/useAppSelector";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import { FilterGrid } from "models/interfaces/FilterGrid";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isFilterSet } from "services/dataFilterUtils";
import { getDefaultObject } from "services/utils";

import AppDataGridFooter from "./Footer";
import AppDataGridToolbar from "./Toolbar";

type AppDataGridPropsType<T extends object> = {
    data: T[];
    total: number;
    create?: boolean;
    detail?: boolean;
    upload?: boolean;
    columns: AppGridColDef<T>[];
    filters: FilterGrid;
    getSelectionId: (selection: T | null) => number | null
    onFilterChange: (filters: any) => void;
    columnVisibility?: Record<string, boolean>
    onVisibilityChange: (model: GridColumnVisibilityModel) => void;
    readonly?: boolean;
};

export default function AppDataGrid<T extends object> (
    props: AppDataGridPropsType<T>
) {
    const {
        data,
        columns,
        filters,
        getSelectionId,
        onFilterChange,
        readonly,
        total,
        create,
        detail,
        upload,
        columnVisibility,
        onVisibilityChange
    } = props;
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [selection, setSelection] = useState<T | null>(null);
    const [selected, setSelected] = useState(false);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    const loading = useAppSelector((state) => state.grid.loading);

    const getInitialState = () => {
        const initialState: GridInitialStateCommunity = {};

        if (filters.order !== null && filters.orderBy !== null) {
            initialState.sorting = {
                sortModel: [
                    {
                        sort: filters.order,
                        field: filters.orderBy,
                    },
                ],
            };
        }

        initialState.pagination = {
            page: filters.offset,
            pageSize: filters.limit,
        };

        return initialState;
    };

    const handleApplyFilter = () => {
        onFilterChange({
            value: filters.newValue,
            operator: filters.newOperator,
            column: filters.newColumn,
            search: filters.newSearch,
            offset: 0,
        });
    };

    const handleFilterChange = (filterModel: GridFilterModel) => {
        if (isFilterSet(filterModel)) {
            onFilterChange({
                newValue: filterModel.items[0].value || null,
                newOperator: filterModel.items[0].operatorValue || "=",
                newColumn: filterModel.items[0].columnField,
            });
        } else {
            onFilterChange({
                newValue: null,
                newOperator: null,
                newColumn: null,
            });
        }
    };

    const handleSortModelChange = (newSortModel: GridSortModel) => {
        if (newSortModel.length === 0) {
            onFilterChange({
                orderBy: null,
                order: null,
            });
        } else {
            onFilterChange({
                order: newSortModel[0].sort || "asc",
                orderBy: newSortModel[0].field,
            });
        }
    };

    const handleSearchChange = (value: string | null) => {
        onFilterChange({
            newSearch: value,
        });
    };

    const handleApplyClick = () => {
        if (filters.newFilter) {
            handleApplyFilter();
        }
    };

    const handleSelection = (gridSelection: GridSelectionModel) => {
        setSelectionModel(gridSelection);
        if (gridSelection.length === 0 || data === null) {
            setSelection(null);
            setSelected(false);
        } else {
            const find = data.find((d) => getSelectionId(d) === Number(gridSelection[0]));
            setSelection(find || getDefaultObject<T>(columns));
            setSelected(true);
        }
    };

    const handlePageChange = (newFilter: any) => {
        onFilterChange(newFilter);
    };

    const handleAdd = () => {
        setSelectionModel([]);
        navigate("new");
    };
    const handleOpenDetails = () => {
        const selectionId = getSelectionId(selection);
        if (selectionId !== null) {
            navigate(`${selectionId}`);
        }
    };

    const handleDoubleClick = (params: GridCellParams<any, any, any>) => {
        navigator.clipboard
            .writeText(params.value)
            .then(() => enqueueSnackbar("Copié !"));
    };

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                "& .bikair-grid-cell-boolean.positive svg": {
                    color: "green",
                    fontWeight: "bold",
                },
                "& .bikair-grid-cell-boolean.negative svg": {
                    color: "red",
                    fontWeight: "bold",
                },
            }}
        >
            <DataGrid
                components={{
                    Toolbar: AppDataGridToolbar,
                    Footer: AppDataGridFooter,
                }}
                rows={data ?? []}
                columns={columns}
                rowCount={(data ?? []).length}
                loading={loading}
                selectionModel={selectionModel}
                initialState={getInitialState()}
                columnVisibilityModel={columnVisibility}
                filterMode="server"
                sortingMode="server"
                paginationMode="server"
                onFilterModelChange={handleFilterChange}
                onSortModelChange={handleSortModelChange}
                onSelectionModelChange={handleSelection}
                onCellDoubleClick={handleDoubleClick}
                onColumnVisibilityModelChange={onVisibilityChange}
                componentsProps={{
                    toolbar: {
                        newFilter: filters.newFilter,
                        onApplyClick: handleApplyClick,
                        onSearchChange: handleSearchChange,
                        upload: upload
                    },
                    footer: {
                        count: total,
                        selected: selected,
                        readonly: readonly,
                        limit: filters.limit,
                        offset: filters.offset,
                        onAdd: handleAdd,
                        create: create,
                        detail: detail,
                        onDetail: handleOpenDetails,
                        onPageChange: handlePageChange,
                    },
                }}
            />
        </Box>
    );
}
