//Equipo 2: React
import React, { useEffect, useMemo, useState } from "react";
//Equipo 2: Material UI
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import { darken } from '@mui/system';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//Equipo 2: DB
import getAllPricesList from '../../services/remote/get/getAllPricesList';
import deleteOnePriceList from '../../services/remote/delete/deleteOnePriceList';
//Equipo 2: Modals
import AddPriceListModal from "../modals/AddPriceListModal";
import EditPriceListModal from "../modals/UpdatePriceListModal";
//Equipo 2: Redux
import { useDispatch } from "react-redux";
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";

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
    //Equipo 2: controlar el estado de la data de ListaPrecios.
    const [PricesListData, setPricesListData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nueva Lista de Precios.
    const [AddPriceListShowModal, setAddPriceListShowModal] = useState(false);
    //Equipo 2: controlar el estado que muesta u oculta la modal de Edit Lista de Precios.
    const [EditPriceListShowModal, setEditPriceListShowModal] = useState(false);
    //Equipo 2: Controlar la seleccion de datos
    //Indice de la fila, Id de la fila, datos de la fila
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [idRowSel, setIdRowSel] = useState(null);
    const [RowData, setRowData] = useState(null);

    //Equipo 2: Para eviar data mediante redux
    const dispatch = useDispatch();

    //Equipo 2: useEffect para cargar datos en la tabla
    useEffect(() => {
        async function fetchData() {
            try {
                const AllPricesListData = await getAllPricesList();
                setPricesListData(AllPricesListData);
                setLoadingTable(false);
                setSelectedRowIndex(null);
                setIdRowSel(null);
            } catch (error) {
                console.error("Error al obtener las listas de precios en useEffect de PriceListTable:", error);
            }
        }
        fetchData();
    }, []);

    //Equipo 2: Metodo para seleccionar la data de una fila
    //Este es el metodo para seleccionar la orden de la tabla 
    useEffect(() => {
        const handleRowClick = (index) => {
            const clickedRow = PricesListData[index];
            if (clickedRow) {
                console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdListaOK);
                setIdRowSel(clickedRow.IdListaOK);
                setSelectedRowIndex(index);
                setRowData(clickedRow);
                //console.log("<<DATA DEL DOCUMENTO SELECCIONADO>>:", clickedRow);
                dispatch(SET_SELECTED_PRICELIST_DATA(clickedRow));
            }
        };
    
        // Delimita el rango de selección en la tabla
        const rows = document.querySelectorAll(".MuiTableRow-root");
        rows.forEach((row, index) => {
            row.addEventListener("click", () => handleRowClick(index-1));
        });
    }, [PricesListData]);
    

    //Equipo 2: Metodo para eliminar una lista de precios
    const Delete = async () => {
        const res = await showMensajeConfirm(
            `Esta seguro de eliminar el documento: ${(idRowSel)
            } no podra revertir esta accion, ¿Desea continuar?`
        );
        if (res) {
            let delListaPrecio = idRowSel;
            let temp = idRowSel;
            try {
                await deleteOnePriceList(delListaPrecio);
                showMensajeConfirm("Documento Eliminado");
                fetchData();
            } catch (e) {
                console.error("Error al Eliminar:", e);
                showMensajeError(`No se pudo Eliminar el Docuemento ${(temp)
                    } `);
            }
        }
    };

    //Equipo 2: Metodo para editar una Lista de Precios
    const Edit = async () => {
        if (RowData) {
            setEditPriceListShowModal(true)
        }else{
            await showMensajeConfirm(
                `Primero Seleccione una Fila`
            );
        }
    };

    //Equipo 2: Metodo para mostrar detalles
    const Details = async () => {
        const res = await showMensajeConfirm(
            `Mostrando Detalles`
        );
    };

    //Equipo 2: Estructura de la Tabla
    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={PricesListColumns}
                    data={PricesListData}
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
                                            onClick={() => setAddPriceListShowModal(true)}
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
            <Dialog open={AddPriceListShowModal}>
                <AddPriceListModal
                    AddPriceListShowModal={AddPriceListShowModal}
                    setAddPriceListShowModal={setAddPriceListShowModal}
                    onClose={() => {
                        setAddPriceListShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
            {/* EDIT MODAL */}
            <Dialog open={EditPriceListShowModal}>
                <EditPriceListModal
                    EditPriceListShowModal={EditPriceListShowModal}
                    setEditPriceListShowModal={setEditPriceListShowModal}
                    RowData = {RowData}
                    onClose={() => {
                        setEditPriceListShowModal(false);
                        fetchData();
                    }}
                />
            </Dialog>
        </Box>
    );
};

export default PricesListTable;