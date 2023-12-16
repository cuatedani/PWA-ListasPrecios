import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CondicionRolesValues } from "../../helpers/CondicionRolesValues";
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";

const AddCondicionRolesModal = ({ AddCondicionRolesShowModal, setAddCondicionRolesShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const formik = useFormik({
        initialValues: {
            DesCondicion: "",
            FechaExpiraIni: "",
            FechaExpiraFin: "",
            Condicion: "",
        },
        validationSchema: Yup.object({
            DesCondicion: Yup.string().required("Campo requerido"),
            FechaExpiraIni: Yup.date().required("Campo requerido"),
            FechaExpiraFin: Yup.date().required("Campo requerido"),
            Condicion: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {

            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Guardar");
            //Equipo 2: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                //Equipo 2: si fuera necesario meterle valores compuestos o no compuestos
                //a alguns propiedades de formik por la razon que sea, se muestren o no
                //estas propiedades en la ventana modal a travez de cualquier control.
                //La forma de hacerlo seria:
                //formik.values.IdInstitutoBK = `${formik.values.IdInstitutoOK}-${formik.values.IdCEDI}`;
                //formik.values.Matriz = autoChecksSelecteds.join(",");

                //Equipo 2: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const CondicionRoles = CondicionRolesValues(values);

                //Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondicionRoles>>", CondicionRoles);

                //Equipo 2: llamar el metodo que desencadena toda la logica
                //para ejecutar la API "AddOneCondicionRoles" y que previamente
                //construye todo el JSON de la coleccion de PricesList para
                //que pueda enviarse en el "body" de la API y determinar si
                //la inserción fue o no exitosa.
                await AddOneCondicionRoles(CondicionRoles);
                //Equipo 2: si no hubo error en el metodo anterior
                //entonces lanzamos la alerta de exito.
                setMensajeExitoAlert("CondicionRoles fue creado y guardado Correctamente");
                //Equipo 2: falta actualizar el estado actual (documentos/data) para que
                //despues de insertar el nuevo instituto se visualice en la tabla,
                //pero esto se hara en la siguiente nota.
                //fetchDataCondicionRoles();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la CondicionRoles");
            }
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
            open={AddCondicionRolesShowModal}
            onClose={() => setAddCondicionRolesShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nueva Condicion Roles</strong>
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
                    <TextField
                        id="FechaExpiraIni"
                        label="FechaExpiraIni*"
                        value={formik.values.FechaExpiraIni}
                        {...commonTextFieldProps}
                        error={formik.touched.FechaExpiraIni && Boolean(formik.errors.FechaExpiraIni)}
                        helperText={formik.touched.FechaExpiraIni && formik.errors.FechaExpiraIni}
                    />
                    <TextField
                        id="FechaExpiraFin"
                        label="FechaExpiraFin*"
                        value={formik.values.FechaExpiraFin}
                        {...commonTextFieldProps}
                        error={formik.touched.FechaExpiraFin && Boolean(formik.errors.FechaExpiraFin)}
                        helperText={formik.touched.IdLisFechaExpiraFintaBK && formik.errors.FechaExpiraFin}
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
                        onClick={() => setAddCondicionRolesShowModal(false)}
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
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddCondicionRolesModal;