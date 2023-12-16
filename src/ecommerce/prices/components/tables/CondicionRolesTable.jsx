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
//import AddCondicionRolesModal from "../modals/AddCondicionRolesModal";
//import EditCondicionRolesModal from "../modals/UpdateCondicionRolesModal";
//Equipo 2: Redux+
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_CONDICIONROLES_DATA } from "../../redux/slices/CondicionRolesSlice";

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

    //Equipo 2: Para eviar data mediante redux
    const dispatch = useDispatch();

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

    //Equipo 2: Metodo para eliminar un Negocios
    const Delete = async () => {
        const res = await showMensajeConfirm(
            `¿Estás seguro de eliminar el documento: ${idRowSel}? No podrás revertir esta acción. ¿Deseas continuar?`
        );

        if (res) {
            try {
                // Filtrar los elementos distintos al que queremos eliminar
                const updatedCondicionRolesData = CondicionRolesData.filter(
                    Roles => Roles.DesCondicion !== idRowSel
                );

                // Actualizar el array en el objeto
                setCondicionRolesData(updatedCondicionRolesData);

                SelectedPriceListData.cat_listas_condicion_roles = CondicionRolesData;

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
            setEditCondicionRolesShowModal(true)
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
                <AddCondicionRolesModal
                    AddCondicionRolesShowModal={AddCondicionRolesShowModal}
                    setAddCondicionRolesShowModal={setAddCondicionRolesShowModal}
                    onClose={() => {
                        setAddCondicionRolesShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
            {/* EDIT MODAL  */}
            <Dialog open={EditCondicionRolesShowModal}>
                <EditCondicionRolesModal
                    EditCondicionRolesShowModal={EditCondicionRolesShowModal}
                    setEditCondicionRolesShowModal={setEditCondicionRolesShowModal}
                    RowData={RowData}
                    onClose={() => {
                        setEditCondicionRolesShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
        </Box>
    );
};
export default CondicionRolesTable;