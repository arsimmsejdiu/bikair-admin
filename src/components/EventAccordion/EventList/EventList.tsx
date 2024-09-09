import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {CircularProgress} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {SkeletonLoadLong} from "assets";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {formatTimestamp} from "services/utils";

import {EventElement} from "../EventElement/EventElement";
import {GetUserEventLogsOutputData} from "@bikairproject/shared";

interface EventListProps {
    data: GetUserEventLogsOutputData[],
    eventsLoading: boolean
}

export const EventList = ({data, eventsLoading}: EventListProps) => {

    const [events, setEvents] = useState<GetUserEventLogsOutputData[]>([]);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [filterDate, setFilterDate] = useState("");

    const {t} = useTranslation();

    useEffect(() => {
        setEvents(data);
    }, [data]);

    const renderEvents = () => {
        if (eventsLoading) {
            return <CircularProgress color={"primary"}/>;
        }
        if (typeof events === "undefined" || events === null || events.length === 0) {
            return <p>Aucun évènements</p>;
        }
        return events.filter((event: GetUserEventLogsOutputData) => {
            const eventDate = new Date(event.date);
            return (formatTimestamp(eventDate) ?? "").toUpperCase().includes(filterDate);
        }).map((event: GetUserEventLogsOutputData, index: number) => (
            <div key={index}>
                {eventsLoading ? (<SkeletonLoadLong/>) : <EventElement data={event}/>}
            </div>
        ));
    };

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
                }}>{t("user_list.event_logs")} </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    variant="standard"
                    label={t("user_list.search_by")}
                    placeholder="dates ... "
                    onChange={(e) => setFilterDate(e.target.value.toUpperCase())}
                    style={{width: 200, marginBottom: 20, marginTop: -20}}
                />
                <Stack spacing={1} style={{height: "400px", overflowY: "scroll", scrollbarWidth: "thin"}}>
                    {renderEvents()}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
