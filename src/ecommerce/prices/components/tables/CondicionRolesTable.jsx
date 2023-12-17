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
//Equipo 2: DB
import PatchOnePriceList from '../../services/remote/patch/PatchOnePriceList';
//Equipo 2: Modals
import AddCondicionRolesModal from "../modals/AddCondicionRolesModal";
import EditCondicionRolesModal from "../modals/EditCondicionRolesModal";
//Equipo 2: Redux+
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_CONDICIONROLES_DATA } from "../../redux/slices/CondicionRolesSlice";
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";

//Equipo 2: Columns Table Definition.
const CondicionRolesColumns = [
    {
        accessorKey: "DesCondicion",
        header: "DESCRIPCION DE CONDICION",
        size: 150, //small column
    },
    {
        accessorKey: "FechaExpiraIni",
        header: "FECHA EXPIRACION INICIO",
        size: 150, //small column
    },
    {
        accessorKey: "FechaExpiraFin",
        header: "FECHA DE EXPIRACION FIN",
        size: 150, //small column
    },
    {
        accessorKey: "Condicion",
        header: "CONDICION",
        size: 150, //small column
    },
];

//Equipo 2: Table - FrontEnd.
const CondicionRolesTable = () => {
    //Equipo 2: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    //Equipo 2: controlar el estado de la data de CondicionRoles.
    const [CondicionRolesData, setCondicionRolesData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondicionRoles.
    const [AddCondicionRolesShowModal, setAddCondicionRolesShowModal] = useState(false);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondicionRoles.
    const [EditCondicionRolesShowModal, setEditCondicionRolesShowModal] = useState(false);
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
                setSelectedPriceListData(priceListData);
                setCondicionRolesData(priceListData.cat_listas_condicion_roles);
                setLoadingTable(false);
                setSelectedRowIndex(null);
                setIdRowSel(null);
            } catch (error) {
                console.error("Error al obtener los Roles en useEffect de CondicionRolesTable:", error);
            }
        }
        fetchData();
    }, [priceListData]);

    //Metodo Para Actualizar Data
    const Reload = async () => {
        setSelectedPriceListData(priceListData);
        setCondicionRolesData(priceListData.cat_listas_condicion_roles);
        setLoadingTable(false);
        setSelectedRowIndex(null);
        setIdRowSel(null);
        setRowData(null);
    };

    //Equipo 2: Metodo para seleccionar la data de una fila
    //Este es el metodo para seleccionar la orden de la tabla
    useEffect(() => {
        const handleRowClick = (index) => {
            const clickedRow = CondicionRolesData[index];
            if (clickedRow) {
                console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.DesCondicion);
                setIdRowSel(clickedRow.DesCondicion);
                setSelectedRowIndex(index);
                setRowData(clickedRow);
                //console.log("<<DATA DEL DOCUMENTO SELECCIONADO>>:", clickedRow);
                dispatch(SET_SELECTED_CONDICIONROLES_DATA(clickedRow));
            }
        };
        //Delimita el rango de selecion en la tabla
        const rows = document.querySelectorAll(".MuiTableRow-root");
        rows.forEach((row, index) => {
            row.addEventListener("click", () => handleRowClick(index - 1));
        });
    }, [CondicionRolesData]);

    //Equipo 2: Metodo para eliminar un Condicion Rol
    const Delete = async () => {
        if (RowData) {
            const res = await showMensajeConfirm(
                `¿Estás seguro de eliminar el documento <<SELECCIONADO>>? No podrás revertir esta acción. ¿Deseas continuar?`
            );

            if (res) {
                try {
                    // Equipo 2: Encuentra el índice del elemento en CondicionRolesData que coincide con RowData
                    const indexToUpdate = CondicionRolesData.findIndex(item => (
                        item.DesCondicion === RowData.DesCondicion
                        && item.FechaExpiraIni === RowData.FechaExpiraIni
                        && item.FechaExpiraFin === RowData.FechaExpiraFin
                        && item.Condicion === RowData.Condicion
                    ));

                    // Equipo 2: Si se encuentra el índice, elimina ese elemento
                    const updatedCondicionRolesData = [...CondicionRolesData];
                    if (indexToUpdate !== -1) {
                        updatedCondicionRolesData.splice(indexToUpdate, 1); // Elimina el elemento en el índice encontrado
                    }
                    //console.log("Eliminado: ", updatedCondicionRolesData);

                    // Equipo 2: Actualizar el array en el objeto
                    setCondicionRolesData(updatedCondicionRolesData);

                    // Crear un nuevo objeto con las actualizaciones
                    const updatedPriceListData = {
                        ...SelectedPriceListData,
                        cat_listas_condicion_roles: updatedCondicionRolesData,
                    };
                    //console.log("Nuevo selectedPriceListData: ", updatedPriceListData);

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
        } else {
            await showMensajeConfirm(`Primero Seleccione una Fila`);
        }
        Reload();
    };

    //Equipo 2: Metodo para editar un Negocio
    const Edit = async () => {
        if (RowData) {
            setEditCondicionRolesShowModal(true)
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
                    columns={CondicionRolesColumns}
                    data={CondicionRolesData}
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
                                    <Tooltip title="Agregar">
                                        <IconButton
                                            onClick={() => setAddCondicionRolesShowModal(true)}
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                        <IconButton
                                            onClick={() => Edit()}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            onClick={() => Delete()}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
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
            <Dialog open={AddCondicionRolesShowModal}>
                {AddCondicionRolesShowModal && (
                    <AddCondicionRolesModal
                        AddCondicionRolesShowModal={AddCondicionRolesShowModal}
                        setAddCondicionRolesShowModal={setAddCondicionRolesShowModal}
                        onClose={() => {
                            setAddCondicionRolesShowModal(false);
                            Reload();
                        }}
                    />
                )}
            </Dialog>
            {/* EDIT MODAL  */}
            <Dialog open={EditCondicionRolesShowModal}>
                {EditCondicionRolesModal && (
                    <EditCondicionRolesModal
                        EditCondicionRolesShowModal={EditCondicionRolesShowModal}
                        setEditCondicionRolesShowModal={setEditCondicionRolesShowModal}
                        RowData={RowData}
                        onClose={() => {
                            setEditCondicionRolesShowModal(false);
                            Reload();
                        }}
                    />
                )}
            </Dialog>
        </Box>
    );
};
export default CondicionRolesTable;