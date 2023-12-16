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
//import AddNegociosModal from "../modals/AddNegociosModal";
//import EditNegociosModal from "../modals/UpdateNegociosModal";
//Equipo 2: Redux
import { useSelector } from "react-redux";

//Equipo 2: Columns Table Definition.
const NegociosColumns = [
    {
        accessorKey: "IdNegocioOK",
        header: "ID NEGOCIO",
        size: 150, //small column
    }
];

//Equipo 2: Table - FrontEnd.
const NegociosTable = () => {
    //Equipo 2: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    //Equipo 2: controlar el estado de la data de Negocios.
    const [NegociosData, setNegociosData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo Negocios.
    const [AddNegociosShowModal, setAddNegociosShowModal] = useState(false);
    //Equipo 2: controlar el estado que muesta u oculta la modal de editar Negocios.
    const [EditNegociosShowModal, setEditNegociosShowModal] = useState(false);
    //Equipo 2: Controlar la seleccion de datos
    // Indice de la fila, Id de la fila, datos de la fila
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [idRowSel, setIdRowSel] = useState(null);
    const [RowData, setRowData] = useState(null);
    const [SelectedPriceListData, setSelectedPriceListData] = useState(null);
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const priceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", priceListData);

    //Equipo 2: useEffect para cargar datos en la tabla
    useEffect(() => {
        async function fetchData() {
            try {
                setSelectedPriceListData(priceListData);
                setNegociosData(priceListData.cat_listas_negocios);
                setLoadingTable(false);
                setSelectedRowIndex(null);
                setIdRowSel(null);
            } catch (error) {
                console.error("Error al obtener los Negocios en useEffect de NegociosTable:", error);
            }
        }
        fetchData();
    }, [priceListData]);

    //Equipo 2: Metodo para seleccionar la data de una fila
    //Este es el metodo para seleccionar la orden de la tabla
    useEffect(() => {
        const handleRowClick = (index) => {
            const clickedRow = NegociosData[index];
            if (clickedRow) {
                console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdNegocioOK);
                setIdRowSel(clickedRow.IdNegocioOK);
                setSelectedRowIndex(index);
                setRowData(clickedRow);
            }
        };
        //Delimita el rango de selecion en la tabla
        const rows = document.querySelectorAll(".MuiTableRow-root");
        rows.forEach((row, index) => {
            row.addEventListener("click", () => handleRowClick(index - 1));
        });
    }, [NegociosData]);

    //Equipo 2: Metodo para eliminar un Negocios
    const Delete = async () => {
        const res = await showMensajeConfirm(
            `¿Estás seguro de eliminar el documento: ${idRowSel}? No podrás revertir esta acción. ¿Deseas continuar?`
        );

        if (res) {
            try {
                // Filtrar los elementos distintos al que queremos eliminar
                const updatedNegociosData = NegociosData.filter(
                    Negocios => Negocios.IdNegocioOK !== idRowSel
                );

                // Actualizar el array en el objeto
                setNegociosData(updatedNegociosData);

                SelectedPriceListData.cat_listas_negocios = NegociosData;

                // Actualizar el documento PriceList
                await PatchOnePriceList(SelectedPriceListData.IdListaOK, SelectedPriceListData);

                showMensajeConfirm("Documento Eliminado");
                fetchData();
            } catch (e) {
                console.error("Error al Eliminar:", e);
                showMensajeError(`No se pudo Eliminar el Documento ${idRowSel}`);
            }
        }
    };

    //Equipo 2: Metodo para editar un Negocio
    const Edit = async () => {
        if (RowData) {
            setEditNegociosShowModal(true)
        } else {
            await showMensajeConfirm(
                `Primero Seleccione una Fila`
            );
        }
    };

    //Equipo 2: Metodo para mostrar detalles
    const Details = async () => {
        await showMensajeConfirm(
            `Mostrando Detalles`
        );
    };

    //Equipo 2: Estructura de la Tabla
    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={NegociosColumns}
                    data={NegociosData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    enableColumnActions={false}
                    localization={MRT_Localization_ES}
                    enableStickyHeader
                    muiTableContainerProps={{
                        sx: {
                            "&::-webkit-scrollbar": { display: "none" },
                            msOverflowStyle: "none",
                            scrollbarWidth: "none",
                            overflow: "auto",
                            width: "parent",
                        },
                    }}
                    positionToolbarAlertBanner="bottom"
                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    {/* ------- AGREGAR ------ */}
                                    <Tooltip title="Agregar">
                                        <IconButton
                                        onClick={() => setAddPresentaPreciosShowModal(true)}
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ------- EDITAR ------ */}
                                    <Tooltip title="Editar">
                                        <IconButton
                                        onClick={() => Edit()}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ------- ELIMINAR ------ */}
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                        onClick={() => Delete()}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ------- DETALLES ------ */}
                                    <Tooltip title="Detalles ">
                                        <IconButton
                                        onClick={() => Details()}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            {/* ------- BARRA DE ACCIONES FIN ------ */}
                        </>
                    )}
                    muiTableBodyRowProps={({ row }) => ({
                        onClick: () => {
                            setSelectedRowIndex(row.id);
                        },
                        sx: {
                            cursor: loadingTable ? "not-allowed" : "pointer",
                            backgroundColor:
                                selectedRowIndex === row.id ? darken("#EFF999", 0.01) : "inherit",
                        },
                    })}
                />
            </Box>
            {/* ADD MODAL */}
            <Dialog open={AddNegociosShowModal}>
                <AddNegociosModal
                    AddPriceListShowModal={AddNegociosShowModal}
                    setAddPriceListShowModal={setAddNegociosShowModal}
                    onClose={() => {
                        setAddNegociosShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
            {/* EDIT MODAL */}
            <Dialog open={EditNegociosShowModal}>
                <EditNegociosModal
                    EditNegociosShowModal={EditNegociosShowModal}
                    setEditNegociosShowModal={setEditNegociosShowModal}
                    RowData={RowData}
                    onClose={() => {
                        setEditNegociosShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
        </Box>
    );
};
export default NegociosTable;