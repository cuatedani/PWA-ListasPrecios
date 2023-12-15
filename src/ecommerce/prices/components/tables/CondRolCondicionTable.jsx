import DeleteIcon from "@mui/icons-material/Delete";
//Equipo 2: DB
import getAllPricesList from '../../services/remote/get/getAllPricesList';
//Equipo 2: Modals
import AddCondRolCondicionModal from "../modals/AddCondRolCondicionModal";
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

    //Equipo 2: controlar el estado de la data de CondRolCondicion.
    const [CondRolCondicionData, setCondRolCondicionData] = useState([]);
    //Equipo 2: controlar el estado que muesta u oculta la modal de nuevo CondRolCondicion.
    const [AddCondRolCondicionShowModal, setAddCondRolCondicionShowModal] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const AllPricesListData = await getAllPricesList();
                setCondRolCondicion(AllPricesListData);
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
                    columns={CondRolCondicionColumns}
                    data={CondRolCondicionData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{ m: 1 }}>
                                <Box>
                                    <Tooltip title="Agregar">
                                        <IconButton
                                            onClick={() => setAddCondRolCondicionShowModal(true)}
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
            <Dialog open={AddCondRolCondicionShowModal}>
                <AddCondRolCondicionModal
                    AddCondRolCondicionShowModal={AddCondRolCondicionShowModal}
                    setAddCondRolCondicionShowModal={setAddCondRolCondicionShowModal}
                    onClose={() => setAddCondRolCondicionShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};
export default CondRolCondicionTable;