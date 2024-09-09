import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {table} from "assets";
import {POST_SPOT_UPLOAD_CSV} from "config/endpoints";
import {useSnackbar} from "notistack";
import React, {useState} from "react";
import Zoom from "react-medium-image-zoom";
import {instanceFormData} from "services/http";

const ImportFileContent = () => {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const {enqueueSnackbar} = useSnackbar();

    const handleChange = (e: any) => {
        setFileName(e.target.files[0].name);
        setFile(e.target.files[0]);
    };

    const sendFile = async () => {
        setLoading(true);
        if (file !== null) {
            const formData = new FormData();
            formData.append("file", file);

            await instanceFormData.post(POST_SPOT_UPLOAD_CSV, formData).then(() => {
                enqueueSnackbar("Spot ajouter avec succès !", {
                    variant: "success",
                });
            }).catch((error: any) => {
                console.log(error);
                if (error.response.status !== 401) {
                    enqueueSnackbar(`Erreur lors de la récupération des données [${error.response.status}]`, {
                        variant: "error"
                    });
                }
            }).finally(() => setLoading(false));
        }
        setFile(null);
        setFileName("");
    };

    return (
        <Box>
            {loading ? (
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <CircularProgress/>
                </Box>
            ) : (
                <div>
                    <Typography id="transition-modal-title" variant="h6" component="h2"
                        style={{display: "flex", justifyContent: "center"}}>
                        Le fichier doit contenir:
                    </Typography>
                    <Typography id="transition-modal-title" variant="subtitle1" component="p">
                        - Le fichier doit contenir les en-tête suivantes:
                    </Typography>
                    <Typography id="transition-modal-title" variant="subtitle1" component="p">
                        <code><b>name, city_name, latitude, longitude</b></code>
                    </Typography>
                    <Typography id="transition-modal-title" variant="subtitle1" component="p">
                        - Le fichier doit etre au format <b>.csv</b>
                    </Typography>
                    <Typography id="transition-modal-title" variant="subtitle1" component="p">
                        - Le <b>city_name</b> doit correspondre au nom en base de donnee
                    </Typography>
                    <Typography id="transition-modal-title" variant="subtitle1" component="p">
                        - Les coordonnees doivent avoir un point <b>(.)</b> et pas une
                        virgule <b>(,)</b> pour separer la valeur decimale, exemple dans photo:
                    </Typography>
                    <div style={{paddingTop: 20}}>
                        <Zoom>
                            <img src={table} alt={"csv example"} width={"100%"} height={"100%"}/>
                        </Zoom>
                    </div>
                    <Stack spacing={1} direction={"row"} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Stack spacing={1} direction={"row"} style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start"
                        }}>
                            <Button variant="outlined" component="label" style={{marginTop: 20}}>
                                {fileName ? "reimporter" : "importer"}
                                <input hidden accept="text/csv" type="file" name={"file"}
                                    onChange={handleChange}/>
                            </Button>
                            <Typography id="transition-modal-title" variant="subtitle1" component="p"
                                style={{marginTop: 20}}>
                                {fileName ? `${fileName}` : null}
                            </Typography>
                        </Stack>
                        {fileName ? (
                            <Button variant="outlined" color={"success"} style={{marginTop: 20}}
                                onClick={sendFile}>
                                envoyer
                            </Button>
                        ) : null}
                    </Stack>
                </div>
            )}
        </Box>
    );
};

export default ImportFileContent;
