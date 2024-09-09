import {Box, Stack, Typography} from "@mui/material";
import {Parking} from "assets";
import React from "react";

import "./style.css";
import {GetSpotsNearbyOutputData} from "@bikairproject/shared";

type SpotMarkerDetailProps = {
    marker: GetSpotsNearbyOutputData
}

export default function SpotMarkerDetail(props: SpotMarkerDetailProps) {
    const {marker} = props;

    const renderNbBikes = () => {
        if (marker.bike_ids && marker.max_bikes !== null) {
            const maxBikes = marker.max_bikes;
            const nbBikes = marker.bike_ids.length;
            let remaining = maxBikes - nbBikes;
            if (remaining < 0) {
                remaining = 0;
            }

            return (
                <Stack style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 30,
                    marginBottom: -20
                }}>
                    <Typography style={{color: "#8D8D8D"}}>
                        {nbBikes}/{maxBikes} vélos
                    </Typography>
                    <Typography style={{color: "#8D8D8D"}}>
                        {remaining} places disponibles
                    </Typography>
                </Stack>
            );
        } else {
            return null;
        }
    };

    return (
        <Box>
            <Stack spacing={1} direction={"row"} style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: "90%",
                margin: -15
            }}>
                <img
                    src={Parking}
                    alt={"Parking Icon"}
                    style={{
                        width: 50,
                        height: 50,
                    }}/>
                <Box>
                    <Typography style={{
                        marginTop: marker.address ? 0 : 15
                    }}>
                        {marker.name ?? "Spot"}
                    </Typography>
                    {marker.address && (
                        <Typography style={{fontSize: 13}}>
                            <a
                                style={{textDecoration: "none", color: "#00A9D2"}}
                                href={`https://www.google.com/maps/search/?api=1&query=${marker.address}`}
                                target="_blank"
                            >
                                {marker.address}
                            </a>
                        </Typography>
                    )}
                </Box>
            </Stack>
            {renderNbBikes()}
        </Box>
    );
}
