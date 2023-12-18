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
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
//Equipo 2: Services
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";
import getAllLabels from "../../../prices/services/remote/get/getAllLabels";
//Equipo 2: Helpers
import { CondicionProductoValues } from "../../helpers/CondicionProductoValues";
//Equipo 2: Redux
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { useSelector, useDispatch } from "react-redux";

const EditCondicionProductoModal = ({ EditCondicionProductoShowModal, setEditCondicionProductoShowModal, RowData }) => {
    //Equipo 2: Inicializacion de States
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [TipoPromocionValues, setTipoPromocionValues] = useState([]);
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const selectedPriceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //Equipo 2: controlar el estado de la data de CondicionProducto.
    const [CondicionProductoData, setCondicionProductoData] = useState([]);
    //Equipo 2: Dispatch para actualizar la data local
    const dispatch = useDispatch();
    //Loader
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        getDataSelectEtiquetas();
    }, []);

    //Equipo 2: useEffect para cargar datos
    useEffect(() => {
        async function fetchData() {
            try {
                setCondicionProductoData(selectedPriceListData.cat_listas_condicion_prod_serv);
            } catch (error) {
                console.error("Error al cargar las CondicionProducto en useEffect de EditCondicionProductoModal:", error);
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
            const TipoPromocion = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoFormula"
            );
            setTipoPromocionValues(TipoPromocion.valores);
        } catch (e) {
            console.error("Error al obtener Etiquetas para Tipos de Lista:", e);
        }
    }

    //Equipo 2: Definición del Formik
    const formik = useFormik({
        initialValues: {
            DesPromo: RowData.DesPromo,
            IdTipoPromoOK: RowData.IdTipoPromoOK,
            Formula: RowData.Formula
        },
        validationSchema: Yup.object({
            DesPromo: Yup.string().required("Campo requerido"),
            IdTipoPromoOK: Yup.string().required("Campo requerido"),
            Formula: Yup.string().required("Campo requerido"),
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
                const CondProducto = CondicionProductoValues(values);

                //Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondicionProducto>>", CondProducto);

                // Equipo 2: Encuentra el índice del elemento en CondicionProductoData que coincide con RowData
                const indexToUpdate = CondicionProductoData.findIndex(item => (
                    item.DesPromo === RowData.DesPromo
                    && item.IdTipoPromoOK === RowData.IdTipoPromoOK
                    && item.Formula === RowData.Formula
                ));

                // Equipo 2: Si se encuentra el índice, actualiza ese elemento, si no, agrega uno nuevo
                const updatedCondicionProductoData = [...CondicionProductoData];
                if (indexToUpdate !== -1) {
                    updatedCondicionProductoData[indexToUpdate] = CondProducto;
                } else {
                    updatedCondicionProductoData.push(CondProducto);
                }

                // Equipo 2: Actualizar el array en el objeto
                setCondicionProductoData(updatedCondicionProductoData);

                // Equipo 2: Actualizar el documento PriceList
                const updatedSelectedPriceListData = {
                    ...selectedPriceListData,
                    cat_listas_condicion_prod_serv: updatedCondicionProductoData,
                };
                console.log("Nuevo selectedPriceListData: ", updatedSelectedPriceListData);

                // Equipo 2: Modifica una Presentacion de Precios Mediante Patch
                await PatchOnePriceList(updatedSelectedPriceListData);

                // Equipo 2: Añadir la informacion actualizada mediante redux
                dispatch(SET_SELECTED_PRICELIST_DATA(updatedSelectedPriceListData));

                //Equipo 2: si no hubo error en el metodo anterior
                //entonces lanzamos la alerta de exito.
                setMensajeExitoAlert("CondicionProducto fue Actualizado Correctamente");
            } catch (e) {
                console.log("Error al Modificar: ", e);
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la CondicionProducto");
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
            open={EditCondicionProductoShowModal}
            onClose={() => setEditCondicionProductoShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Modificar Promocion</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de Condicion Producto*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Equipo 2: Campos de captura o selección */}
                    <TextField
                        id="DesPromo"
                        label="DesPromo*"
                        value={formik.values.DesPromo}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.DesPromo && Boolean(formik.errors.DesPromo)}
                        helperText={formik.touched.DesPromo && formik.errors.DesPromo}
                    />
                    <Autocomplete
                        value={TipoPromocionValues.find(tipo => tipo.IdValorOK === formik.values.IdTipoPromoOK) || null}
                        options={TipoPromocionValues}
                        getOptionLabel={(tipo) => tipo.Valor}
                        onChange={(e, selectedTipoPromocion) => {
                            formik.setFieldValue("IdTipoPromoOK", selectedTipoPromocion ? selectedTipoPromocion.IdValorOK : "");
                            formik.handleChange(e);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un Tipo de Promoción:"
                                onBlur={formik.handleBlur}
                                disabled={!!mensajeExitoAlert}
                                error={formik.touched.IdTipoPromoOK && Boolean(formik.errors.IdTipoPromoOK)}
                                helperText={formik.touched.IdTipoPromoOK && formik.errors.IdTipoPromoOK}
                            />
                        )}
                    />
                    <TextField
                        id="Formula"
                        label="Formula*"
                        value={formik.values.Formula}
                        {...commonTextFieldProps}
                        error={formik.touched.Formula && Boolean(formik.errors.Formula)}
                        helperText={formik.touched.IdLisFormulataBK && formik.errors.Formula}
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
                        onClick={() => setEditCondicionProductoShowModal(false)}
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

                    >
                        <span>MODIFICAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default EditCondicionProductoModal;