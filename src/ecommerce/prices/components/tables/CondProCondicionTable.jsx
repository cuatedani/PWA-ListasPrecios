//Equipo 2: React
import React, { useEffect, useState } from "react";
//Equipo 2: Material UI
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { darken } from '@mui/system';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    showMensajeConfirm,
    showMensajeError,
} from "../../../../share/components/elements/messages/MySwalAlerts";
//Equipo 2: DB
import { PatchOnePriceList } from '../../services/remote/patch/PatchOnePriceList';
//Equipo 2: Modals
//import AddCondProCondicionModal from "../modals/AddCondProCondicionModal";
//import UpdateCondProCondicionModal from "../modals/UpdateCondProCondicionModal";
//Equipo 2: Redux
import { useSelector } from "react-redux";

//Equipo 2: Columns Table Definition.
const CondProCondicionColumns = [
    {
        accessorKey: "IdEtiqueta",
        header: "ID ETIQUETA",
        size: 150, //small column
    },
    {
        accessorKey: "Etiqueta",
        header: "ETIQUETA",
        size: 150, //small column
    },
    {
        accessorKey: "IdOpComparaValores",
        header: "ID OPERADOR COMPARA VALORES",
        size: 150, //small column
    },
    {
        accessorKey: "IdOpLogicoEtiqueta",
        header: "ID OPERADORO LOGICO ETIQUETA",
        size: 150, //small column
    },
];
//Equipo 2: Table - FrontEnd.
const CondProCondicionTable = () => {
    //Equipo 2: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //Equipo 2: controlar el estado de la data de CondProCondicion.
    const [CondProCondicionData, setCondProCondicionData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondProCondicion.
    const [AddCondProCondicionShowModal, setAddCondProCondicionShowModal] = useState(false);

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={CondProCondicionColumns}
                    data={CondProCondicionData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                        <IconButton
                                            //onClick={() => setAddCondProCondicionShowModal(true)}
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Detalles ">
                                        <IconButton>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            {/* ------- BARRA DE ACCIONES FIN ------ */}
                        </>
                    )}
                />
            </Box>
            {/* M O D A L E S */}
        </Box>
    );
};
export default CondProCondicionTable;