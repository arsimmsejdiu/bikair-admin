import Battery80Icon from "@mui/icons-material/Battery80";
import CircleIcon from "@mui/icons-material/Circle";
import LoadingButton from "@mui/lab/LoadingButton";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {COLORS, IconBike} from "assets";
import Address from "components/Address";
import BikesTags from "components/BikesMap/BikesMapContent/BikesTags";
import {useTranslation} from "react-i18next";

import "./style.css";
import {BIKE_STATUS, BikeStatusType, BikeTechnician} from "@bikairproject/shared";

type BikeMarkerDetailProps = {
    marker: BikeTechnician
    onDetailClick: (d: BikeTechnician) => void
}

export default function BikeMarkerDetail(props: BikeMarkerDetailProps) {
    const {onDetailClick, marker} = props;
    const {t} = useTranslation();

    const handleDetailsClick = () => {
        onDetailClick(marker);
    };

    const getColor = (status: BikeStatusType): string => {
        switch (status) {
            case BIKE_STATUS.AVAILABLE:
                return COLORS.darkBlue;
            case BIKE_STATUS.BOOKED:
                return COLORS.yellow;
            case BIKE_STATUS.USED:
                return COLORS.green;
            case BIKE_STATUS.MAINTENANCE:
                return COLORS.purple;
            case BIKE_STATUS.RENTAL:
                return COLORS.yellow;
            default:
                return COLORS.white;
        }
    };

    const handleColor = () => {
        if (!marker || !marker.capacity) return "transparent";
        if (!marker.capacity) return COLORS.lightGrey;

        if (marker.capacity > 25 && marker.capacity <= 35) {
            return COLORS.yellow;
        }
        if (marker.capacity > 15 && marker.capacity <= 25) {
            return COLORS.orange;
        }
        if (marker.capacity <= 15) {
            return COLORS.red;
        }
        if (marker.capacity > 35) {
            return COLORS.green;
        }
    };

    return (
        <Box>
            <Box className="marker-detail-container">
                <img
                    src={IconBike}
                    alt="icon-bike"
                    className="marker-detail-icon"
                />
                <Box className="marker-detail-content">
                    <Box className="marker-detail-content-wrap">
                        <Box className="align-icon-text">
                            <Typography>{t("bike_list.bike")}: {marker.name}</Typography>
                        </Box>
                        <Box className="align-icon-text">
                            <Typography>{t("bike_list.state")} : {t(`bike.status.${marker.status}`)}</Typography>
                            <CircleIcon
                                sx={{marginLeft: 0.5, fontSize: 25, color: getColor(marker.status as BikeStatusType)}}
                            />
                        </Box>
                    </Box>
                    <Box className="marker-detail-content-wrap">
                        <BikesTags tags={marker.tags}/>
                    </Box>
                    <Box className="marker-detail-content-wrap">
                        <Box className="align-icon-text">
                            <Address address={marker.address}/>
                        </Box>
                    </Box>
                    <Box className="marker-detail-content-wrap">
                        <Box className="align-icon-text">
                            <Battery80Icon sx={{fontSize: 25, color: handleColor()}}/>
                            <Typography>
                                {t("marker_details_bike.battery")}: {" "}
                                {!marker.capacity ? "0 km" : `${marker.capacity} km`}
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="marker-detail-button-container">
                        <LoadingButton onClick={handleDetailsClick}>
                            {t("marker_details_bike.details")}
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
