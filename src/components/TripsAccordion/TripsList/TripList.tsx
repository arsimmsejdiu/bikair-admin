import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SkeletonLoadLong } from "assets";
import { TripElement } from "components/TripsAccordion/TripElement/TripElement";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { GetTripsOutput, GetTripsOutputData } from "@bikairproject/shared";

interface TripListProps {
    data: GetTripsOutput | null;
    tripsLoading: boolean;
}

export const TripList = ({data, tripsLoading}: TripListProps) => {
    const [trips, setTrips] = useState<GetTripsOutput| null>(null);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [filterStatus, setFilterStatus] = useState("");

    const { t } = useTranslation();

    useEffect(() => {
        setTrips(data);
    }, [data]);

    return (
        <Accordion expanded={expanded} onChange={() => setExpanded(oldValue => !oldValue)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
            >
                <Typography component={"span"} sx={{
                    width: "33%",
                    flexShrink: 0
                }}>{t("user_list.trip_lists")} </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    variant="standard"
                    label={"Recherche par status ... "}
                    placeholder="trajets ... "
                    onChange={(e) => setFilterStatus(e.target.value.toUpperCase())}
                    style={{
                        width: 200,
                        marginBottom: 20,
                        marginTop: -20
                    }}
                />
                <Stack spacing={1} style={{
                    height: "400px",
                    overflowY: "scroll",
                    scrollbarWidth: "thin"
                }}>
                    {tripsLoading ?
                        <SkeletonLoadLong/>
                        :
                        trips?.rows.filter((trip: GetTripsOutputData) => {
                            return (trip.status ?? "").toUpperCase().includes(filterStatus.toUpperCase());
                        }).map((trip: GetTripsOutputData, index: number) => (
                            <div key={index}>
                                <TripElement data={trip}/>
                            </div>
                        ))}
                </Stack>

            </AccordionDetails>
        </Accordion>
    );
};

