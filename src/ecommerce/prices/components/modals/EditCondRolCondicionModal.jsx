//Equipo 2: React
import React, { useState, useEffect } from "react";
//Equipo 2: Material UI
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions,
     Box, Alert, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
//Equipo 2: Services
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";
import getAllLabels from "../../../prices/services/remote/get/getAllLabels";
//Equipo 2: Helpers
import { CondRolCondicionValues } from "../../helpers/CondRolCondicionValues";
//Equipo 2: Redux
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { SET_SELECTED_CONDICIONROLES_DATA } from "../../redux/slices/CondicionRolesSlice";

const EditCondRolCondicionModal = ({ EditCondRolCondicionShowModal, setEditCondRolCondicionShowModal, RowData }) => {
    //Equipo 2: Inicializacion de States
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [TipoCondicionValues, setTipoCondicionValues] = useState([]);
    const [TipoOperadorValues, setTipoOperadorValues] = useState([]);

    //Equipo 2: Dispatch para actualizar la data local
    const dispatch = useDispatch();
    //Equipo 2: Loader
    const [Loading, setLoading] = useState(false);
    //Equipo 2: Constantes Para Almacenar la Data de los Documentos Superiores
    const [CondicionRolesData, setCondicionRolesData] = useState(null);
    const [CondRolCondicionData, setCondRolCondicionData] = useState(null);
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const selectedPriceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", priceListData);
    //Equipo 2: Mediante redux obtener la data que se envió de CondicionRolesTable
    const selectedCondicionRolesData = useSelector((state) => state.CondicionRolesReducer.SelCondicionRolesData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", condicionRolesData);

    useEffect(() => {
        getDataSelectEtiquetas();
    }, []);

    //Equipo 2: useEffect para cargar datos
    useEffect(() => {
        async function fetchData() {
            try {
                setCondicionRolesData(selectedPriceListData.cat_listas_condicion_roles);
                setCondRolCondicionData(selectedCondicionRolesData.condicion);
            } catch (error) {
                console.error("Error al cargar las Condicones de Rol en useEffect de AddCondRolConModal:", error);
            }
        }
        fetchData();
    }, []);

    //Equipo 2: Ejecutamos la API que obtiene todos los Etiquetas.
    async function getDataSelectEtiquetas() {
        try {
            //Obtenemos todas las etiquetas
            const Labels = await getAllLabels();
            //Obtenemosa las Etiquetas IdTipoListasPrecios
            const TipoCondicion = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoCondicion"
            );
            setTipoCondicionValues(TipoCondicion.valores);

            //Obtenemosa las Etiquetas IdTipoListasPrecios
            const TipoOperador = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoOperadorAritmetico"
            );
            setTipoOperadorValues(TipoOperador.valores);

        } catch (e) {
            console.error("Error al obtener Etiquetas para Tipos de Lista:", e);
        }
    }

    const formik = useFormik({
        initialValues: {
            IdTipoCondicionOK: RowData.IdTipoCondicionOK,
            IdTipoOperadorOK: RowData.IdTipoOperadorOK,
            Valor: RowData.Valor,
            Secuecia: RowData.Secuecia,
        },
        validationSchema: Yup.object({
            IdTipoCondicionOK: Yup.string().required("Campo requerido"),
            IdTipoOperadorOK: Yup.string().required("Campo requerido"),
            Valor: Yup.string(),
            Secuecia: Yup.string().required("Campo requerido"),
        }),

        onSubmit: async (values) => {

            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Guardar");
            //Equipo 2: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                //Equipo 2: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const CondRolCon = CondRolCondicionValues(values);

                // Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondRolCon>>", CondRolCon);

                // Equipo 2: Encuentra el índice del elemento en CondicionRolCondicionData que coincide con RowData
                const indexToUpdate = CondRolCondicionData.findIndex(item => (
                    item.IdTipoCondicionOK === RowData.IdTipoCondicionOK
                    && item.IdTipoOperadorOK === RowData.IdTipoOperadorOK
                    && item.Valor === RowData.Valor
                    && item.Secuecia === RowData.Secuecia
                ));

                // Equipo 2: Si se encuentra el índice, actualiza ese elemento, si no, agrega uno nuevo
                const updatedCondRolCondicionData = [...CondRolCondicionData];
                if (indexToUpdate !== -1) {
                    updatedCondRolCondicionData[indexToUpdate] = CondRolCon;
                } else {
                    updatedCondRolCondicionData.push(CondRolCon);
                }

                // Actualizar el array en el sub-sub-documento
                setCondRolCondicionData(updatedCondRolCondicionData);

                // Crear un nuevo objeto con las actualizaciones del sub-documento
                const updatedCondicionRolesData = {
                    ...selectedCondicionRolesData,
                    condicion: updatedCondRolCondicionData,
                };
                console.log("Nuevo CondicionRolesData: ", updatedCondicionRolesData);

                // Equipo 2: Añadir la informacion actualizada del sub-documento mediante redux
                dispatch(SET_SELECTED_CONDICIONROLES_DATA(updatedCondicionRolesData));

                // Equipo 2: Actualizar el array del sub-documento
                setCondicionRolesData(updatedCondicionRolesData);

                // Crear un nuevo objeto con los cambios en el PriceList
                const updatedPriceListData = {
                    ...selectedPriceListData,
                    cat_listas_condicion_roles: updatedCondicionRolesData,
                };
                console.log("Nuevo selectedPriceListData: ", updatedPriceListData);

                // Actualizar el documento PriceList en BD
                await PatchOnePriceList(updatedPriceListData);

                // Equipo 2: Añadir la informacion actualizada mediante redux
                dispatch(SET_SELECTED_PRICELIST_DATA(updatedPriceListData));

                setMensajeExitoAlert("Documento Modificado Exitosamente");
            } catch (e) {
                console.error("Error al Modificar:", e);
                setMensajeErrorAlert(`No se pudo modificar ConRolCondicion`);
            }
            //Equipo 2: Ocultamos el loading
            setLoading(false);
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog
            open={EditCondRolCondicionShowModal}
            onClose={() => setEditCondRolCondicionShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Editar Nueva Condicion</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Equipo 2: Campos de captura o selección */}
                    <Select
                        value={formik.values.IdTipoCondicionOK}
                        label="Selecciona un Tipo de Condicion:"
                        name="IdTipoCondicionOK"
                        onBlur={formik.handleBlur}
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.IdTipoCondicionOK && Boolean(formik.errors.IdTipoCondicionOK)}
                        onChange={(e) => {
                            const selectedTipoCondicion = e.target.value;
                            formik.setFieldValue("IdTipoCondicionOK", selectedTipoCondicion);
                            formik.handleChange(e);
                        }}
                    >
                        {TipoCondicionValues.map((tipo) => (
                            <MenuItem
                                value={tipo.IdValorOK}
                                key={tipo.Valor}
                            >
                                {tipo.Valor}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={formik.values.IdTipoOperadorOK}
                        label="Selecciona un Tipo de Operador:"
                        name="IdTipoOperadorOK"
                        onBlur={formik.handleBlur}
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.IdTipoOperadorOK && Boolean(formik.errors.IdTipoOperadorOK)}
                        onChange={(e) => {
                            const selectedTipoOperador = e.target.value;
                            formik.setFieldValue("IdTipoOperadorOK", selectedTipoOperador);
                            formik.handleChange(e);
                        }}
                    >
                        {TipoOperadorValues.map((tipo) => (
                            <MenuItem
                                value={tipo.IdValorOK}
                                key={tipo.Valor}
                            >
                                {tipo.Valor}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        id="Valor"
                        label="Valor*"
                        value={formik.values.Valor}
                        {...commonTextFieldProps}
                        error={formik.touched.Valor && Boolean(formik.errors.Valor)}
                        helperText={formik.touched.IdLisValortaBK && formik.errors.Valor}
                    />
                    <TextField
                        id="Secuecia"
                        label="Secuecia*"
                        value={formik.values.Secuecia}
                        {...commonTextFieldProps}
                        error={formik.touched.Secuecia && Boolean(formik.errors.Secuecia)}
                        helperText={formik.touched.Secuecia && formik.errors.Secuecia}
                    />
                </DialogContent>
                {/* Equipo 2: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Box m="auto">
                        {mensajeErrorAlert && (
                            <Alert severity="error">
                                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                            </Alert>
                        )}
                        {mensajeExitoAlert && (
                            <Alert severity="success">
                                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                            </Alert>
                        )}
                    </Box>
                    {/* Equipo 2: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setEditCondRolCondicionShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                    {/* Equipo 2: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<EditIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >
                        <span>MODIFICAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default EditCondRolCondicionModal;