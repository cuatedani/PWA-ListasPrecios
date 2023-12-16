import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CondicionRolesValues } from "../../helpers/CondicionRolesValues";
import { PatchOnePriceList } from "../../services/remote/patch/PatchOnePriceList";

const EditCondicionRolesModal = ({ EditCondicionRolesShowModal, setEditCondicionRolesShowModal }) => {
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
                const CondicionRoles = CondicionRolesValues(values);

                //Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondicionRoles>>", CondicionRoles);

                await EditOneCondicionRoles(CondicionRoles);

                setMensajeExitoAlert("CondicionRoles fue creado y guardado Correctamente");
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
                    >
                        <span>MODIFICAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default EditCondicionRolesModal;