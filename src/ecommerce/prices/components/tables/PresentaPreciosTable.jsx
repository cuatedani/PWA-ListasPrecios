//Equipo 2: React
import React, { useEffect, useState } from "react";
//Equipo 2: Material UI
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton, Dialog } from "@mui/material";
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
//Equipo 2: Services
import PatchOnePriceList from '../../services/remote/patch/PatchOnePriceList';
//Equipo 2: Modals
import AddPresentaPreciosModal from "../modals/AddPresentaPreciosModal";
import EditPresentaPreciosModal from "../modals/EditPresentaPreciosModal";
//REDUX
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";

//Equipo 2: Columns Table Definition.
const PresentaPreciosColumns = [
    {
        accessorKey: "IdProdServOK",
        header: "PRODUCTO",
        size: 150, //small column
    },
    {
        accessorKey: "IdPresentaOK",
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
    //Equipo 2: controlar el estado que muesta u oculta la modal de Edit PresentaPrecios.
    const [EditPresentaPreciosShowModal, setEditPresentaPreciosShowModal] = useState(false);
    //Equipo 2: Controlar la seleccion de datos
    // Indice de la fila, Id de la fila, datos de la fila
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [idRowSel, setIdRowSel] = useState(null);
    const [RowData, setRowData] = useState(null);
    const [SelectedPriceListData, setSelectedPriceListData] = useState(null);
    //Equipo 2: Dispatch para actualizar la data local
    const dispatch = useDispatch();
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const priceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", priceListData);

    //Equipo 2: useEffect para cargar datos en la tabla
    useEffect(() => {
        async function fetchData() {
            try {
                //Asignamos el PriceList obtenido mediante el Redux
                setSelectedPriceListData(priceListData);
                //Obtenemos los PresentaPrecios de PriceList
                setPresentaPreciosData(priceListData?.cat_listas_presenta_precios || []);

                //Reseteamos Indices
                setLoadingTable(false);
                setSelectedRowIndex(null);
                setIdRowSel(null);
            } catch (error) {
                console.error("Error al obtener las Presentaciondes de Precios en useEffect de PresentaPreciosTable:", error);
            }
        }
        fetchData();
    }, [priceListData]);

    //Metodo Para Actualizar Data
    const Reload = async () => {
        //Asignamos el PriceList obtenido mediante el Redux
        setSelectedPriceListData(priceListData);
        //Obtenemos los PresentaPrecios de PriceList
        setCondicionRolesData(priceListData.cat_listas_presenta_precios);

        //Reseteamos Indices
        setLoadingTable(false);
        setSelectedRowIndex(null);
        setIdRowSel(null);
        setRowData(null);
    };

    //Equipo 2: Metodo para seleccionar la data de una fila
    //Este es el metodo para seleccionar la orden de la tabla
    useEffect(() => {
        const handleRowClick = (index) => {
            const clickedRow = PresentaPreciosData[index];
            if (clickedRow) {
                console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdPresentaOK);
                setIdRowSel(clickedRow.IdPresentaOK);
                setSelectedRowIndex(index);
                setRowData(clickedRow);
            }
        };
        //Delimita el rango de selecion en la tabla
        const rows = document.querySelectorAll(".MuiTableRow-root");
        rows.forEach((row, index) => {
            row.addEventListener("click", () => handleRowClick(index - 1));
        });
    }, [PresentaPreciosData]);

    //Equipo 2: Metodo para eliminar una Presentacion de Precios
    const Delete = async () => {
        if (RowData) {
            const res = await showMensajeConfirm(
                `¿Estás seguro de eliminar el documento <<SELECCIONADO>>? No podrás revertir esta acción. ¿Deseas continuar?`
            );

            if (res) {
                try {
                    // Equipo 2: Encuentra el índice del elemento en PresentaPreciosData que coincide con RowData
                    const indexToUpdate = PresentaPreciosData.findIndex(item => (
                        item.IdProdServOK === RowData.IdProdServOK
                        && item.IdPresentaOK === RowData.IdPresentaOK
                        && item.IdTipoFormulaOK === RowData.IdTipoFormulaOK
                        && item.Formula === RowData.Formula
                        && item.Precio === RowData.Precio
                    ));

                    // Equipo 2: Si se encuentra el índice, elimina ese elementoo
                    const updatedPresentaPreciosData = [...PresentaPreciosData];
                    if (indexToUpdate !== -1) {
                        updatedPresentaPreciosData.splice(indexToUpdate, 1); // Elimina el elemento en el índice encontrado
                    }

                    // Equipo 2: Actualizar el array en el objeto
                    setPresentaPreciosData(updatedPresentaPreciosData);

                    // Crear un nuevo objeto con las actualizaciones
                    const updatedPriceListData = {
                        ...SelectedPriceListData,
                        cat_listas_presenta_precios: updatedPresentaPreciosData,
                    };
                    //console.log("Nuevo selectedPriceListData: ", updatedSelectedPriceListData);

                    // Actualizar el documento PriceList
                    await PatchOnePriceList(updatedPriceListData);

                    // Equipo 2: Añadir la informacion actualizada mediante redux
                    dispatch(SET_SELECTED_PRICELIST_DATA(updatedPriceListData));

                    showMensajeConfirm("Documento Eliminado");
                } catch (e) {
                    console.error("Error al Eliminar:", e);
                    showMensajeError(`No se pudo Eliminar el Documento <<SELECCIONADO>>`);
                }
            }
        }
        else {
            await showMensajeConfirm(`Primero Seleccione una Fila`);
        }
        Reload();
    };

    //Equipo 2: Metodo para editar una Presentacion de Precio
    const Edit = async () => {
        if (RowData) {
            setEditPresentaPreciosShowModal(true);
        } else {
            await showMensajeConfirm(`Primero Seleccione una Fila`);
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
                    columns={PresentaPreciosColumns}
                    data={PresentaPreciosData}
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
            {/* M O D A L E S */}
            {/* ADD MODAL */}
            <Dialog open={AddPresentaPreciosShowModal}>
                {AddPresentaPreciosShowModal && (
                    <AddPresentaPreciosModal
                        AddPresentaPreciosShowModal={AddPresentaPreciosShowModal}
                        setAddPresentaPreciosShowModal={setAddPresentaPreciosShowModal}
                        onClose={() => {
                            setAddPresentaPreciosShowModal(false);
                            Reload();
                        }}
                    />
                )}
            </Dialog>
            {/* EDIT MODAL */}
            <Dialog open={EditPresentaPreciosShowModal}>
                {EditPresentaPreciosShowModal && (
                    <EditPresentaPreciosModal
                        EditPresentaPreciosShowModal={EditPresentaPreciosShowModal}
                        setEditPresentaPreciosShowModal={setEditPresentaPreciosShowModal}
                        RowData={RowData}
                        onClose={() => {
                            setEditPresentaPreciosShowModal(false);
                            Reload();
                        }}
                    />
                )}
            </Dialog>
        </Box>
    );
};
export default PresentaPreciosTable;