import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CondProCondicionValues } from "../../helpers/CondProCondicionValues";
import { PatchOnePriceList } from "../../services/remote/patch/PatchOnePriceList";

const EditCondProCondicionModal = ({ EditCondProCondicionShowModal, setEditCondProCondicionShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
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
        onSubmit: async (values) => {

            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Guardar");
            //Equipo 2: reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const CondRolCondicion = CondProCondicionValues(values);

                //Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondProCondicion>>", CondProCondicion);
                await EditOneCondProCondicion(CondProCondicion);

                setMensajeExitoAlert("CondProCondicion fue creado y guardado Correctamente");

            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la CondProCondicion");
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
            open={EditCondProCondicionShowModal}
            onClose={() => setEditCondProCondicionShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Editar Nueva Condicion</strong>
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
                        onClick={() => setEditCondProCondicionShowModal(false)}
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
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default EditCondProCondicionModal;