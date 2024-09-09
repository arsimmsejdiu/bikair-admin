import L from "leaflet";
import React from "react";

const POSITION_CLASSES: Record<L.ControlPosition, string> = {
    bottomleft: "leaflet-bottom leaflet-left",
    bottomright: "leaflet-bottom leaflet-right",
    topleft: "leaflet-top leaflet-left",
    topright: "leaflet-top leaflet-right",
};

interface AppMapControlProps {
    position: L.ControlPosition;
    children: React.ReactNode;
}

export default function AppMapControl (props: AppMapControlProps) {
    const {
        position,
        children
    } = props;

    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.bottomright;

    return (
        <div className={positionClass}>
            <div className="leaflet-control leaflet-bar">{children}</div>
        </div>
    );
}
