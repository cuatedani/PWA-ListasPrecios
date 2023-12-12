//Equipo 2: React
import React, { useEffect, useMemo, useState } from "react";
//Equipo 2: Material UI
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//Equipo 2: DB
import { getAllPricesList } from '../../services/remote/get/getAllPricesList';
//Equipo 2: Modals
import AddPresentaPreciosModal from "../modals/AddPresentaPreciosModal";
//Equipo 2: Columns Table Definition.
const PresentaPreciosColumns = [
    {
        accessorKey: "IdProdServOK",
        header: "PRODUCTO SERVICIO",
        size: 150, //small column
    },
    {
        accessorKey: "IdPresentaBK",
        header: "PRESENTACIÓN",
        size: 150, //small column
    },
    {
        accessorKey: "IdTipoFormulaOK",
        header: "TIPO FORMULA",
        size: 150, //small column
    },
    {
        accessorKey: "Formula",
        header: "FROMULA",
        size: 150, //small column
    },
    {
        accessorKey: "Precio",
        header: "PRECIO",
        size: 150, //small column
    }
];
//Equipo 2: Table - FrontEnd.
const PresentaPreciosTable = () => {
    //Equipo 2: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //Equipo 2: controlar el estado de la data de PresentaPrecios.
    const [PresentaPreciosData, setPresentaPreciosData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo PresentaPrecios.
    const [AddPresentaPreciosShowModal, setAddPresentaPreciosShowModal] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const AllPricesListData = await getAllPricesList();
                setPresentaPrecios(AllPricesListData);
                //setInstitutesData(InstitutesStaticData);
                setLoadingTable(false);
            } catch (error) {
                console.error("Error al obtener las listas de precios en useEffect de PriceListTable:", error);
            }
        }
        fetchData();
    }, []);
    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={PresentaPreciosColumns}
                    data={PresentaPreciosData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                        <IconButton
                                            onClick={() => setAddPresentaPreciosShowModal(true)}
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
            <Dialog open={AddPresentaPreciosShowModal}>
                <AddPresentaPreciosModal
                    AddPresentaPreciosShowModal={AddPresentaPreciosShowModal}
                    setAddPresentaPreciosShowModal={setAddPresentaPreciosShowModal}
                    onClose={() => setAddPresentaPreciosShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};
export default PresentaPreciosTable;