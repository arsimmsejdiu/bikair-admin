import {LatLngLiteral} from "leaflet";
import {Polygon} from "react-leaflet";

import "./style.css";
import {CityRedZones} from "@bikairproject/shared";

type CityRedZonePolygonPropsType = {
    data: CityRedZones
}

export default function CityRedZonePolygon(props: CityRedZonePolygonPropsType) {
    const {data} = props;

    return (
        <Polygon pathOptions={{
            color: "red",
            fillColor: "red"
        }} positions={(data.polygon?.coordinates[0] ?? []).map(c => {
            return {lat: c[1], lng: c[0]} as LatLngLiteral;
        })}/>
    );
}
