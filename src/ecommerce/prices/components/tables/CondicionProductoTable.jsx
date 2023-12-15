import DeleteIcon from "@mui/icons-material/Delete";
//Equipo 2: DB
import getAllPricesList from '../../services/remote/get/getAllPricesList';
//Equipo 2: Modals
import AddCondicionProductoModal from "../modals/AddCondicionProductoModal";
//Equipo 2: Columns Table Definition.
const CondicionProductoColumns = [
    {
        accessorKey: "DesPromo",
        header: "DESCRIPCION",
        size: 150, //small column
    },
    {
        accessorKey: "IdTipoPromoOK",
        header: "ID TIPO PROMOCIÓN",
        size: 150, //small column
    },
    {
        accessorKey: "Formula",
        header: "FORMULA",
        size: 150, //small column
    },
];
//Equipo 2: Table - FrontEnd.
const CondicionProductoTable = () => {
    //Equipo 2: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //Equipo 2: controlar el estado de la data de CondicionProducto.
    const [CondicionProductoData, setCondicionProductoData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondicionProducto.
    const [AddCondicionProductoShowModal, setAddCondicionProductoShowModal] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const AllPricesListData = await getAllPricesList();
                setCondicionProducto(AllPricesListData);
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
                    columns={CondicionProductoColumns}
                    data={CondicionProductoData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                        <IconButton
                                            onClick={() => setAddCondicionProductoShowModal(true)}
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
            <Dialog open={AddCondicionProductoShowModal}>
                <AddCondicionProductoModal
                    AddCondicionProductoShowModal={AddCondicionProductoShowModal}
                    setAddCondicionProductoShowModal={setAddCondicionProductoShowModal}
                    onClose={() => setAddCondicionProductoShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};
export default CondicionProductoTable;