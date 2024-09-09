import {COLORS} from "assets";
import {LatLngLiteral} from "leaflet";
import {MarkerData} from "models/interfaces/MarkerData";
import {MarkerSvg} from "models/interfaces/MarkerSvg";
import React, {useEffect, useState} from "react";
import {Marker, Polygon} from "react-leaflet";

import "./style.css";
import {GetSpotsNearbyOutputData} from "@bikairproject/shared";

type AppMarkerPropsType = {
    data: GetSpotsNearbyOutputData,
    index: number,
    onClick: (data: MarkerData, key: number) => void
}

export default function MarkerSpot(props: AppMarkerPropsType) {
    const {
        data,
        index,
        onClick
    } = props;
    const [polygon, setPolygon] = useState<LatLngLiteral[] | null>(null);
    console.log("Coordinates --> ", data.coordinates);

    useEffect(() => {
        if (polygon === null && typeof data.spot_polygon !== "undefined" && data.spot_polygon !== null) {
            const array: LatLngLiteral[] = [];
            const p = data.spot_polygon;
            const coordinates = p.coordinates[0];
            for (let x = 0; x < coordinates.length; x++) {
                const coords: LatLngLiteral = {
                    lat: coordinates[x][1],
                    lng: coordinates[x][0],
                };
                array.push(coords);
            }
            setPolygon(array);
        }
    }, [data.spot_polygon, polygon]);

    const getParkingImage = (width = 30, height = 30, backgroundColor: string | null = null, letterColor: string | null = null) => {
        backgroundColor = backgroundColor ?? COLORS.greenSpot;
        letterColor = letterColor ?? COLORS.white;
        const html = `
        <svg width="${width}" height="${height}" viewBox="0 0 16 16">
                <path fill="${letterColor}"
                    d="M 3 3 L 13 3 L 13 13 L 3 13 L 3 3"/>
                <path fill="${backgroundColor}"
                    d="M8.27 8.074c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97H8.27Z"/>
                <path fill="${backgroundColor}"
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm3.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5V4.002Z"/>
            </svg>
        `;
        return new MarkerSvg(html);
    };

    const renderImage = (): MarkerSvg => {
        return getParkingImage();
    };

    const handleMarkerClick = async () => {
        try {
            onClick(data, index);
        } catch (err) {
            console.log("[ERROR]", err);
        }
    };

    if (polygon !== null && polygon.length > 0 && data.coordinates) {
        return <>
            <Polygon
                pathOptions={{
                    color: COLORS.greenSpot,
                    fillColor: COLORS.greenSpot
                }}
                positions={polygon}
                eventHandlers={{click: handleMarkerClick}}
            />
            <Marker
                position={[data.coordinates.coordinates[1], data.coordinates.coordinates[0]]}
                icon={renderImage()}
                eventHandlers={{click: handleMarkerClick}}
            >
            </Marker>
        </>;
    } else if (data.coordinates) {
        return (
            <Marker
                position={[data.coordinates.coordinates[1], data.coordinates.coordinates[0]]}
                icon={renderImage()}
                eventHandlers={{click: handleMarkerClick}}
            >
            </Marker>
        );
    } else {
        return null;
    }
}
