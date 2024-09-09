import {Box, Card, Grid, ListItemButton, Typography} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
    AddRoadIcon,
    AdminPanelSettingsIcon,
    ConfirmationNumberIcon,
    CurrencyExchangeIcon,
    ElectricBikeIcon,
    LockIcon,
    MapIcon,
    PeopleAltIcon,
    RadarIcon,
    ReportIcon,
    RoomIcon,
    RunningWithErrorsIcon,
    StorefrontIcon,
    StyleIcon,
    TextSnippetIcon
} from "assets";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {dataRoutesValues} from "models/values/DataRoutesValues";
import * as React from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {setTitle} from "redux/slices/global";

export default function HomeScreen() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.global.me);

    useEffect(() => {
        dispatch(setTitle("Home"));
    }, []);

    const renderIcons = (title: string) => {
        switch (title) {
            case "Carte":
                return <MapIcon/>;
            case "Trajets":
                return <AddRoadIcon/>;
            case "Utilisateurs":
                return <PeopleAltIcon/>;
            case "Pass & Abonnement":
                return <ConfirmationNumberIcon/>;
            case "Vélos":
                return <ElectricBikeIcon/>;
            case "Marketing":
                return <StorefrontIcon/>;
            case "Promotions":
                return <StyleIcon/>;
            case "Notes":
                return <TextSnippetIcon/>;
            case "Roles":
                return <LockIcon/>;
            case "Rapports":
                return <ReportIcon/>;
            case "Spots":
                return <RoomIcon/>;
            case "Cautions":
                return <CurrencyExchangeIcon/>;
            case "Red Zones":
                return <RadarIcon/>;
            case "City Polygon":
                return <RunningWithErrorsIcon/>;
            default:
                return <AdminPanelSettingsIcon/>;
        }
    };

    const handleNavigationClick = (target: string) => {
        return () => navigate(target);
    };

    return (
        <Box>
            <Typography style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 20,
                fontSize: 20,
                fontWeight: "bold"
            }}>
                Où voulez-vous aller ?
            </Typography>
            <Grid container spacing={4} style={{padding: 30}}>
                <Grid style={{cursor: "pointer"}} item xs={12} md={6} lg={3}>
                    <Card>
                        <ListItemButton style={{padding: 30}} onClick={handleNavigationClick("/map")}>
                            <ListItemIcon>
                                <MapIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Carte"}/>
                        </ListItemButton>
                    </Card>
                </Grid>

                {dataRoutesValues.map((route) => {
                    return (
                        user?.access_rights.includes(`${route.accessRights}`) && (
                            <Grid key={route.title} style={{cursor: "pointer"}} item xs={12} md={6} lg={3}>
                                <Card>
                                    <ListItemButton
                                        style={{padding: 30}}
                                        key={route.title}
                                        onClick={handleNavigationClick(route.path)}
                                    >
                                        <ListItemIcon>
                                            {renderIcons(route.title)}
                                        </ListItemIcon>
                                        <ListItemText primary={route.title}/>
                                    </ListItemButton>
                                </Card>
                            </Grid>
                        )
                    );
                })}
            </Grid>
        </Box>
    );
}
