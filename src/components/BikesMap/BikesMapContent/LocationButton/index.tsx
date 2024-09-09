import MyLocationIcon from "@mui/icons-material/MyLocation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AppMapControl from "components/BikesMap/AppMapControl";

import "./style.css";

type LocationButtonPropsType = {
    onClick: () => void,
}

export default function LocationButton (props: LocationButtonPropsType) {
    const { onClick } = props;

    const handleClick = () => {
        onClick();
    };

    return (
        <AppMapControl position="bottomright">
            <Box className="app-map-controls">
                <IconButton onClick={handleClick} aria-label="location-control-button">
                    <MyLocationIcon sx={{ fontSize: 33 }}/>
                </IconButton>
            </Box>
        </AppMapControl>
    );
}
