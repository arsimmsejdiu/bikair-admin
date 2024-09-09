import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import {renderBgColors, renderColors} from "assets";
import React, {useEffect, useState} from "react";
import {formatTimestamp} from "services/utils";

import {GetUserEventLogsOutputData} from "@bikairproject/shared";

interface EventElementProps {
    data: GetUserEventLogsOutputData
}
export const EventElement = ({data}: EventElementProps) => {

    const [event, setEvent] = useState<GetUserEventLogsOutputData | null>(null);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        setEvent(data);
    }, [data]);

    if (event === null) {
        return null;
    }

    return (
        <Accordion style={{backgroundColor: renderBgColors(event.type), color: renderColors(event.type), width: "100%"}} expanded={expanded} onChange={() => setExpanded(oldValue => !oldValue)}>
            <AccordionSummary
                style={{width: "100%"}}
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
            >
                <span style={{width: "33%", flex: 1, overflowWrap: "break-word"}}>{event.type} </span>
                <span style={{width: "33%", flex: 1, overflowWrap: "break-word"}}>{formatTimestamp(new Date(event.date))} </span>
            </AccordionSummary>
            <AccordionDetails>
                <pre style={{width: "100%", flexWrap: "wrap"}}>
                    {JSON.stringify(event.metadata, undefined, 2)}
                </pre>
            </AccordionDetails>
        </Accordion>
    );
};
