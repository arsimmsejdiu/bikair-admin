import { Icon, Point } from "leaflet";

export class MarkerIcon extends Icon {
    constructor (url: string) {
        super({
            iconSize: new Point(35, 46),
            iconAnchor: new Point(17, 46),
            className: "marker-pin",
            iconUrl: url,
            iconRetinaUrl: url,
        });
    }
}
