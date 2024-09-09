import {markerPosition} from "assets";
import {LatLngExpression} from "leaflet";
import {MarkerIcon} from "models/interfaces/MarkerIcon";
import {Circle, Marker} from "react-leaflet";

import "./style.css";

type PrecisionLayerPropsType = {
    position: LatLngExpression | null,
    radius: number,
}

export default function PrecisionLayer (props: PrecisionLayerPropsType) {
    const {
        position,
        radius
    } = props;

    const renderImage = (): MarkerIcon => {
        return new MarkerIcon(markerPosition);
    };

    if (position !== null) {
        return (
            <div>
                <Marker position={position} icon={renderImage()}/>
                <Circle radius={radius} center={position}/>
            </div>
        );
    } else {
        return null;
    }
}
