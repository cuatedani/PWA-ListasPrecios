//Equipo 2: React
import React, { useState, useEffect } from "react";
//Equipo 2: Material UI
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions,
    Box, Alert, Select, MenuItem
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
//Equipo 2: Services
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";
import getAllLabels from "../../../prices/services/remote/get/getAllLabels";
//Equipo 2: Helpers
import { CondProCondicionValues } from "../../helpers/CondProCondicionValues";
//Equipo 2: Redux
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { SET_SELECTED_CONDICIONPRODUCTO_DATA } from "../../redux/slices/CondicionProductoSlice";

const AddCondProCondicionModal = ({ AddCondProCondicionShowModal, setAddCondProCondicionShowModal }) => {
    //Equipo 2: Inicializacion de States
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [TipoEtiquetaValues, setTipoEtiquetaValues] = useState([]);
    const [TipoComparadorValues, setTipoComparadorValues] = useState([]);
    const [TipoOperadorValues, setTipoOperadorValues] = useState([]);

    //Equipo 2: Dispatch para actualizar la data local
    const dispatch = useDispatch();
    //Equipo 2: Loader
    const [Loading, setLoading] = useState(false);
    //Equipo2: Constantes Para Almacenar la Data de los Documentos Superiores
    const [PriceListData, setPriceListData] = useState(null);
    const [CondicionProductoData, setCondicionProductoData] = useState(null);
    const [CondProCondicionData, setCondProCondicionData] = useState(null);
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const SelectedPriceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", priceListData);
    //Equipo 2: Mediante redux obtener la data que se envió de CondicionProductoTable
    const SelectedCondicionProductoData = useSelector((state) => state.CondicionProductoReducer.SelCondicionProductoData);
    //console.log("<<DATA DEL DOCUMENTO SELECCIONADO RECIBIDA>>:", condicionProductoData);

    //Equipo 2: useEffect para cargar datos
    useEffect(() => {
        async function fetchData() {
            try {
                getDataSelectEtiquetas();
                setCondicionProductoData(SelectedPriceListData.cat_listas_condicion_prod_serv);
                setCondProCondicionData(SelectedCondicionProductoData.condicion);
            } catch (error) {
                console.error("Error al cargar los datos en useEffect de CondProCondicionModal:", error);
            }
        }
        fetchData();
    }, []);

    //Equipo 2: Ejecutamos la API que obtiene todos los Etiquetas.
    async function getDataSelectEtiquetas() {
        try {
            //Obtenemos todas las etiquetas
            const Labels = await getAllLabels();
            //Obtenemosa las Etiquetas IdTipoGrupo
            const TipoEtiqueta = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoGrupo"
            );
            setTipoEtiquetaValues(TipoEtiqueta.valores);

            //Obtenemosa las Etiquetas IdTipoComparador
            const TipoComparador = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoOperadorAritmetico"
            );
            setTipoComparadorValues(TipoComparador.valores);

            //Obtenemosa las Etiquetas IdTipoOperadorAritmetico
            const TipoOperador = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoComparadorLogico"
            );
            setTipoOperadorValues(TipoOperador.valores);
        } catch (e) {
            console.error("Error al obtener Etiquetas para Tipos de Lista:", e);
        }
    }

    //Equipo 2: Definición del Formik
    const formik = useFormik({
        initialValues: {
            IdEtiqueta: "",
            Etiqueta: "",
            IdOpComparaValores: "",
            IdOpLogicoEtiqueta: "",
        },
        validationSchema: Yup.object({
            IdEtiqueta: Yup.string().required("Campo requerido"),
            Etiqueta: Yup.string().required("Campo requerido"),
            IdOpComparaValores: Yup.string().required("Campo requerido"),
            IdOpLogicoEtiqueta: Yup.string().required("Campo requerido"),
        }),

        //Equipo 2: Metodo que acciona el boton
        onSubmit: async (values) => {

            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Guardar");
            //Equipo 2: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                //Equipo 2: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const CondProCon = CondProCondicionValues(values);

                // Equipo 2: mandamos a consola los datos extraidos
                //console.log("<<CondProCondicion>>", CondProCon);

                // Equipo 2: Añadir el nuevo valor a la coleccion
                const updatedCondProCondicionData = [...CondProCondicionData, CondProCon];

                // Actualizar el array en el sub-sub-documento
                setCondProCondicionData(updatedCondProCondicionData);

                // Crear un nuevo objeto con las actualizaciones del sub-documento
                const updatedCondicionProductoData = {
                    ...selectedCondicionProductoData,
                    condicion: updatedCondProCondicionData,
                };
                console.log("Nuevo selectedCondicionProductoData: ", updatedCondicionProductoData);

                // Equipo 2: Añadir la informacion actualizada del sub-documento mediante redux
                dispatch(SET_SELECTED_CONDICIONPRODUCTO_DATA(updatedCondicionProductoData));

                // Equipo 2: Actualizar el array del sub-documento
                setCondicionProductoData(updatedCondicionProductoData);

                // Crear un nuevo objeto con los cambios en el PriceList
                const updatedPriceListData = {
                    ...selectedPriceListData,
                    cat_listas_condicion_prod_serv: updatedCondicionProductoData,
                };
                console.log("Nuevo selectedPriceListData: ", updatedPriceListData);

                // Actualizar el documento PriceList en BD
                await PatchOnePriceList(updatedPriceListData);

                // Equipo 2: Añadir la informacion actualizada mediante redux
                dispatch(SET_SELECTED_PRICELIST_DATA(updatedPriceListData));

                setMensajeExitoAlert("Documento Creado Exitosamente");
            } catch (e) {
                console.error("Error al Crear:", e);
                setMensajeErrorAlert(`No se pudo crear CondProCondicion`);
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
            open={AddCondProCondicionShowModal}
            onClose={() => setAddCondProCondicionShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nueva Condicion</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de la Lista de Precios*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Equipo 2: Campos de captura o selección */}
                    <TextField
                        id="IdEtiqueta"
                        label="IdEtiqueta*"
                        value={formik.values.IdEtiqueta}
                        {...commonTextFieldProps}
                        error={formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta)}
                        disabled={true}
                        helperText={formik.touched.IdEtiqueta && formik.errors.IdEtiqueta}
                    />
                    <Autocomplete
                        value={TipoEtiquetaValues.find(tipo => tipo.IdValorOK === formik.values.IdEtiqueta) || null}
                        options={TipoEtiquetaValues}
                        getOptionLabel={(tipo) => tipo.Valor}
                        onChange={(e, selectedTipoEtiqueta) => {
                            const selectedKey = selectedTipoEtiqueta ? selectedTipoEtiqueta.IdValorOK : "";
                            formik.setFieldValue("Etiqueta", selectedKey);
                            formik.setFieldValue("IdEtiqueta", selectedKey);
                            formik.handleChange(e);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un Tipo de Etiqueta:"
                                {...commonTextFieldProps}
                                onBlur={formik.handleBlur}
                                disabled={!!mensajeExitoAlert}
                                error={formik.touched.Etiqueta && Boolean(formik.errors.Etiqueta)}
                                helperText={formik.touched.Etiqueta && formik.errors.Etiqueta}
                            />
                        )}
                    />
                    <Autocomplete
                        value={TipoComparadorValues.find(tipo => tipo.IdValorOK === formik.values.IdOpComparaValores) || null}
                        options={TipoComparadorValues}
                        getOptionLabel={(tipo) => tipo.Valor}
                        onChange={(e, selectedTipoComparador) => {
                            formik.setFieldValue("IdOpComparaValores", selectedTipoComparador ? selectedTipoComparador.IdValorOK : "");
                            formik.handleChange(e);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un Tipo de Comparador:"
                                onBlur={formik.handleBlur}
                                disabled={!!mensajeExitoAlert}
                                error={formik.touched.IdOpComparaValores && Boolean(formik.errors.IdOpComparaValores)}
                                helperText={formik.touched.IdOpComparaValores && formik.errors.IdOpComparaValores}
                            />
                        )}
                    />
                    <Autocomplete
                        value={TipoOperadorValues.find(tipo => tipo.IdValorOK === formik.values.IdOpLogicoEtiqueta) || null}
                        options={TipoOperadorValues}
                        getOptionLabel={(tipo) => tipo.Valor}
                        onChange={(e, selectedTipoOperador) => {
                            formik.setFieldValue("IdOpLogicoEtiqueta", selectedTipoOperador ? selectedTipoOperador.IdValorOK : "");
                            formik.handleChange(e);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un Tipo de Operador Logico:"
                                onBlur={formik.handleBlur}
                                disabled={!!mensajeExitoAlert}
                                error={formik.touched.IdOpLogicoEtiqueta && Boolean(formik.errors.IdOpLogicoEtiqueta)}
                                helperText={formik.touched.IdOpLogicoEtiqueta && formik.errors.IdOpLogicoEtiqueta}
                            />
                        )}
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
                        onClick={() => setAddCondProCondicionShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                    {/* Equipo 2: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddCondProCondicionModal;