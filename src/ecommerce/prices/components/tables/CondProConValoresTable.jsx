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
import AddCondProConValoresModal from "../modals/AddCondProConValoresModal";
import EditCondProConValoresModal from "../modals/EditCondProConValoresModal";
//Equipo 2: Redux
import { useSelector } from "react-redux";

//Equipo 2: Columns Table Definition.
const CondProConValoresColumns = [
    {
        accessorKey: "valor",
        header: "VALOR",
        size: 150, //small column
    },
    {
        accessorKey: "IdComparaValor",
        header: "ID VALOR COMPARADO",
        size: 150, //small column
    },
];


//Equipo 2: Table - FrontEnd.
const CondProConValoresTable = () => {
    //Equipo 2: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondProConValores.
    const [AddCondProConValoresShowModal, setAddCondProConValoresShowModal] = useState(false);
    //Equipo 2: controlar el estado que muesta u oculta la modal de editar CondProConValores.
    const [EditCondProConValoresShowModal, setEditCondProConValoresShowModal] = useState(false);

    //Equipo 2: Controlar la seleccion de datos
    // Indice de la fila, Id de la fila, datos de la fila
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [idRowSel, setIdRowSel] = useState(null);
    const [RowData, setRowData] = useState(null);

    //Equipo 2: controlar el estado de la data de CondicionProducto.
    const [CondicionProductoData, setCondicionProductoData] = useState([]);
    //Equipo 2: controlar el estado de la data de CondProCondicion.
    const [CondProCondicionData, setCondProCondicionData] = useState([]);
    //Equipo 2: controlar el estado de la data de CondProConValores.
    const [CondProConValoresData, setCondProConValoresData] = useState([]);

    //Equipo2: Constantes Para Almacenar la Data de los Documentos Superiores
    const [SelectedPriceListData, setSelectedPriceListData] = useState(null);
    const [SelectedCondicionProductoData, setSelectedCondicionProductoData] = useState(null);
    const [SelectedCondProCondicionData, setSelectedCondProCondicionData] = useState(null);

    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const priceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", priceListData);

    //Equipo 2: Mediante redux obtener la data que se envió de CondicionProductoTable
    const condicionProductoData = useSelector((state) => state.CondicionProductoReducer.SelCondicionProductoData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", condicionProductoData);

    //Equipo 2: Mediante redux obtener la data que se envió de CondProCondicionTable
    const condProCondicionData = useSelector((state) => state.CondProCondicionReducer.SelCondProCondicionData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", condProCondicionData);

    //Equipo 2: useEffect para cargar datos en la tabla
    useEffect(() => {
        async function fetchData() {
            try {
                //Asignamos el PriceList obtenido mediante el Redux
                setSelectedPriceListData(priceListData);
                //Obtenemos los CondicionProducto de PriceList
                setCondicionProductoData(priceListData.cat_listas_condicion_prod_serv);

                //Asignamos el CondicionProducto obtenido mediante el Redux
                setSelectedCondicionProductoData(condicionProductoData);
                //Obtenemos los CondProCondicion del CondicionProducto
                setCondProCondicionData(condicionProductoData.condicion);

                //Asignamos el CondProCondicion obtenido mediante el Redux
                setSelectedCondProCondicionData(condProCondicionData);
                //Obtenemos los CondProConValores del CondProCondicion
                setCondProConValoresData(condProCondicionData.Valores);

                setLoadingTable(false);
                setSelectedRowIndex(null);
                setIdRowSel(null);
            } catch (error) {
                console.error("Error al obtener los Datos en useEffect de CondProConValoresTable:", error);
            }
        }
        fetchData();
    }, [priceListData, condicionProductoData, condProCondicionData]);

    //Equipo 2: Metodo para seleccionar la data de una fila
    //Este es el metodo para seleccionar la orden de la tabla
    useEffect(() => {
        const handleRowClick = (index) => {
            const clickedRow = CondProConValoresData[index];
            if (clickedRow) {
                console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow);
                setIdRowSel(clickedRow.valor);
                setSelectedRowIndex(index);
                setRowData(clickedRow);
                //console.log("<<DATA DEL DOCUMENTO SELECCIONADO>>:", clickedRow);
            }
        };
        //Delimita el rango de selecion en la tabla
        const rows = document.querySelectorAll(".MuiTableRow-root");
        rows.forEach((row, index) => {
            row.addEventListener("click", () => handleRowClick(index - 1));
        });
    }, [CondProConValoresData]);

    //Equipo 2: Metodo para eliminar un Negocios
    const Delete = async () => {
        const res = await showMensajeConfirm(
            `¿Estás seguro de eliminar el documento: ${idRowSel}? No podrás revertir esta acción. ¿Deseas continuar?`
        );

        if (res) {
            try {
                // Filtrar los elementos distintos al que queremos eliminar
                const updatedCondProConValoresData = CondProConValoresData.filter(
                    Valores => Valores !== RowData
                );

                // Actualizar el array en el objeto
                setCondProConValoresData(updatedCondProConValoresData);
                SelectedCondProdCondicionData.Valores = CondProConValoresData;

                // Actualizar el array en el objeto
                setCondProCondicionData(SelectedCondProdCondicionData);
                SelectedCondicionProductoData.condicion = CondProCondicionData;

                // Actualizar el array en el objeto
                setCondicionProductoData(SelectedCondicionProductoData);
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
            setEditCondProConValoresShowModal(true)
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
                    columns={CondProConValoresColumns}
                    data={CondProConValoresData}
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
                                        onClick={() => setAddCondProConValoresShowModal(true)}
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
            <Dialog open={AddCondProConValoresShowModal}>
                <AddCondProConValoresModal
                    AddCondProConValoresShowModal={AddCondProConValoresShowModal}
                    setAddCondProConValoresShowModal={setAddCondProConValoresShowModal}
                    onClose={() => {
                        setAddCondProConValoresShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
            {/* EDIT MODAL */}
            <Dialog open={EditCondProConValoresShowModal}>
                <EditCondProConValoresModal
                    EditCondProConValoresShowModal={EditCondProConValoresShowModal}
                    setEditCondProConValoresShowModal={setEditCondProConValoresShowModal}
                    RowData={RowData}
                    onClose={() => {
                        setEditCondProConValoresShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
        </Box>
    );
};
export default CondProConValoresTable;