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
import AddCondRolCondicionModal from "../modals/AddCondRolCondicionModal";
import EditCondRolCondicionModal from "../modals/EditCondRolCondicionModal";
//Equipo 2: Redux
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { SET_SELECTED_CONDICIONROLES_DATA } from "../../redux/slices/CondicionRolesSlice";

//Equipo 2: Columns Table Definition.
const CondRolCondicionColumns = [
    {
        accessorKey: "IdTipoCondicionOK",
        header: "ID TIPO CONDICION",
        size: 150, //small column
    },
    {
        accessorKey: "IdTipoOperadorOK",
        header: "ID TIPO OPERADOR",
        size: 150, //small column
    },
    {
        accessorKey: "Valor",
        header: "VALOR",
        size: 150, //small column
    },
    {
        accessorKey: "Secuecia",
        header: "SECUENCIA",
        size: 150, //small column
    },
];

//Equipo 2: Table - FrontEnd.
const CondRolCondicionTable = () => {
    //Equipo 2: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    //Equipo 2: controlar el estado de la data de CondicionRoles.
    const [CondicionRolesData, setCondicionRolesData] = useState([]);
    //Equipo 2: controlar el estado de la data de CondRolCondicion.
    const [CondRolCondicionData, setCondRolCondicionData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo Negocios.
    const [AddCondRolCondicionShowModal, setAddCondRolCondicionShowModal] = useState(false);
    //Equipo 2: controlar el estado que muesta u oculta la modal de editar Negocios.
    const [EditCondRolCondicionShowModal, setEditCondRolCondicionShowModal] = useState(false);
    //Equipo 2: Controlar la seleccion de datos
    // Indice de la fila, Id de la fila, datos de la fila
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [idRowSel, setIdRowSel] = useState(null);
    const [RowData, setRowData] = useState(null);
    //Equipo 2: Dispatch para actualizar la data local
    const dispatch = useDispatch();
    //Equipo 2: Constantes Para Almacenar la Data de los Documentos Superiores
    const [SelectedPriceListData, setSelectedPriceListData] = useState(null);
    const [SelectedCondicionRolesData, setSelectedCondicionRolesData] = useState(null);
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const priceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", priceListData);
    //Equipo 2: Mediante redux obtener la data que se envió de CondicionRolesTable
    const condicionRolesData = useSelector((state) => state.CondicionRolesReducer.SelCondicionRolesData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", condicionRolesData);

    //Equipo 2: useEffect para cargar datos en la tabla
    useEffect(() => {
        async function fetchData() {
            try {
                //Asignamos el PriceList obtenido mediante el Redux
                setSelectedPriceListData(priceListData);
                //Obtenemos los CondicionRoles de PriceList
                setCondicionRolesData(priceListData?.cat_listas_condicion_roles|| []);

                //Asignamos el CondicionRol obtenido mediante el Redux
                setSelectedCondicionRolesData(condicionRolesData);
                //Obtenemos los CondRolCondicion del CondicionRol
                setCondRolCondicionData(condicionRolesData?.condicion|| []);

                //Reseteamos Indices
                setLoadingTable(false);
                setSelectedRowIndex(null);
                setIdRowSel(null);
            } catch (error) {
                console.error("Error al obtener los Datos en useEffect de CondRolCondicionTable:", error);
            }
        }
        fetchData();
    }, [priceListData, condicionRolesData]);

    //Metodo Para Actualizar Data
    const Reload = async () => {
        //Asignamos el PriceList obtenido mediante el Redux
        setSelectedPriceListData(priceListData);
        //Obtenemos los CondicionRoles de PriceList
        setCondicionRolesData(priceListData.cat_listas_condicion_roles);

        //Asignamos el CondicionRol obtenido mediante el Redux
        setSelectedCondicionRolesData(condicionRolesData);
        //Obtenemos los CondRolCondicion del CondicionRol
        setCondRolCondicionData(condicionRolesData.condicion);

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
            const clickedRow = CondRolCondicionData[index];
            if (clickedRow) {
                console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdTipoCondicionOK);
                setIdRowSel(clickedRow.IdTipoCondicionOK);
                setSelectedRowIndex(index);
                setRowData(clickedRow);
            }
        };
        //Delimita el rango de selecion en la tabla
        const rows = document.querySelectorAll(".MuiTableRow-root");
        rows.forEach((row, index) => {
            row.addEventListener("click", () => handleRowClick(index - 1));
        });
    }, [CondRolCondicionData]);

    //Equipo 2: Metodo para eliminar un Negocios
    const Delete = async () => {
        if (RowData) {
            const res = await showMensajeConfirm(
                `¿Estás seguro de eliminar el documento <<SELECCIONADO>>? No podrás revertir esta acción. ¿Deseas continuar?`
            );

            if (res) {
                try {
                    // Equipo 2: Encuentra el índice del elemento en CondRolCondicionData que coincide con RowData
                    const indexToUpdate = CondRolCondicionData.findIndex(item => (
                        item.IdTipoCondicionOK === RowData.IdTipoCondicionOK
                        && item.IdTipoOperadorOK === RowData.IdTipoOperadorOK
                        && item.Valor === RowData.Valor
                        && item.Secuencia === RowData.Secuencia
                    ));

                    // Equipo 2: Si se encuentra el índice, elimina ese elemento
                    const updatedCondRolCondicionData = [...CondicionRolesData];
                    if (indexToUpdate !== -1) {
                        // Elimina el elemento en el índice encontrado
                        updatedCondRolCondicionData.splice(indexToUpdate, 1);
                    }

                    // Actualizar el array en el sub-sub-documento
                    setCondRolCondicionData(updatedCondRolCondicionData);

                    // Crear un nuevo objeto con las actualizaciones del sub-documento
                    const updatedCondicionRolesData = {
                        ...SelectedCondicionRolesData,
                        condicion: updatedCondRolCondicionData,
                    };
                    console.log("Nuevo selectedPriceListData: ", updatedCondicionRolesData);

                    // Equipo 2: Añadir la informacion actualizada del sub-documento mediante redux
                    dispatch(SET_SELECTED_CONDICIONROLES_DATA(updatedCondicionRolesData));

                    // Equipo 2: Actualizar el array del sub-documento
                    setCondicionRolesData(updatedCondicionRolesData);

                    // Crear un nuevo objeto con los cambios en el PriceList
                    const updatedPriceListData = {
                        ...SelectedPriceListData,
                        cat_listas_condicion_roles: updatedCondicionRolesData,
                    };
                    console.log("Nuevo selectedPriceListData: ", updatedPriceListData);

                    // Actualizar el documento PriceList en BD
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

    //Equipo 2: Metodo para editar un CondRolCondicion
    const Edit = async () => {
        if (RowData) {
            setEditCondRolCondicionShowModal(true)
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
                    columns={CondRolCondicionColumns}
                    data={CondRolCondicionData}
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
                                            onClick={() => setAddCondRolCondicionShowModal(true)}
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ------- EDITAR ------ */}
                                    <Tooltip title="Editar">
                                        <IconButton
                                            onClick={() => Edit()}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {/* ------- ELIMINAR ------ */}
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            onClick={() => Delete()}>
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
            <Dialog open={AddCondRolCondicionShowModal}>
                {AddCondRolCondicionModal && (
                    <AddCondRolCondicionModal
                        AddCondRolCondicionShowModal={AddCondRolCondicionShowModal}
                        setAddCondRolCondicionShowModal={setAddCondRolCondicionShowModal}
                        onClose={() => {
                            setAddCondRolCondicionShowModal(false);
                            Reload();
                        }}
                    />
                )}
            </Dialog>
            {/* EDIT MODAL */}
            <Dialog open={EditCondRolCondicionShowModal}>
                {EditCondRolCondicionModal && (
                    <EditCondRolCondicionModal
                        EditCondRolCondicionShowModal={EditCondRolCondicionShowModal}
                        setEditCondRolCondicionShowModal={setEditCondRolCondicionShowModal}
                        RowData={RowData}
                        onClose={() => {
                            setEditCondRolCondicionShowModal(false);
                            Reload();
                        }}
                    />
                )}
            </Dialog>
        </Box>
    );
};
export default CondRolCondicionTable;