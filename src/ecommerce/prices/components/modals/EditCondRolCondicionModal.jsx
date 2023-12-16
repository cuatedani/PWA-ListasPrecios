import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CondRolCondicionValues } from "../../helpers/CondRolCondicionValues";
import { PatchOnePriceList } from "../../services/remote/patch/PatchOnePriceList";

const EditCondRolCondicionModal = ({ EditCondRolCondicionShowModal, setEditCondRolCondicionShowModal, RowData }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const formik = useFormik({
        initialValues: {
            IdTipoCondicionOK: RowData.IdTipoCondicionOK,
            IdTipoOperadorOK: RowData.IdTipoOperadorOK,
            Valor: RowData.Valor,
            Secuecia: RowData.Secuecia,
        },
        validationSchema: Yup.object({
            IdTipoCondicionOK: Yup.string().required("Campo requerido"),
            IdTipoOperadorOK: Yup.string().required("Campo requerido"),
            Valor: Yup.string().required("Campo requerido"),
            Secuecia: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {

            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Guardar");
            //Equipo 2: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const CondRolSecuecia = CondRolCondicionValues(values);
                console.log("<<CondRolCondicion>>", CondRolCondicion);
                await EditOneCondRolCondicion(CondRolCondicion);
                setMensajeExitoAlert("CondRolCondicion fue creado y guardado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la CondRolCondicion");
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
            open={EditCondRolCondicionShowModal}
            onClose={() => setEditCondRolCondicionShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Editar Nueva Condicion</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad*/}
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
                        onClick={() => setEditCondRolCondicionShowModal(false)}
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
export default EditCondRolCondicionModal;