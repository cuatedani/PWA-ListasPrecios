import DeleteIcon from "@mui/icons-material/Delete";
//Equipo 2: DB
import getAllPricesList from '../../services/remote/get/getAllPricesList';
//Equipo 2: Modals
import AddCondProConValoresModal from "../modals/AddCondProConValoresModal";
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

    //Equipo 2: controlar el estado de la data de CondProConValores.
    const [CondProConValoresData, setCondProConValoresData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondProConValores.
    const [AddCondProConValoresShowModal, setAddCondProConValoresShowModal] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const AllPricesListData = await getAllPricesList();
                setCondProConValores(AllPricesListData);
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
                    columns={CondProConValoresColumns}
                    data={CondProConValoresData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
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
            <Dialog open={AddCondProConValoresShowModal}>
                <AddCondProConValoresModal
                    AddCondProConValoresShowModal={AddCondProConValoresShowModal}
                    setAddCondProConValoresShowModal={setAddCondProConValoresShowModal}
                    onClose={() => setAddCondProConValoresShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};
export default CondProConValoresTable;