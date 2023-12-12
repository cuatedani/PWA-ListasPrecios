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
import AddPriceListModal from "../modals/AddPriceListModal";
//Equipo 2: Columns Table Definition.
const PricesListColumns = [
    {
        accessorKey: "IdInstitutoOK",
        header: "ID INSTITUTO OK",
        size: 150, //small column
    },
    {
        accessorKey: "IdListaOK",
        header: "ID LISTA OK",
        size: 150, //small column
    },
    {
        accessorKey: "IdListaBK",
        header: "ID LISTA BK",
        size: 150, //small column
    },
    {
        accessorKey: "DesLista",
        header: "DESCRIPCIÓN",
        size: 150, //small column
    },
    {
        accessorKey: "FechaExpiraIni",
        header: "FECHA EXPIRACIÓN INICIO",
        size: 150, //small column
    },
    {
        accessorKey: "FechaExpiraFin",
        header: "FECHA EXPIRACIÓN FINAL",
        size: 150, //small column
    },
    {
        accessorKey: "IdTipoListaOK",
        header: "TIPO LISTA",
        size: 150, //small column
    },
    {
        accessorKey: "IdTipoGeneraListaOK",
        header: "TIPO  GENERA LISTA",
        size: 150, //small column
    },
    {
        accessorKey: "IdListaBaseOK",
        header: "ID LISTA BASE",
        size: 150, //small column
    },
    {
        accessorKey: "IdTipoFormulaOK",
        header: "ID TIPO  FORMULA  OK",
        size: 150, //small column
    },
];

//Equipo 2: Table - FrontEnd.
const PricesListTable = () => {
    //Equipo 2: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //Equipo 2: controlar el estado de la data de Institutos.
    const [PricesListData, setPricesListData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo Instituto.
    const [AddPriceListShowModal, setAddPriceListShowModal] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const AllPricesListData = await getAllPricesList();
                setPricesListData(AllPricesListData);
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
                    columns={PricesListColumns}
                    data={PricesListData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                        <IconButton
                                            onClick={() => setAddPriceListShowModal(true)}
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
            <Dialog open={AddPriceListShowModal}>
                <AddPriceListModal
                    AddPriceListShowModal={AddPriceListShowModal}
                    setAddPriceListShowModal={setAddPriceListShowModal}
                    onClose={() => setAddPriceListShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};

export default PricesListTable;