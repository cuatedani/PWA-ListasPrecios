//Equipo 2: React
import React, { useState, useEffect } from "react";
//Equipo 2: Material UI
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField,
    DialogActions, Box, Alert, Select, MenuItem
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
//Equipo 2: Services
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";
import getAllLabels from "../../../prices/services/remote/get/getAllLabels";
import getAllProducts from "../../../prices/services/remote/get/getAllProducts";
//Equipo 2: Helpers
import { PresentaPreciosValues } from "../../helpers/PresentaPreciosValues";
//Equipo 2: Redux
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { useSelector, useDispatch } from "react-redux";


const AddPresentaPreciosModal = ({ AddPresentaPreciosShowModal, setAddPresentaPreciosShowModal }) => {
    //Equipo 2: Inicializacion de States
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [TipoFormulaValues, setTipoFormulaValues] = useState([]);
    const [ProductosValues, setProductosValues] = useState([]);
    const [PresentacionesValues, setPresentacionesValues] = useState([]);
    const [SelectProd, setSelectProd] = useState([]);
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const selectedPriceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //Equipo 2: controlar el estado de la data de PresentaPrecios.
    const [PresentaPreciosData, setPresentaPreciosData] = useState([]);
    const dispatch = useDispatch();
    //Loader
    const [Loading, setLoading] = useState(false);

    //Equipo 2: useEffect para cargar datos
    useEffect(() => {
        async function fetchData() {
            try {
                getDataSelectEtiquetas();
                getDataSelectProductos();
                setPresentaPreciosData(selectedPriceListData.cat_listas_presenta_precios);
            } catch (error) {
                console.error("Error al cargar las Presentaciondes de Precios en useEffect de AddPresentaPreciosModal:", error);
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
            const TipoFormula = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoFormula"
            );
            setTipoFormulaValues(TipoFormula.valores);
        } catch (e) {
            console.error("Error al obtener Etiquetas para Tipos de Lista:", e);
        }
    }

    //Equipo 2: Ejecutamos la API que obtiene todos los Productos.
    async function getDataSelectProductos() {
        try {
            //Obtenemos todas las etiquetas
            const Prods = await getAllProducts();
            setProductosValues(Prods);
        } catch (e) {
            console.error("Error al obtener Etiquetas para Tipos de Lista:", e);
        }
    }

   // Equipo 2: Ejecutamos la API que obtiene todas las Presentaciones.
async function getDataSelectPresentaciones() {
    try {
        // Obtenemos todas las Presentaciones
        const Pres = ProductosValues.Presentaciones;
        // Filtrar las presentaciones según el producto seleccionado (SelectProd)
        const presentacionesFiltradas = Pres.filter(presentacion => presentacion.IdProdServOK === SelectProd.IdProdServOK);
        // Setear las presentaciones filtradas
        setPresentacionesValues(presentacionesFiltradas);
    } catch (e) {
        console.error("Error al obtener Presentaciones:", e);
    }
}

    //Equipo 2: Definición del Formik
    const formik = useFormik({

        //Equipo 2: Valores Iniciales
        initialValues: {
            IdProdServOK: "",
            IdPresentaBK: "",
            IdTipoFormulaOK: "",
            Formula: "",
            Precio: "",
        },

        //Equipo 2: Restricciones
        validationSchema: Yup.object({
            IdProdServOK: Yup.string().required("Campo requerido"),
            IdPresentaBK: Yup.string().required("Campo requerido"),
            IdTipoFormulaOK: Yup.string().required("Campo requerido"),
            Formula: Yup.string().required("Campo requerido"),
            Precio: Yup.number().required("Campo requerido"),
        }),

        //Equipo 2: Metodo que acciona el boton
        onSubmit: async (values) => {

            //Equipo 2: Mostramos el loading
            setLoading(true);
            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Guardar");
            // Equipo 2: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                //Equipo 2: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const PresentaPrecio = PresentaPreciosValues(values);

                // Equipo 2: mandamos a consola los datos extraidos
                //console.log("<<PresentaPrecio>>", PresentaPrecio);

                // Equipo 2: Añadir el nuevo valor a la coleccion
                const updatedPresentaPreciosData = [...PresentaPreciosData, PresentaPrecio];

                // Equipo 2: Actualizar el array en el objeto
                setPresentaPreciosData(updatedPresentaPreciosData);

                // Equipo 2: Actualizar el documento PriceList
                const updatedSelectedPriceListData = {
                    ...selectedPriceListData,
                    cat_listas_presenta_precios: updatedPresentaPreciosData,
                };
                //console.log("Nuevo selectedPriceListData: ", updatedSelectedPriceListData);

                // Equipo 2: Agregar una Presentacion de Precios Mediante Patch
                await PatchOnePriceList(updatedSelectedPriceListData);

                // Equipo 2: Añadir la informacion actualizada mediante redux
                dispatch(SET_SELECTED_PRICELIST_DATA(updatedSelectedPriceListData));

                // Equipo 2: si no hubo error en el metodo anterior
                // entonces lanzamos la alerta de exito.
                setMensajeExitoAlert("PresentaPrecios fue creado y guardado Correctamente");
            } catch (e) {
                console.log("Error al Crear: ", e);
                setMensajeErrorAlert("No se pudo crear la PresentaPrecios");
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
            open={AddPresentaPreciosShowModal}
            onClose={() => setAddPresentaPreciosShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Presentacion de Precios</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de la Lista de Precios*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Equipo 2: Campos de captura o selección */}
                    <TextField
                        id="IdProdServOK"
                        label="IdProdServOK*"
                        value={formik.values.IdProdServOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdProdServOK && Boolean(formik.errors.IdProdServOK)}
                        helperText={formik.touched.IdProdServOK && formik.errors.IdProdServOK}
                    />
                    <TextField
                        id="IdPresentaBK"
                        label="IdPresentaBK*"
                        value={formik.values.IdPresentaBK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdPresentaBK && Boolean(formik.errors.IdPresentaBK)}
                        helperText={formik.touched.IdPresentaBK && formik.errors.IdPresentaBK}
                    />
                    <Autocomplete
                        value={TipoFormulaValues.find(tipo => tipo.IdValorOK === formik.values.IdTipoFormulaOK) || null}
                        options={TipoFormulaValues}
                        getOptionLabel={(tipo) => tipo.Valor}
                        onChange={(e, selectedTipoFormula) => {
                            formik.setFieldValue("IdTipoFormulaOK", selectedTipoFormula ? selectedTipoFormula.IdValorOK : "");
                            formik.handleChange(e);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un Tipo de Fórmula:"
                                onBlur={formik.handleBlur}
                                disabled={!!mensajeExitoAlert}
                                error={formik.touched.IdTipoFormulaOK && Boolean(formik.errors.IdTipoFormulaOK)}
                                helperText={formik.touched.IdTipoFormulaOK && formik.errors.IdTipoFormulaOK}
                            />
                        )}
                    />
                    <TextField
                        id="Formula"
                        label="Formula*"
                        value={formik.values.Formula}
                        {...commonTextFieldProps}
                        error={formik.touched.Formula && Boolean(formik.errors.Formula)}
                        helperText={formik.touched.Formula && formik.errors.Formula}
                    />
                    <TextField
                        id="Precio"
                        label="Precio*"
                        value={formik.values.Precio}
                        {...commonTextFieldProps}
                        error={formik.touched.Precio && Boolean(formik.errors.Precio)}
                        helperText={formik.touched.Precio && formik.errors.Precio}
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
                        onClick={() => setAddPresentaPreciosShowModal(false)}
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
export default AddPresentaPreciosModal;