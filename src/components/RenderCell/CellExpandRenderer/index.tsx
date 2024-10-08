import { Paper, Popper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { memo, useEffect, useRef, useState } from "react";

interface GridCellExpandPropsType {
    value: string;
    width: number;
}

function isOverflown (element: Element): boolean {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = memo(function GridCellExpand (
    props: GridCellExpandPropsType,
) {
    const {
        width,
        value
    } = props;
    const wrapper = useRef<HTMLDivElement | null>(null);
    const cellDiv = useRef(null);
    const cellValue = useRef(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);

    useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown (nativeEvent: KeyboardEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
                setShowFullCell(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current!);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: "center",
                lineHeight: "24px",
                width: 1,
                height: 1,
                position: "relative",
                display: "flex",
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: "block",
                    position: "absolute",
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{
                        width,
                        marginLeft: -17
                    }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

export function CellExpandRenderer (params: GridRenderCellParams<string>) {
    return (
        <GridCellExpand value={params.formattedValue || ""} width={params.colDef.computedWidth}/>
    );
}
