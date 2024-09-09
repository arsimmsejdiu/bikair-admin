import DirectionsIcon from "@mui/icons-material/Directions";
import {Box} from "@mui/material";
import {TypographyAtomic} from "Atomic/TypographyAtomic";

type AddressPropsType = {
    address: string | null;
};

export default function Address(props: AddressPropsType) {
    const {address} = props;

    return (
        <Box>
            <TypographyAtomic
                variant="body1"
                sx={{
                    flexDirection: "row",
                }}
            >
                <DirectionsIcon sx={{
                    fontSize: 25,
                    color: "#287CC2"
                }}/>
                {address || "Pas d'adresse"}
            </TypographyAtomic>
        </Box>
    );
}
