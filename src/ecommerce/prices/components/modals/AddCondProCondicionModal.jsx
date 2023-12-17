//Equipo 2: React
import React, { useState, useEffect } from "react";
//Equipo 2: Material UI
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    showMensajeConfirm,
    showMensajeError,
} from "../../../../share/components/elements/messages/MySwalAlerts";
//Equipo 2: Services
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";
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
                setCondicionProductoData(SelectedPriceListData.cat_listas_condicion_prod_serv);
                setCondProCondicionData(SelectedCondicionProductoData.condicion);
            } catch (error) {
                console.error("Error al cargar los datos en useEffect de CondProCondicionModal:", error);
            }
        }
        fetchData();
    }, []);

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
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta)}
                        helperText={formik.touched.IdEtiqueta && formik.errors.IdEtiqueta}
                    />
                    <TextField
                        id="Etiqueta"
                        label="Etiqueta*"
                        value={formik.values.Etiqueta}
                        {...commonTextFieldProps}
                        error={formik.touched.Etiqueta && Boolean(formik.errors.Etiqueta)}
                        helperText={formik.touched.Etiqueta && formik.errors.Etiqueta}
                    />
                    <TextField
                        id="IdOpComparaValores"
                        label="IdOpComparaValores*"
                        value={formik.values.IdOpComparaValores}
                        {...commonTextFieldProps}
                        error={formik.touched.IdOpComparaValores && Boolean(formik.errors.IdOpComparaValores)}
                        helperText={formik.touched.IdLisIdOpComparaValorestaBK && formik.errors.IdOpComparaValores}
                    />
                    <TextField
                        id="IdOpLogicoEtiqueta"
                        label="IdOpLogicoEtiqueta*"
                        value={formik.values.IdOpLogicoEtiqueta}
                        {...commonTextFieldProps}
                        error={formik.touched.IdOpLogicoEtiqueta && Boolean(formik.errors.IdOpLogicoEtiqueta)}
                        helperText={formik.touched.IdOpLogicoEtiqueta && formik.errors.IdOpLogicoEtiqueta}
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