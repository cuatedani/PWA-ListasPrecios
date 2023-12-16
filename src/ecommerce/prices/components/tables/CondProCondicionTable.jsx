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
import AddCondProCondicionModal from "../modals/AddCondProCondicionModal";
import EditCondProCondicionModal from "../modals/EditCondProCondicionModal";
//Equipo 2: Redux
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_CONDPROCONDICION_DATA } from "../../redux/slices/CondProCondicionSlice";

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
    //Equipo 2: controlar el estado de la data de CondicionProducto.
    const [CondicionProductoData, setCondicionProductoData] = useState([]);
    //Equipo 2: controlar el estado de la data de CondProCondicion.
    const [CondProCondicionData, setCondProCondicionData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondProCondicion.
    const [AddCondProCondicionShowModal, setAddCondProCondicionShowModal] = useState(false);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondProCondicion.
    const [EditCondProCondicionShowModal, setEditCondProCondicionShowModal] = useState(false);
    //Equipo 2: Controlar la seleccion de datos
    // Indice de la fila, Id de la fila, datos de la fila
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [idRowSel, setIdRowSel] = useState(null);
    const [RowData, setRowData] = useState(null);
    //Equipo2: Constantes Para Almacenar la Data de los Documentos Superiores
    const [SelectedPriceListData, setSelectedPriceListData] = useState(null);
    const [SelectedCondicionProductoData, setSelectedCondicionProductoData] = useState(null);
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const priceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", priceListData);
    //Equipo 2: Mediante redux obtener la data que se envió de CondicionRolesTable
    const condicionProductoData = useSelector((state) => state.CondicionProductoReducer.SelCondicionProductoData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", priceListData);

    //Equipo 2: useEffect para cargar datos en la tabla
    useEffect(() => {
        async function fetchData() {
            try {
                //Asignamos el PriceList obtenido mediante el Redux
                setSelectedPriceListData(priceListData);
                //Obtenemos los CondicionRoles de PriceList
                setCondicionProductoData(priceListData.cat_listas_condicion_prod_serv);

                //Asignamos el CondicionRol obtenido mediante el Redux
                setSelectedCondicionProductoData(condicionProductoData);
                //Obtenemos los CondRolCondicion del CondicionRol
                setCondProCondicionData(condicionProductoData.condicion);

                setLoadingTable(false);
                setSelectedRowIndex(null);
                setIdRowSel(null);
            } catch (error) {
                console.error("Error al obtener los Datos en useEffect de CondProCondicionTable:", error);
            }
        }
        fetchData();
    }, [priceListData, condicionProductoData]);

    //Equipo 2: Para eviar data mediante redux
    const dispatch = useDispatch();

    //Equipo 2: Metodo para seleccionar la data de una fila
    //Este es el metodo para seleccionar la orden de la tabla
    useEffect(() => {
        const handleRowClick = (index) => {
            const clickedRow = CondProCondicionData[index];
            if (clickedRow) {
                console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow);
                setIdRowSel(clickedRow.Etiqueta);
                setSelectedRowIndex(index);
                setRowData(clickedRow);
                //console.log("<<DATA DEL DOCUMENTO SELECCIONADO>>:", clickedRow);
                dispatch(SET_SELECTED_CONDPROCONDICION_DATA(clickedRow));
            }
        };
        //Delimita el rango de selecion en la tabla
        const rows = document.querySelectorAll(".MuiTableRow-root");
        rows.forEach((row, index) => {
            row.addEventListener("click", () => handleRowClick(index - 1));
        });
    }, [CondProCondicionData]);

    //Equipo 2: Metodo para eliminar un Negocios
    const Delete = async () => {
        const res = await showMensajeConfirm(
            `¿Estás seguro de eliminar el documento: ${idRowSel}? No podrás revertir esta acción. ¿Deseas continuar?`
        );

        if (res) {
            try {
                // Filtrar los elementos distintos al que queremos eliminar
                const updatedCondProCondicionData = CondProCondicionData.filter(
                    Condicion => Condicion !== RowData
                );

                // Actualizar el array en el objeto
                setCondProCondicionData(updatedCondProCondicionData);
                SelectedCondicionProductoData.condicion = CondProCondicionData;

                // Actualizar el array en el objeto
                setCondicionProductoData(updatedCondicionProductoData);
                SelectedPriceListData.cat_listas_condicion_prod_serv = CondicionProductoData;

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
            setEditCondProCondicionShowModal(true)
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
                    columns={CondProCondicionColumns}
                    data={CondProCondicionData}
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
                                            onClick={() => setAddCondProCondicionShowModal(true)}
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
            <Dialog open={AddCondProCondicionShowModal}>
                <AddCondProCondicionModal
                    AddCondProCondicionShowModal={AddCondProCondicionShowModal}
                    setAddCondProCondicionShowModal={setAddCondProCondicionShowModal}
                    onClose={() => {
                        setAddCondProCondicionShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
            {/* EDIT MODAL */}
            <Dialog open={EditCondProCondicionShowModal}>
                <EditCondProCondicionModal
                    EditCondProCondicionShowModal={EditCondProCondicionShowModal}
                    setEditCondProCondicionShowModal={setEditCondProCondicionShowModal}
                    RowData={RowData}
                    onClose={() => {
                        setEditCondProCondicionShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
        </Box>
    );
};
export default CondProCondicionTable;