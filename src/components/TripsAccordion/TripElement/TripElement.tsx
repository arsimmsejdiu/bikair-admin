import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Grid, Paper} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { COLORS } from "assets";
import React, { useState } from "react";
import { formatPriceWithLocal, formatTimestamp } from "services/utils";

import { GetTripsOutputData } from "@bikairproject/shared";

interface TripElementProps {
    data: GetTripsOutputData;
}

export const TripElement = ({ data }: TripElementProps) => {
    const {
        bike_id,
        bike_name,
        city_name,
        status,
        discounted_amount,
        discount_code,
        duration,
        price,
        start_address,
        end_address,
        start_coords,
        end_coords,
        time_end,
        time_start
    } = data;
    const [expanded, setExpanded] = useState<boolean>(false);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    return (
        <Accordion
            style={{
                backgroundColor: COLORS.bgGreenColor,
                color: COLORS.greenColor,
                width: "100%"
            }}
            expanded={expanded} onChange={() => setExpanded(oldValue => !oldValue)}
        >
            <AccordionSummary
                style={{ width: "100%" }}
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
            >
                <Typography component={"span"} sx={{
                    width: "33%",
                    flexShrink: 0
                }}>{status} </Typography>
                <Typography component={"span"} sx={{
                    width: "33%",
                    flexShrink: 0
                }}>{formatTimestamp(new Date(Number(time_start)))} </Typography>
            </AccordionSummary>
            <AccordionDetails style={{width: "97%"}}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>ID:</span> {bike_id}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Velo:</span> {bike_name}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Ville:</span> {city_name}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Statut:</span> {status}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Discount code:</span> {discount_code}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Discount amount:</span> {discounted_amount}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Durée:</span> {duration}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Prix:</span> {formatPriceWithLocal(price ?? 0)}
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Start Address:</span> {start_address}
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>End Address:</span> {end_address}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Start Coordinates:</span> {start_coords}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>End Coordinates:</span> {end_coords}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Time start:</span> {formatTimestamp(new Date(Number(time_start)))}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <span style={{fontWeight: "bold", color: "black"}}>Time end:</span> {time_end ? formatTimestamp(new Date(Number(time_end))) : null}
                        </Item>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};
