import DeleteIcon from "@mui/icons-material/Delete";
//Equipo 2: DB
import { getAllPricesList } from '../../services/remote/get/getAllPricesList';
//Equipo 2: Modals
import AddCondicionRolesModal from "../modals/AddCondicionRolesModal";
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
    useEffect(() => {
        async function fetchData() {
            try {
                const AllPricesListData = await getAllPricesList();
                setCondicionRoles(AllPricesListData);
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
                    columns={CondicionRolesColumns}
                    data={CondicionRolesData}
                    state={{ isLoading: loadingTable }}
                    initialState={{ density: "compact", showGlobalFilter: true }}
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
            <Dialog open={AddCondicionRolesShowModal}>
                <AddCondicionRolesModal
                    AddCondicionRolesShowModal={AddCondicionRolesShowModal}
                    setAddCondicionRolesShowModal={setAddCondicionRolesShowModal}
                    onClose={() => setAddCondicionRolesShowModal(false)}
                />
            </Dialog>
        </Box>
    );
};
export default CondicionRolesTable;