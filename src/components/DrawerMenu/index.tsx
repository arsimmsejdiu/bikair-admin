import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {TypographyAtomic} from "Atomic/TypographyAtomic";
import {useAppSelector} from "hooks/useAppSelector";
import {dataRoutesValues} from "models/values/DataRoutesValues";
import * as React from "react";
import {useNavigate} from "react-router-dom";

import packageInfo from "../../../package.json";
import {
    AddRoadIcon,
    AdminPanelSettingsIcon,
    CloseIcon,
    COLORS,
    ConfirmationNumberIcon,
    CurrencyExchangeIcon,
    ElectricBikeIcon,
    HomeIcon,
    LockIcon,
    Logo,
    MapIcon,
    MenuIcon,
    PeopleAltIcon,
    RadarIcon,
    ReportIcon,
    RoomIcon,
    RunningWithErrorsIcon,
    StorefrontIcon,
    StyleIcon,
    TextSnippetIcon
} from "../../assets";

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2, 0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
}));

const useStyles = makeStyles(() => ({
    drawer: {
        "&::-webkit-scrollbar": {
            width: "0.3em",
            backgroundColor: "rgba(255,255,255,0.5)",
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "1em",
            backgroundColor: "rgba(0,0,0,0.5)",
        },
    },
}));

const drawerWidth = 250;

export default function DrawerMenu() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const user = useAppSelector(state => state.global.me);
    const version = packageInfo.version;

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNavigationClick = (target: string) => {
        return () => {
            setDrawerOpen(!drawerOpen);
            navigate(target);
        };
    };

    const renderIcons = (title: string) => {
        switch (title) {
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
            case "Cautions":
                return <CurrencyExchangeIcon/>;
            case "Notes":
                return <TextSnippetIcon/>;
            case "Roles":
                return <LockIcon/>;
            case "Rapports":
                return <ReportIcon/>;
            case "Spots":
                return <RoomIcon/>;
            case "Red Zones":
                return <RadarIcon/>;
            case "City Polygon":
                return <RunningWithErrorsIcon/>;
            default:
                return <AdminPanelSettingsIcon/>;
        }
    };

    return (
        <Box>
            <Box sx={{textAlign: "left"}}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
            </Box>
            <Box
                component="nav"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    position: "absolute"
                }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    classes={{paper: classes.drawer}}
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: "block",
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    <div>
                        <DrawerHeader>
                            {/*<Typography style={{fontWeight: "bold", fontSize: 20}}>Backoffice</Typography>*/}
                            <img src={Logo} alt={"Bik'air logo"} style={{width: 55, height: 40}}/>
                            <IconButton onClick={handleDrawerToggle}>
                                <CloseIcon/>
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>
                        <List>
                            <ListItemButton onClick={handleNavigationClick("/home")}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Home"}/>
                            </ListItemButton>
                            <Divider/>
                            <ListItemButton onClick={handleNavigationClick("/map")}>
                                <ListItemIcon>
                                    <MapIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Carte"}/>
                            </ListItemButton>
                            <Divider/>
                            <List component="div" disablePadding>
                                {dataRoutesValues.map((dataRoute) => {
                                    return (
                                        user?.access_rights.includes(`${dataRoute.accessRights}`) && (
                                            <ListItemButton
                                                key={dataRoute.title}
                                                onClick={handleNavigationClick(dataRoute.path)}
                                            >
                                                <ListItemIcon>
                                                    {renderIcons(dataRoute.title)}
                                                </ListItemIcon>
                                                <ListItemText primary={dataRoute.title}/>
                                            </ListItemButton>
                                        )
                                    );
                                })}
                            </List>
                            <Divider/>
                        </List>
                        <TypographyAtomic
                            style={{
                                fontSize: 11,
                                color: COLORS.darkGrey,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 10,
                            }}
                            variant={"h6"}
                        >
                            backoffice V{version}
                        </TypographyAtomic>
                    </div>
                </Drawer>
            </Box>
        </Box>
    );
}
