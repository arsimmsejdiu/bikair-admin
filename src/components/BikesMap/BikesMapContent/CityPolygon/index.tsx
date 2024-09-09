import {LatLngLiteral} from "leaflet";
import {Polygon} from "react-leaflet";

import "./style.css";
import {CityPolygons} from "@bikairproject/shared";

type CityPolygonPropsType = {
    data: CityPolygons
}

export default function CityPolygon(props: CityPolygonPropsType) {
    const {data} = props;

    return (
        <Polygon pathOptions={{
            color: "blue",
            fillColor: "transparent"
        }} positions={(data.polygon?.coordinates[0] ?? []).map(c => {
            return {
                lat: c[1],
                lng: c[0]
            } as LatLngLiteral;
        })}/>
    );
}
