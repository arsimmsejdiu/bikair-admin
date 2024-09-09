import {Avatar, Box, Card, CardContent, Typography} from "@mui/material";
import {COLORS, Logo} from "assets";
import {TypographyAtomic} from "Atomic/TypographyAtomic";
import React, {memo} from "react";

import packageInfo from "../../../package.json";
import {AdminMe} from "@bikairproject/shared";

interface AccountProps {
    user: AdminMe | null
}

const AccountProfile = ({user}: AccountProps) => {
    const version = packageInfo.version;

    return (
        <Card>
            <CardContent>
                <Box sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Avatar
                        src={Logo}
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80,
                            resize: "inherit"
                        }}
                    />
                    <Typography
                        gutterBottom
                        variant="h5">
                        {user ? user.firstname : "John"}{" "}{user ? user.lastname : "Wick"}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {user ? user.email : "someone@somwhere.com"}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {user ? user.phone : ""}
                    </Typography>
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
                </Box>
            </CardContent>
        </Card>
    );
};

export default memo(AccountProfile);
