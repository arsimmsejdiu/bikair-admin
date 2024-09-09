import "react-medium-image-zoom/dist/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import {ModalChildrenProps} from "models/interfaces/ModalChildrenProps";
import * as React from "react";
import {ReactNode, useState} from "react";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface ModalProps extends ModalChildrenProps {
    buttonTitle: string,
    colorButton?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    children?: React.FC<ModalChildrenProps> | ReactNode
}

const Modals: React.FC<ModalProps> = (
    {
        buttonTitle,
        colorButton,
        onOpen,
        onClose,
        children,
        onValidate,
        onCancel
    }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (typeof onOpen !== "undefined") {
            onOpen();
        }
        setOpen(true);
    };

    const handleClose = () => {
        console.log("call on close in modal");
        if (typeof onClose !== "undefined") {
            onClose();
        }
        setOpen(false);
    };

    const handleValidate = () => {
        if (typeof onValidate !== "undefined") {
            onValidate();
        }
    };

    const handleCancel = () => {
        if (typeof onCancel !== "undefined") {
            onCancel();
        }
    };

    // const renderChildren = () => {
    //     console.log("typeof children = ", typeof children);
    //     if((typeof children === "function" || typeof children === "object" || typeof children === "string") && children !== null) {
    //         return children({
    //             onCancel: handleCancel,
    //             onValidate: handleValidate,
    //             onOpen: handleOpen,
    //             onClose: handleClose
    //         });
    //     } else {
    //         return children;
    //     }
    // };

    return (
        <div>
            <Button
                variant="contained"
                color={colorButton ?? "primary"}
                component="label"
                onClick={handleOpen}>
                {buttonTitle}
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box style={{position: "absolute", top: 10, right: 10}}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        {children}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default Modals;
