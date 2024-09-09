import Box from "@mui/material/Box";
import { GridRowId } from "@mui/x-data-grid/models";
import AppDataGrid from "components/AppDataGrid";
import { useAppDispatch } from "hooks/useAppDispatch";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import { FilterData } from "models/interfaces/FilterData";
import { FilterGrid } from "models/interfaces/FilterGrid";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { setTitle } from "redux/slices/global";
import { setLoading } from "redux/slices/grid";
import { isFilterButtonActive, isNewFilter } from "services/gridService";

import { DataQueryResult } from "@bikairproject/shared";

interface DataTableProps<D extends object> {
    title: string,
    basePath: string,
    create?: boolean;
    detail?: boolean;
    upload?: boolean;
    columns: AppGridColDef<D>[],
    defaultFilter: FilterGrid,
    defaultActiveColumns: Record<GridRowId, boolean>,
    getData: (filterData: FilterData, activeColumns: Record<GridRowId, boolean>) => Promise<DataQueryResult<D>>
    getSelectionId: (selection: D | null) => number | null
}

export default function DataTable<D extends object> (props: DataTableProps<D>) {
    const {
        title,
        basePath,
        create,
        detail,
        upload,
        columns,
        defaultFilter,
        defaultActiveColumns,
        getData,
        getSelectionId
    } = props;

    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const [data, setData] = useState<D[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [filters, setFilters] = useState<FilterGrid>(defaultFilter);
    const [activeColumns, setActiveColumns] = useState<Record<GridRowId, boolean>>(defaultActiveColumns);

    useEffect(() => {
        dispatch(setTitle(title));
        return () => {
            setFilters(defaultFilter);
            setActiveColumns(defaultActiveColumns);
        };
    }, []);

    useEffect(() => {
        if (location.pathname === basePath) {
            handleGetData(filters);
        }
    }, [location]);

    const handleFilterChange = (newState: any) => {
        const newFilter = {
            ...filters,
            ...newState,
        };
        const filterChanged = isNewFilter(filters, newFilter);
        newFilter.newFilter = isFilterButtonActive(newFilter);
        setFilters(newFilter);
        if (filterChanged) {
            handleGetData(newFilter);
        }
    };

    const handleGetData = (paramFilter: FilterData) => {
        dispatch(setLoading(true));
        getData(paramFilter, activeColumns)
            .then((result) => {
                setData(result.rows);
                setTotal(result.total);
            })
            .catch((error) => {
                setTotal(0);
                setData([]);
                if (error.response.status !== 401) {
                    enqueueSnackbar(
                        `Erreur lors de la récupération des datas [${error.response.status}]`,
                        {
                            variant: "error",
                        }
                    );
                }
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    return (
        <Box sx={{
            height: "90vh",
            width: 1
        }}>
            <AppDataGrid
                create={create}
                detail={detail}
                upload={upload}
                data={data}
                total={total}
                filters={filters}
                onFilterChange={handleFilterChange}
                columns={columns}
                columnVisibility={activeColumns}
                onVisibilityChange={setActiveColumns}
                getSelectionId={getSelectionId}
            />
            <Outlet/>
        </Box>
    );
}
