import { Button, TablePagination } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

type AppDataGridFooterPropsType = {
    count: number;
    limit: number;
    offset: number;
    create?: boolean;
    detail?: boolean;
    selected: boolean;
    readonly?: boolean;
    onAdd: () => void;
    onDetail: () => void;
    onPageChange: (newFilter: any) => void;
};

export default function AppDataGridFooter (props: AppDataGridFooterPropsType) {
    const {
        count,
        selected,
        readonly,
        onAdd,
        onDetail,
        limit,
        offset,
        onPageChange,
        create,
        detail
    } = props;
    const { t } = useTranslation();

    const handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) => {
        onPageChange({
            offset: limit * page
        });
    };

    const handleRowPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // dispatch(setlimit(parseInt(event.target.value, 10)));
        onPageChange({
            limit: parseInt(event.target.value),
            offset: 0
        });
    };

    const handleAddClick = () => {
        onAdd();
    };

    const handleDetailClick = () => {
        onDetail();
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
                {readonly ?? (
                    <>
                        {create ?
                            (
                                <Button variant="outlined" sx={{ ml: 1 }}
                                    onClick={handleAddClick}>
                                    {t("marker_details_bike.add")}
                                </Button>
                            )
                            : null
                        }
                        {detail ?
                            <Button variant="outlined" sx={{ ml: 1 }} disabled={!selected} onClick={handleDetailClick}>
                                {t("marker_details_bike.details")}
                            </Button>
                            : null
                        }
                    </>
                )}
            </div>
            <div>
                <TablePagination
                    count={count ?? 0}
                    page={offset / limit}
                    rowsPerPage={limit}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowPerPageChange}
                    component="div"
                />
            </div>
        </Box>
    );
}
