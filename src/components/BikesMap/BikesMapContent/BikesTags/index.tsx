import {Box} from "@mui/material";
import {TypographyAtomic} from "Atomic/TypographyAtomic";
import {useTranslation} from "react-i18next";

import "./style.css";

type BikeTagsProps = {
    tags: string[],
};

export default function BikesTags(props: BikeTagsProps) {
    const {t} = useTranslation();
    return (
        <Box className="marker-detail-content-wrap">
            <TypographyAtomic>
                {
                    props.tags.map((tag: string, index: number) => {
                        return <span key={index} className="tag">{t(`translation.bike.tags.${tag}`)}</span>;
                    })
                }
            </TypographyAtomic>
        </Box>

    );
}
