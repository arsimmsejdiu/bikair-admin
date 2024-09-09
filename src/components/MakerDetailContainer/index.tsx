import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import {MarkerData} from "models/interfaces/MarkerData";
import React, {lazy, Suspense} from "react";

import {BikeTechnician, GetSpotsNearbyOutputData} from "@bikairproject/shared";

const BikeMarkerDetail = lazy(() => import("./BikeMakerDetail/BikeMarkerDetail"));
const SpotMarkerDetail = lazy(() => import("./SpotMarkerDetail/SpotMarkerDetail"));

type MarkerDetailsContainerProps = {
    marker: MarkerData | null
    onClose: () => void
    onDetailsClick: (d: MarkerData) => void
}

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    backgroundColor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
};

export default function MakerDetailContainer(props: MarkerDetailsContainerProps) {
    const {marker, onDetailsClick, onClose} = props;

    const handleClose = () => {
        onClose();
    };

    const renderMarker = (marker: MarkerData | null) => {
        if (marker) {
            if (marker.marker_type === "BIKE") {
                return (
                    <Suspense fallback={<div></div>}>
                        <BikeMarkerDetail marker={marker as BikeTechnician} onDetailClick={onDetailsClick}/>
                    </Suspense>
                );
            } else {
                return (
                    <Suspense fallback={<div></div>}>
                        <SpotMarkerDetail marker={marker as GetSpotsNearbyOutputData}/>
                    </Suspense>
                );
            }
        } else {
            return null;
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={marker !== null}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={marker !== null}>
                <Box sx={style}>
                    <Box style={{position: "absolute", top: 10, right: 10}}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    {renderMarker(marker)}
                </Box>
            </Fade>
        </Modal>
    );
}
