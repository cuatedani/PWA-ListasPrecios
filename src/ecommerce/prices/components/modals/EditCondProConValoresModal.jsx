//Equipo 2: React
import React, { useState, useEffect } from "react";
//Equipo 2: Material UI
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions,
     Box, Alert, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
//Equipo 2: Services
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";
import getAllLabels from "../../../prices/services/remote/get/getAllLabels";
//Equipo 2: Helpers
import { CondProConValoresValues } from "../../helpers/CondProConValoresValues";
//Equipo 2: Redux
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { SET_SELECTED_CONDICIONPRODUCTO_DATA } from "../../redux/slices/CondicionProductoSlice";
import { SET_SELECTED_CONDPROCONDICION_DATA } from "../../redux/slices/CondProCondicionSlice";

const EditCondProConValoresModal = ({ EditCondProConValoresShowModal, setEditCondProConValoresShowModal, RowData }) => {
    //Equipo 2: Inicializacion de States
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [TipoComparadorValues, setTipoComparadorValues] = useState([]);
    //Equipo 2: Dispatch para actualizar la data local
    const dispatch = useDispatch();
    //Equipo 2: Loader
    const [Loading, setLoading] = useState(false);

    //Equipo 2: controlar el estado de la data de CondicionProducto.
    const [CondicionProductoData, setCondicionProductoData] = useState([]);
    //Equipo 2: controlar el estado de la data de CondProCondicion.
    const [CondProCondicionData, setCondProCondicionData] = useState([]);
    //Equipo 2: controlar el estado de la data de PriceList.
    const [CondProConValoresData, setCondProConValoresData] = useState(null);
    
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const priceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", priceListData);

    //Equipo 2: Mediante redux obtener la data que se envió de CondicionProductoTable
    const condicionProductoData = useSelector((state) => state.CondicionProductoReducer.SelCondicionProductoData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", condicionProductoData);

    //Equipo 2: Mediante redux obtener la data que se envió de CondProCondicionTable
    const condProCondicionData = useSelector((state) => state.CondProCondicionReducer.SelCondProCondicionData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", condProCondicionData);

    //Equipo 2: useEffect para cargar datos
    useEffect(() => {
        async function fetchData() {
            try {
                getDataSelectEtiquetas();
                setCondicionProductoData(priceListData.cat_listas_condicion_prod_serv);
                setCondProCondicionData(condicionProductoData.condicion);
                setCondProConValoresData(condProCondicionData.Valores);
            } catch (error) {
                console.error("Error al cargar los datos en useEffect de AddCondProConValoresModal:", error);
            }
        }
        fetchData();
    }, []);

     //Equipo 2: Ejecutamos la API que obtiene todos los Etiquetas.
     async function getDataSelectEtiquetas() {
        try {
            //Obtenemos todas las etiquetas
            const Labels = await getAllLabels();
            //Obtenemosa las Etiquetas IdTipoComparador
            const TipoComparador = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoComparador"
            );
            setTipoComparadorValues(TipoComparador.valores);
        } catch (e) {
            console.error("Error al obtener Etiquetas para Tipos de Lista:", e);
        }
    }

    const formik = useFormik({
        initialValues: {
            valor: RowData.valor,
            IdComparaValor: RowData.IdComparaValor,
        },
        validationSchema: Yup.object({
            valor: Yup.string().required("Campo requerido"),
            IdComparaValor: Yup.string().required("Campo requerido")
        }),

        //Equipo 2: Metodo que acciona el boton
        onSubmit: async (values) => {

            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Modificar");
            //Equipo 2: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                //Equipo 2: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const CondProConValor = CondProCondicionValues(values);

                // Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondProConValor>>", CondProConValor);

                // Equipo 2: Encuentra el índice del elemento en CondicionProductoData que coincide con RowData
                const indexToUpdate = CondProConValoresData.findIndex(item => (
                    item.valor === RowData.valor
                    && item.IdComparaValor === RowData.IdComparaValor
                ));

                // Equipo 2: Si se encuentra el índice, actualiza ese elemento, si no, agrega uno nuevo
                const updatedCondProConValoresData = [...CondProConValoresData];
                if (indexToUpdate !== -1) {
                    updatedCondProConValoresData[indexToUpdate] = CondProConValor;
                } else {
                    updatedCondProConValoresData.push(CondProConValor);
                }

                // Actualizar el array en el sub-sub-documento
                setCondProConValoresData(updatedCondProConValoresData);

                // Crear un nuevo objeto con las actualizaciones del sub-documento
                const updatedCondProCondicionData = {
                    ...SelectedCondicionProductoData,
                    Valores: updatedCondProConValoresData,
                };
                console.log("Nuevo CondicionProductoData: ", updatedCondProCondicionData);

                // Equipo 2: Añadir la informacion actualizada del sub-documento mediante redux
                dispatch(SET_SELECTED_CONDPROCONDICION_DATA(updatedCondProCondicionData));

                // Actualizar el array en el sub-sub-documento
                setCondProCondicionData(updatedCondProCondicionData);

                // Crear un nuevo objeto con las actualizaciones del sub-documento
                const updatedCondicionProductoData = {
                    ...SelectedCondicionProductoData,
                    condicion: updatedCondProCondicionData,
                };
                console.log("Nuevo CondicionProductoData: ", updatedCondicionProductoData);

                // Equipo 2: Añadir la informacion actualizada del sub-documento mediante redux
                dispatch(SET_SELECTED_CONDICIONPRODUCTO_DATA(updatedCondicionProductoData));

                // Equipo 2: Actualizar el array del sub-documento
                setCondicionProductoData(updatedCondicionProductoData);

                // Crear un nuevo objeto con los cambios en el PriceList
                const updatedPriceListData = {
                    ...SelectedPriceListData,
                    cat_listas_condicion_prod_serv: updatedCondicionProductoData,
                };
                console.log("Nuevo selectedPriceListData: ", updatedPriceListData);
                
                // Actualizar el documento PriceList en BD
                await PatchOnePriceList(updatedPriceListData);

                // Equipo 2: Añadir la informacion actualizada mediante redux
                dispatch(SET_SELECTED_PRICELIST_DATA(updatedPriceListData));

                setMensajeExitoAlert("Documento Modificado Exitosamente");
            } catch (e) {
                console.error("Error al Crear:", e);
                setMensajeErrorAlert(`No se pudo Modificar CondProConValores`);
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
            open={EditCondProConValoresShowModal}
            onClose={() => setEditCondProConValoresShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Editar Valores</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de la Lista de Precios*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Equipo 2: Campos de captura o selección */}
                    <TextField
                        id="valor"
                        label="valor*"
                        value={formik.values.valor}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.valor && Boolean(formik.errors.valor)}
                        helperText={formik.touched.valor && formik.errors.valor}
                    />
                    <Select
                        value={formik.values.IdComparaValor}
                        label="Selecciona un Tipo de Comparador:"
                        name="IdComparaValor"
                        onBlur={formik.handleBlur}
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.IdComparaValor && Boolean(formik.errors.IdComparaValor)}
                        onChange={(e) => {
                            const selectedTipoComparador = e.target.key;
                            formik.setFieldValue("IdComparaValor", selectedTipoComparador);
                            formik.handleChange(e);
                        }}
                    >
                        {TipoComparadorValues.map((tipo) => (
                            <MenuItem
                                value={tipo.IdValorOK}
                                key={tipo.Valor}
                            >
                                {tipo.Valor}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                {/* Equipo 2: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Box m="auto">
                        {console.log("mensajeExitoAlert", mensajeExitoAlert)}
                        {console.log("mensajeErrorAlert", mensajeErrorAlert)}
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
                        onClick={() => setEditCondProConValoresShowModal(false)}
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
export default EditCondProConValoresModal;