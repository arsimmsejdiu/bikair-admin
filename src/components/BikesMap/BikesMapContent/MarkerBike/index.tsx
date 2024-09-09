import {COLORS, spinnerGif} from "assets";
import {MarkerData} from "models/interfaces/MarkerData";
import {MarkerIcon} from "models/interfaces/MarkerIcon";
import {MarkerSvg} from "models/interfaces/MarkerSvg";
import React from "react";
import {Marker, Tooltip} from "react-leaflet";
import {putBikeAddress} from "services/bikes";

import "./style.css";
import {BIKE_STATUS, BikeStatusType, BikeTechnician} from "@bikairproject/shared";

type AppMarkerPropsType = {
    data: BikeTechnician,
    index: number,
    onClick: (data: MarkerData, key: number) => void
}

export default function MarkerBike(props: AppMarkerPropsType) {
    const {
        data,
        index,
        onClick
    } = props;
    const [loading, setLoading] = React.useState(false);

    const getDropImage = (backgroundColor: string, bikeColor?: string): MarkerSvg => {
        bikeColor = bikeColor ?? COLORS.white;
        const html = `
        <svg width="35" height="46" viewBox="0 0 35 46">
            <path fill="${backgroundColor}" stroke="${COLORS.black}" stroke-width="1"
                  d="M 18 46 Q 16 41 4 28 A 17 17 0 1 1 31 28 Q 20 41 18 46 Z"/>
            <path fill="transparent" stroke="${bikeColor}" stroke-width="1"
                  d="M 10.8 24 A 1.7 1.7 90 0 1 10.8 15.3 M 10.8 24 A 1.7 1.7 90 0 0 10.8 15.3 M 24.3 24 A 1.7 1.7 90 0 1 24.3 15.3 M 24.3 24 A 1.7 1.7 90 0 0 24.3 15.3 M 9.3 19.7 Q 12.3 21.1 12.4 15.2 Q 12.3 12.6 13.8 12.9 T 16.4 17.1 T 18.1 18.1 T 19.4 12.6 T 22.6 16.1 L 24.3 20 M 19.6 10 L 22.6 10 Z"/>
        </svg>
        `;
        return new MarkerSvg(html);
    };

    const renderBikeImage = (status: BikeStatusType): MarkerSvg => {
        switch (status) {
            case BIKE_STATUS.USED:
                return getDropImage(COLORS.green);
            case BIKE_STATUS.AVAILABLE:
                return getDropImage(COLORS.darkBlue);
            case BIKE_STATUS.MAINTENANCE:
                return getDropImage(COLORS.purple);
            case BIKE_STATUS.STOLEN:
                return getDropImage(COLORS.red);
            case BIKE_STATUS.BOOKED:
                return getDropImage(COLORS.yellow);
            case BIKE_STATUS.RENTAL:
                return getDropImage(COLORS.yellow);
            default:
                return getDropImage(COLORS.lightGrey, COLORS.black);
        }
    };

    const renderImage = (): MarkerSvg => {
        return renderBikeImage(data.status as BikeStatusType || BIKE_STATUS.INCIDENT);
    };

    const renderName = () => {
        if (data.name) {
            return (
                <span>{data.name}</span>
            );
        } else {
            return null;
        }
    };

    const handleMarkerClick = async () => {
        try {
            setLoading(true);
            const bike = await putBikeAddress(data.id);
            onClick({
                ...data,
                ...bike
            }, index);

        } catch (err) {
            console.log("[ERROR]", err);
        } finally {
            setLoading(false);
        }
    };

    const renderGifLoading = () => {
        return new MarkerIcon(spinnerGif);
    };

    if (!data.coordinates) {
        return null;
    }

    return (
        <Marker
            position={[data.marker_coordinates.coordinates[1], data.marker_coordinates.coordinates[0]]}
            icon={loading ? renderGifLoading() : renderImage()}
            eventHandlers={{click: handleMarkerClick}}
        >
            <Tooltip direction="top" offset={[1, -35]} permanent className="marker-tooltip">
                {renderName()}
            </Tooltip>
        </Marker>
    );
}
