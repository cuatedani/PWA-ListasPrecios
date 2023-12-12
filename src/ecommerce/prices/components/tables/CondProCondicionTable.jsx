import DeleteIcon from "@mui/icons-material/Delete";
//Equipo 2: DB
import { getAllPricesList } from '../../services/remote/get/getAllPricesList';
//Equipo 2: Modals
import AddCondProCondicionModal from "../modals/AddCondProCondicionModal";
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

    //Equipo 2: controlar el estado de la data de CondProCondicion.
    const [CondProCondicionData, setCondProCondicionData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondProCondicion.
    const [AddCondProCondicionShowModal, setAddCondProCondicionShowModal] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const AllPricesListData = await getAllPricesList();
                setCondProCondicion(AllPricesListData);
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
                    columns={CondProCondicionColumns}
                    data={CondProCondicionData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
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
            <Dialog open={AddCondProCondicionShowModal}>
                <AddCondProCondicionModal
                    AddCondProCondicionShowModal={AddCondProCondicionShowModal}
                    setAddCondProCondicionShowModal={setAddCondProCondicionShowModal}
                    onClose={() => setAddCondProCondicionShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};
export default CondProCondicionTable;