import {DivIcon, Point} from "leaflet";

export class MarkerSvg extends DivIcon {
    constructor(html: string) {
        super({
            iconSize: new Point(35, 46),
            iconAnchor: new Point(17, 46),
            className: "marker-pin",
            html: html
        });
    }
}
