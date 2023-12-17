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
import { CondRolCondicionValues } from "../../helpers/CondRolCondicionValues";
//Equipo 2: Redux
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { SET_SELECTED_CONDICIONROLES_DATA } from "../../redux/slices/CondicionRolesSlice";

const AddCondRolCondicionModal = ({ AddCondRolCondicionShowModal, setAddCondRolCondicionShowModal }) => {
    //Equipo 2: Inicializacion de States
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
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

    //Equipo 2: useEffect para cargar datos
    useEffect(() => {
        async function fetchData() {
            try {
                setCondicionRolesData(selectedPriceListData.cat_listas_condicion_roles);
                setCondRolCondicionData(selectedCondicionRolesData.condicion);
            } catch (error) {
                console.error("Error al cargar las Presentaciondes de Precios en useEffect de AddPresentaPreciosModal:", error);
            }
        }
        fetchData();
    }, []);

    //Equipo 2: Definición del Formik
    const formik = useFormik({

        //Equipo 2: Valores Iniciales
        initialValues: {
            IdTipoCondicionOK: "",
            IdTipoOperadorOK: "",
            Valor: "",
            Secuecia: "",
        },

        //Equipo 2: Restricciones
        validationSchema: Yup.object({
            IdTipoCondicionOK: Yup.string().required("Campo requerido"),
            IdTipoOperadorOK: Yup.string().required("Campo requerido"),
            Valor: Yup.string().required("Campo requerido"),
            Secuecia: Yup.string().required("Campo requerido"),
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
                const CondRolCon = CondRolCondicionValues(values);

                // Equipo 2: mandamos a consola los datos extraidos
                //console.log("<<PresentaPrecio>>", PresentaPrecio);

                // Equipo 2: Añadir el nuevo valor a la coleccion
                const updatedCondRolCondicionData = [...CondRolCondicionData, CondRolCon];

                // Actualizar el array en el sub-sub-documento
                setCondRolCondicionData(updatedCondRolCondicionData);

                // Crear un nuevo objeto con las actualizaciones del sub-documento
                const updatedCondicionRolesData = {
                    ...selectedCondicionRolesData,
                    condicion: updatedCondRolCondicionData,
                };
                console.log("Nuevo selectedPriceListData: ", updatedCondicionRolesData);

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

                setMensajeExitoAlert("Documento Creado Exitosamente");
            } catch (e) {
                console.error("Error al Crear:", e);
                setMensajeErrorAlert(`No se pudo crear ConRolCondicion`);
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
            open={AddCondRolCondicionShowModal}
            onClose={() => setAddCondRolCondicionShowModal(false)}
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
                        id="IdTipoCondicionOK"
                        label="IdTipoCondicionOK*"
                        value={formik.values.IdTipoCondicionOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdTipoCondicionOK && Boolean(formik.errors.IdTipoCondicionOK)}
                        helperText={formik.touched.IdTipoCondicionOK && formik.errors.IdTipoCondicionOK}
                    />
                    <TextField
                        id="IdTipoOperadorOK"
                        label="IdTipoOperadorOK*"
                        value={formik.values.IdTipoOperadorOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdTipoOperadorOK && Boolean(formik.errors.IdTipoOperadorOK)}
                        helperText={formik.touched.IdTipoOperadorOK && formik.errors.IdTipoOperadorOK}
                    />
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
                        onClick={() => setAddCondRolCondicionShowModal(false)}
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
export default AddCondRolCondicionModal;