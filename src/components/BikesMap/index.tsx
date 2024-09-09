import "leaflet/dist/leaflet.css";
import {useAppSelector} from "hooks/useAppSelector";
import useInterval from "hooks/useInterval";
import {Coordinates} from "models/dto/Coordinates";
import {MarkerData} from "models/interfaces/MarkerData";
import {BikeStatusValues} from "models/values/BikeStatusValues";
import {BikeTagValues} from "models/values/BikeTagValues";
import {useSnackbar} from "notistack";
import * as React from "react";
import {useEffect, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import {useLocation, useNavigate} from "react-router-dom";
import {getBikeMarkerData} from "services/bikes";
import {getOpenCoordsData} from "services/events";
import {getSpotMarkerData} from "services/spots";
import {getTripEndCoordsData, getTripStartCoordsData} from "services/trips";

import "./style.css";
import "../../../node_modules/leaflet-geosearch/dist/geosearch.css";
import {BikeStatusType, BikeTagType, BikeTechnician, GetSpotsNearbyOutputData} from "@bikairproject/shared";

const LoadingOverlay = React.lazy(() => import("components/LoadingOverlay"));
const MarkerDetailContainer = React.lazy(() => import("components/MakerDetailContainer"));
const BikeMapContent = React.lazy(() => import("components/BikesMap/BikesMapContent"));

export default function BikesMap() {
    const {enqueueSnackbar} = useSnackbar();
    const [endCoords, setEndCoords] = useState<Coordinates[]>([]);
    const [startCoords, setStartCoords] = useState<Coordinates[]>([]);
    const [openCoords, setOpenCoords] = useState<Coordinates[]>([]);
    const [bikes, setBikes] = useState<Map<string, BikeTechnician>>(new Map());
    const [bikesData, setBikesData] = useState<BikeTechnician[]>([]);
    const [spots, setSpots] = useState<Map<string, GetSpotsNearbyOutputData>>(new Map());
    const [spotsData, setSpotsData] = useState<GetSpotsNearbyOutputData[]>([]);
    const [loading, setLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState<number | null>(null);
    const [bikesStatusFilter, setBikesStatusFilter] = useState<BikeStatusType[]>(BikeStatusValues);
    const [bikesTagsFilter, setBikesTagsFilter] = useState<BikeTagType[]>(BikeTagValues);
    const [spotsFilter, setSpotsFilter] = useState(false);
    const [marker, setMarker] = useState<MarkerData | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    //Update data list on changes
    useEffect(() => {
        updateBikesData(bikesStatusFilter, bikesTagsFilter);
        updateSpotsData(spotsFilter);
    }, [spots, bikes]);

    let loadingCount = 0;

    const map = useAppSelector(state => state.map);
    const center = {
        lat: map.lat,
        lng: map.lng
    };
    const zoom = map.zoom;

    const setLoadingStatus = (value: boolean) => {
        loadingCount = loadingCount + (value ? 1 : -1);
        if (loadingCount === 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    };

    const updateBikeData = (data: BikeTechnician[]) => {
        const newBikeMap = new Map(bikes);
        for (const bike of data) {
            newBikeMap.set(bike.uuid, bike);
        }
        setBikes(newBikeMap);
    };

    const getBikeMarkers = async (withLoading = false) => {
        if (withLoading) {
            setLoadingStatus(true);
        }
        try {
            const data = await getBikeMarkerData(lastUpdate);
            updateBikeData(data.rows);
            setLastUpdate(data.lastUpdate);
        } catch (error: any) {
            setBikes(new Map());
            if (error.response?.status !== 401) {
                enqueueSnackbar(`Erreur lors de la récupération des vélos [${error.response?.status}]`, {
                    variant: "error"
                });
            }
        } finally {
            if (withLoading) {
                setLoadingStatus(false);
            }
        }
    };

    const updateSpotData = (data: GetSpotsNearbyOutputData[]) => {
        const newSpotMap = new Map(spots);
        for (const spot of data) {
            newSpotMap.set(spot.uuid, spot);
        }
        setSpots(newSpotMap);
    };

    const getSpotMarkers = async (withLoading = false) => {
        if (withLoading) {
            setLoadingStatus(true);
        }
        try {
            const data = await getSpotMarkerData();
            updateSpotData(data.rows);
        } catch (error: any) {
            setSpots(new Map());
            if (error.response.status !== 401) {
                enqueueSnackbar(`Erreur lors de la récupération des spots [${error.response?.status}]`, {
                    variant: "error"
                });
            }
        } finally {
            if (withLoading) {
                setLoadingStatus(false);
            }
        }
    };

    const getTripEndCoords = async (withLoading = false) => {
        if (withLoading) {
            setLoadingStatus(true);
        }
        try {
            const endCoords = await getTripEndCoordsData();
            setEndCoords(endCoords);
        } catch (error: any) {
            setEndCoords([]);
            if (error.response?.status !== 401) {
                enqueueSnackbar(`Erreur lors de la récupération des coordonnées de fin de trajet [${error.response?.status}]`, {
                    variant: "error"
                });
            }
        } finally {
            if (withLoading) {
                setLoadingStatus(false);
            }
        }
    };

    const getTripStartCoords = async (withLoading = false) => {
        if (withLoading) {
            setLoadingStatus(true);
        }
        try {
            const startCoords = await getTripStartCoordsData();
            setStartCoords(startCoords);
        } catch (error: any) {
            setStartCoords([]);
            if (error.response.status !== 401) {
                enqueueSnackbar(`Erreur lors de la récupération des coordonnées de début de trajet [${error.response?.status}]`, {
                    variant: "error"
                });
            }
        } finally {
            if (withLoading) {
                setLoadingStatus(false);
            }
        }
    };

    const getTripOpenCoords = async (withLoading = false) => {
        if (withLoading) {
            setLoadingStatus(true);
        }
        try {
            const openCoords = await getOpenCoordsData();
            setOpenCoords(openCoords);
        } catch (error: any) {
            setOpenCoords([]);
            if (error.response.status !== 401) {
                enqueueSnackbar(`Erreur lors de la récupération des coordonnées d'ouverture d'application' [${error.response?.status}]`, {
                    variant: "error"
                });
            }
        } finally {
            if (withLoading) {
                setLoadingStatus(false);
            }
        }
    };

    // Fetch bikes when we arrive on map screen
    useEffect(() => {
        if (location.pathname === "/map") {
            getBikeMarkers(true).then(() => console.log(""));
        }
    }, [location]);

    //Fetch bikes at loading
    useEffect(() => {
        getBikeMarkers(true).finally(() => console.log(""));
        getSpotMarkers(true).finally(() => console.log(""));
        getTripEndCoords(true).finally(() => console.log(""));
        getTripStartCoords(true).finally(() => console.log(""));
        getTripOpenCoords(true).finally(() => console.log(""));
    }, []);

    // Fetch data every 30s
    useInterval(() => {
        if (!bikesStatusFilter && !bikesTagsFilter && !spotsFilter) {
            getBikeMarkers(false).finally(() => console.log(""));
        }
    }, 30000);

    const updateBikesData = (filterStatus: BikeStatusType[], filterTags: BikeTagType[]) => {
        const filtered: BikeTechnician[] = [];
        bikes.forEach((value) => {
            if (filterStatus.includes(value.status as BikeStatusType)
                && filterTags.some(t => value.tags.includes(t))) {
                filtered.push(value);
            }
        });
        setBikesData(filtered);
    };

    const updateSpotsData = (status: boolean) => {
        if (status) {
            setSpotsData(Array.from(spots.values()));
        } else {
            setSpotsData([]);
        }
    };

    const handleBikeFilterStatusChange = (status: BikeStatusType[]) => {
        setBikesStatusFilter(status);
        updateBikesData(status, bikesTagsFilter);
    };

    const handleLoading = (value: boolean) => {
        setLoading(value);
    };

    const handleBikeFilterTagsChange = (tags: BikeTagType[]) => {
        setBikesTagsFilter(tags);
        updateBikesData(bikesStatusFilter, tags);
    };

    const handleSpotFilterChange = (filter: boolean) => {
        setSpotsFilter(filter);
        updateSpotsData(filter);
    };

    const handleMarkerClick = (d: MarkerData) => {
        setMarker(d);
    };

    const handleDetailsClick = (d: MarkerData) => {
        if (marker?.marker_type === "BIKE") {
            navigate(`bikes/${d.id}`);
        }
    };

    const handleCloseClick = () => {
        setMarker(null);
    };

    return (
        // Important! Always set the container height explicitly
        <div>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{
                    height: "90vh",
                    width: "100%"
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <React.Suspense fallback={<div></div>}>
                    <BikeMapContent
                        bikes={bikesData}
                        spots={spotsData}
                        setLoading={handleLoading}
                        endCoordsData={endCoords}
                        startCoordsData={startCoords}
                        openCoordsData={openCoords}
                        onBikeFilterStatusChange={handleBikeFilterStatusChange}
                        onBikeFilterTagsChange={handleBikeFilterTagsChange}
                        onSpotFilterChange={handleSpotFilterChange}
                        onMarkerClick={handleMarkerClick}
                    />
                </React.Suspense>
            </MapContainer>
            <React.Suspense fallback={<div></div>}>
                <MarkerDetailContainer
                    marker={marker}
                    onClose={handleCloseClick}
                    onDetailsClick={handleDetailsClick}
                />
            </React.Suspense>
            <React.Suspense fallback={<div></div>}>
                <LoadingOverlay open={loading}/>
            </React.Suspense>
        </div>
    );
}
