import "leaflet.heat";
import L from "leaflet";
import { Coordinates } from "models/dto/Coordinates";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

type HeatLayerPropsType = {
    data: Coordinates[],
    n: number,
}

export default function HeatLayer (props: HeatLayerPropsType) {
    const {
        data,
        n
    } = props;
    const map = useMap();
    const [heatLayer, setHeatLayer] = useState(null);

    useEffect(() => {
        const points = data
            ? data.map((p) => {
                return [p.coordinates[1], p.coordinates[0], 1]; // lat lng intensity
            })
            : [];
        if (heatLayer !== null) {
            //We remove layer otherwise heat point stay and stack
            map.removeLayer(heatLayer);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const newHeatLayer = L.heatLayer(points);
        newHeatLayer.addTo(map);
        setHeatLayer(newHeatLayer);
    }, [n]);

    return null;
}
