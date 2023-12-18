import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
//import del Helper
import { NegociosValues } from "../../helpers/NegociosValues";
// BD API
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";
import getAllNegocios from "../../services/remote/get/getAllNegocios";
//REDUX
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { useSelector, useDispatch } from "react-redux";

const AddNegociosModal = ({AddNegociosShowModal, setAddNegociosShowModal, onClose}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [NegociosValues, setNegociosValues] = useState([]);
    const [Loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    //Recuperacion de la data
    const selectedPriceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //Equipo 2: controlar el estado de la data de PresentaPrecios.
    const [NegociosData, setNegociosData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                getDataNegocios();
                setNegociosData(selectedPriceListData.cat_listas_negocios);
            } catch (error) {
                console.error("Error al cargar las Presentaciondes de Precios en useEffect de AddNegociosModal:", error);
            }
        }
        fetchData();
    }, []);

    //Equipo 2: Ejecutamos la API que obtiene todos los Negocios.
    async function getDataNegocios() {
        try {
            //Obtenemos todas las etiquetas
            const Negs = await getAllNegocios();
            setNegociosValues(Negs);
        } catch (e) {
            console.error("Error al obtener Etiquetas para Tipos de Lista:", e);
        }
    }

    const formik = useFormik({
        initialValues: {
            IdNegocioOK: "",
        },
        validationSchema: Yup.object({
            IdNegocioOK: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
           
            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Guardar");
            //Equipo 2: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            setLoading(true);
            try {
               
                const Negocios = NegociosValues(values);
                const updatedNegociosData = [...NegociosData, Negocios];  

                setNegociosData(updatedNegociosData);

                const updatedNegociostData = {
                    ...selectedPriceListData,
                    cat_listas_negocios: updatedNegociosData,
                };
                await PatchOnePriceList(updatedNegociostData);
                dispatch(SET_SELECTED_PRICELIST_DATA(updatedNegociostData));
                setMensajeExitoAlert("Negocios fue creado y guardado Correctamente");

              } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la Negocios");
              }
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
            open={AddNegociosShowModal}
            onClose={() => setAddNegociosShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nuevo Negocio</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de Negocios*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Equipo 2: Campos de captura o selección */}
                    <TextField
                        id="IdNegocioOK"
                        label="IdNegocioOK*"
                        value={formik.values.IdNegocioOK}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)}
                        helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
                    />
                    <Autocomplete
                        value={NegociosValues.find(tipo => tipo.IdNegocioOK === formik.values.IdNegocioOK) || null}
                        options={NegociosValues}
                        getOptionLabel={(tipo) => tipo.IdNegocioBK}
                        onChange={(e, selectedNegocio) => {
                            formik.setFieldValue("IdNegocioOK", selectedNegocio ? selectedNegocio.IdValorOK : "");
                            formik.handleChange(e);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un Negocio:"
                                onBlur={formik.handleBlur}
                                disabled={!!mensajeExitoAlert}
                                error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)}
                                helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
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
                        onClick={() => {
                            setAddNegociosShowModal(false);
                            onClose();
                        }}
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
                    >
                        <span>MODIFICAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddNegociosModal;