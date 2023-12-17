//Equipo 2: React
import React, { useState, useEffect } from "react";
//Equipo 2: Material UI
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
//Equipo 2: Services
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";
//Equipo 2: Helpers
import { CondicionRolesValues } from "../../helpers/CondicionRolesValues";
//Equipo 2: Redux
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { useSelector, useDispatch } from "react-redux";

const EditCondicionRolesModal = ({ EditCondicionRolesShowModal, setEditCondicionRolesShowModal, RowData, onClose }) => {
    //Equipo 2: Inicializacion de States
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    //Equipo 2: Mediante redux obtener la data que se envió de PricesListTable
    const selectedPriceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    //Equipo 2: controlar el estado de la data de CondicionRoles.
    const [CondicionRolesData, setCondicionRolesData] = useState([]);
    //Equipo 2: Dispatch para actualizar la data local
    const dispatch = useDispatch();
    //Loader
    const [Loading, setLoading] = useState(false);

    //Equipo 2: useEffect para cargar datos
    useEffect(() => {
        async function fetchData() {
            try {
                setCondicionRolesData(selectedPriceListData.cat_listas_condicion_roles);
            } catch (error) {
                console.error("Error al cargar las Condiciones de Roles en useEffect de EditCondicionRolesModla:", error);
            }
        }
        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            DesCondicion: RowData.DesCondicion,
            FechaExpiraIni: RowData.FechaExpiraIni,
            FechaExpiraFin: RowData.FechaExpiraFin,
            Condicion: RowData.Condicion,
        },
        validationSchema: Yup.object({
            DesCondicion: Yup.string().required("Campo requerido"),
            FechaExpiraIni: Yup.date().required("Campo requerido"),
            FechaExpiraFin: Yup.date()
                .required("Campo requerido")
                .min(Yup.ref("FechaExpiraIni"), "La fecha final no puede ser antes que la fecha de Inicio"),
            Condicion: Yup.string().required("Campo requerido"),
        }),

        //Equipo 2: Metodo que acciona el boton
        onSubmit: async (values) => {

            //Equipo 2: Mostramos el loading
            setLoading(true);
            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Modificar");
            //Equipo 2: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                // Formatear FechaExpiraIni
                const fechaDayjs1 = dayjs(values.FechaExpiraIni);
                const fechaJS1 = fechaDayjs1.isValid() ? fechaDayjs1.toDate() : null;
                values.FechaExpiraIni = fechaJS1 ? fechaJS1.toISOString() : null;

                // Formatear FechaExpiraFin
                const fechaDayjs2 = dayjs(values.FechaExpiraFin);
                const fechaJS2 = fechaDayjs2.isValid() ? fechaDayjs2.toDate() : null;
                values.FechaExpiraFin = fechaJS2 ? fechaJS2.toISOString() : null;

                //Equipo 2: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const CondicionRol = CondicionRolesValues(values);

                //Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondicionRoles>>", CondicionRol);

                // Equipo 2: Encuentra el índice del elemento en CondicionRolesData que coincide con RowData
                const indexToUpdate = CondicionRolesData.findIndex(item => (
                    item.DesCondicion === RowData.DesCondicion
                    && item.FechaExpiraIni === RowData.FechaExpiraIni
                    && item.FechaExpiraFin === RowData.FechaExpiraFin
                    && item.Condicion === RowData.Condicion
                ));

                // Equipo 2: Si se encuentra el índice, actualiza ese elemento, si no, agrega uno nuevo
                const updatedCondicionRolesData = [...CondicionRolesData];
                if (indexToUpdate !== -1) {
                    updatedCondicionRolesData[indexToUpdate] = CondicionRol;
                } else {
                    updatedCondicionRolesData.push(CondicionRol);
                }

                // Equipo 2: Actualizar el array en el objeto
                setCondicionRolesData(updatedCondicionRolesData);

                // Equipo 2: Actualizar el documento PriceList
                const updatedSelectedPriceListData = {
                    ...selectedPriceListData,
                    cat_listas_condicion_roles: updatedCondicionRolesData,
                };
                console.log("Nuevo selectedPriceListData: ", updatedSelectedPriceListData);

                // Equipo 2: Modifica una Presentacion de Precios Mediante Patch
                await PatchOnePriceList(updatedSelectedPriceListData);

                // Equipo 2: Añadir la informacion actualizada mediante redux
                dispatch(SET_SELECTED_PRICELIST_DATA(updatedSelectedPriceListData));

                //Equipo 2: si no hubo error en el metodo anterior
                //entonces lanzamos la alerta de exito.
                setMensajeExitoAlert("CondicionRoles fue Actualizado Correctamente");
            } catch (e) {
                console.log("Error al Modificar: ", e);
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la CondicionRoles");
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
            open={EditCondicionRolesShowModal}
            onClose={() => setEditCondicionRolesShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Editar Condicion Roles</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de la Lista de Precios*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Equipo 2: Campos de captura o selección */}
                    <TextField
                        id="DesCondicion"
                        label="DesCondicion*"
                        value={formik.values.DesCondicion}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.DesCondicion && Boolean(formik.errors.DesCondicion)}
                        helperText={formik.touched.DesCondicion && formik.errors.DesCondicion}
                    />
                    <DatePicker
                        id="FechaExpiraIni"
                        label="FechaExpiraIni*"
                        value={formik.values.FechaExpiraIni ? dayjs(formik.values.FechaExpiraIni) : null}
                        onChange={(date) => formik.setFieldValue("FechaExpiraIni", date ? date.toDate() : null)}
                        textField={(props) => (
                            <TextField
                                {...props}
                                {...commonTextFieldProps}
                                error={formik.touched.FechaExpiraIni && Boolean(formik.errors.FechaExpiraIni)}
                                helperText={formik.touched.FechaExpiraIni && formik.errors.FechaExpiraIni}
                            />
                        )}
                    />
                    <DatePicker
                        id="FechaExpiraFin"
                        label="FechaExpiraFin*"
                        value={formik.values.FechaExpiraFin ? dayjs(formik.values.FechaExpiraFin) : null}
                        onChange={(date) => formik.setFieldValue("FechaExpiraFin", date ? date.toDate() : null)}
                        textField={(props) => (
                            <TextField
                                {...props}
                                {...commonTextFieldProps}
                                error={formik.touched.FechaExpiraFin && Boolean(formik.errors.FechaExpiraFin)}
                                helperText={formik.touched.FechaExpiraFin && formik.errors.FechaExpiraFin}
                            />
                        )}
                    />
                    <TextField
                        id="Condicion"
                        label="Condicion*"
                        value={formik.values.Condicion}
                        {...commonTextFieldProps}
                        error={formik.touched.Condicion && Boolean(formik.errors.Condicion)}
                        helperText={formik.touched.Condicion && formik.errors.Condicion}
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
                        onClick={() => setEditCondicionRolesShowModal(false)}
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
export default EditCondicionRolesModal;