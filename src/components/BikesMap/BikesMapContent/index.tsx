import "leaflet/dist/leaflet.css";
import {Box, CircularProgress, Grid} from "@mui/material";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {LeafletEvent} from "leaflet";
import {Coordinates} from "models/dto/Coordinates";
import {MarkerData} from "models/interfaces/MarkerData";
import * as React from "react";
import {Suspense, useEffect, useState} from "react";
import {useMap, useMapEvents} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import {setPosition} from "redux/slices/map";

import "./style.css";
import SearchField from "./SearchField";
import {
    BikeStatusType,
    BikeTagType,
    BikeTechnician,
    GetSpotsNearbyOutputData,
    LayerStatusType
} from "@bikairproject/shared";

const AppMapControl = React.lazy(() => import("components/BikesMap/AppMapControl"));
const BikesFilterButton = React.lazy(() => import("components/BikesMap/BikesMapContent/BikesFilterButton"));
const BikesTagsButton = React.lazy(() => import("components/BikesMap/BikesMapContent/BikesTagsButton"));
const CityPolygon = React.lazy(() => import("components/BikesMap/BikesMapContent/CityPolygon"));
const CityRedZonePolygon = React.lazy(() => import("components/BikesMap/BikesMapContent/CityRedZonePolygon"));
const HeatLayer = React.lazy(() => import("components/BikesMap/BikesMapContent/HeatLayer"));
const LayersButton = React.lazy(() => import("components/BikesMap/BikesMapContent/LayersButton"));
const MarkerBike = React.lazy(() => import("components/BikesMap/BikesMapContent/MarkerBike"));
const MarkerSpot = React.lazy(() => import("components/BikesMap/BikesMapContent/MarkerSpot"));
const SpotsFilterButton = React.lazy(() => import("components/BikesMap/BikesMapContent/SpotsFilterButton"));

type PositionType = {
    center: {
        lat: number,
        lng: number,
    },
    zoom: number
}

type BikeMapContentPropsType = {
    spots: GetSpotsNearbyOutputData[],
    bikes: BikeTechnician[],
    endCoordsData: Coordinates[],
    startCoordsData: Coordinates[],
    openCoordsData: Coordinates[],
    onBikeFilterStatusChange: (filter: BikeStatusType[]) => void,
    onBikeFilterTagsChange: (filter: BikeTagType[]) => void,
    onSpotFilterChange: (filter: boolean) => void,
    onMarkerClick: (markerData: MarkerData) => void
    setLoading: (value: boolean) => void
}

let currentPosition: PositionType = {
    center: {
        lat: 46.9909,
        lng: 3.1628,
    },
    zoom: 15,
};

export default function BikeMapContent(props: BikeMapContentPropsType) {
    const dispatch = useAppDispatch();
    const {
        spots,
        bikes,
        endCoordsData,
        startCoordsData,
        openCoordsData,
        onBikeFilterStatusChange,
        onSpotFilterChange,
        onBikeFilterTagsChange,
        onMarkerClick,
        setLoading,
    } = props;
    const [layer, setLayer] = useState<LayerStatusType>("BIKES");

    const citiesPolygon = useAppSelector(state => state.global.citiesPolygon);
    const citiesRedZones = useAppSelector(state => state.global.citiesRedZones);
    const map = useMap();

    useEffect(() => {
        return () => {
            dispatch(setPosition(currentPosition));
        };
    }, []);

    const handleMoveEnd = (event: LeafletEvent) => {
        currentPosition = {
            center: {
                lat: event.target.getCenter().lat,
                lng: event.target.getCenter().lng,
            },
            zoom: event.target.getZoom(),
        };
    };

    useMapEvents({
        moveend: handleMoveEnd
    });

    const handleBikeFilterClick = (status: BikeStatusType[]) => {
        onBikeFilterStatusChange(status);
    };

    const handleBikeTagsFilterClick = (tags: BikeTagType[]) => {
        onBikeFilterTagsChange(tags);
    };

    const handleLayerSelectClick = (status: LayerStatusType) => {
        setLayer(status);
        setLoading(false);
    };

    const handleSpotShowClick = (filter: boolean) => {
        onSpotFilterChange(filter);
    };

    const handleMarkerClick = (d: MarkerData) => {
        if (d.marker_coordinates) {
            map.flyTo([d.marker_coordinates.coordinates[1], d.marker_coordinates.coordinates[0]]);
            onMarkerClick(d);
        }
    };

    const getLayerData = () => {
        switch (layer) {
            case "END_COORDS":
                return endCoordsData;
            case "START_COORDS":
                return startCoordsData;
            case "OPEN_COORDS":
                return openCoordsData;
            default:
                return [];
        }
    };

    useEffect(() => {
        getLayerData();
    }, [layer]);

    const getBikesData = () => {
        return layer === "BIKES" ? bikes : [];
    };
    const getSpotsData = () => {
        return layer === "BIKES" ? spots : [];
    };

    const renderCityPolygon = () => {
        if (citiesPolygon && citiesPolygon.length > 0) {
            return (
                <>
                    {
                        citiesPolygon.map((city, i) => {
                            return (
                                <CityPolygon key={`city-polygon-${i}`} data={city}/>
                            );
                        })
                    }
                </>
            );
        } else {
            return null;
        }
    };

    const renderCityRedZonePolygon = () => {
        if (citiesRedZones && citiesRedZones.length > 0) {
            return (
                <>
                    {
                        citiesRedZones.map((city, i) => {
                            return (
                                <CityRedZonePolygon key={`city-polygon-${i}`} data={city}/>
                            );
                        })
                    }
                </>
            );
        } else {
            return null;
        }
    };

    return (
        <Box>
            <HeatLayer data={getLayerData()} n={getLayerData().length}/>
            {renderCityPolygon()}
            {renderCityRedZonePolygon()}
            {getSpotsData().map((d, i) => {
                return (
                    <Suspense key={i} fallback={<div></div>}>
                        <MarkerSpot
                            key={i}
                            index={i}
                            data={d}
                            onClick={handleMarkerClick}
                        />
                    </Suspense>
                );
            })}
            <MarkerClusterGroup>
                {getBikesData().map((d, i) => (
                    <Suspense key={i} fallback={<div></div>}>
                        <MarkerBike
                            key={i}
                            index={i}
                            data={d}
                            onClick={handleMarkerClick}
                        />
                    </Suspense>
                ))}
            </MarkerClusterGroup>
            <Suspense fallback={<div></div>}>
                <AppMapControl position="bottomright">
                    <Grid container spacing={2} style={{padding: 10}}>
                        <Grid xs={9.5}/>
                        <Grid xs={2.5} style={{paddingBottom: 10}}>
                            <Suspense fallback={<CircularProgress color="info"/>}>
                                <SpotsFilterButton onClick={handleSpotShowClick}/>
                            </Suspense>
                        </Grid>

                        <Grid xs={9.5}/>
                        <Grid xs={2.5} style={{paddingBottom: 10}}>
                            <Suspense fallback={<CircularProgress color="info"/>}>
                                <BikesFilterButton onClick={handleBikeFilterClick}/>
                            </Suspense>
                        </Grid>

                        <Grid xs={9.5}/>
                        <Grid xs={2.5} style={{paddingBottom: 10}}>
                            <Suspense fallback={<CircularProgress color="info"/>}>
                                <BikesTagsButton onClick={handleBikeTagsFilterClick}/>
                            </Suspense>
                        </Grid>
                        <Grid xs={9.5}/>
                        <Grid xs={2.5}>
                            <Suspense fallback={<CircularProgress color="info"/>}>
                                <LayersButton onClick={handleLayerSelectClick}/>
                            </Suspense>
                        </Grid>
                    </Grid>
                </AppMapControl>
            </Suspense>
            <SearchField/>
        </Box>
    );
}
