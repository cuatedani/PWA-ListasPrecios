import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CondProCondicionValues } from "../../helpers/CondProCondicionValues";
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";

const AddCondProCondicionModal = ({ AddCondProCondicionShowModal, setAddCondProCondicionShowModal }) => {
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
                //Equipo 2: si fuera necesario meterle valores compuestos o no compuestos
                //a alguns propiedades de formik por la razon que sea, se muestren o no
                //estas propiedades en la ventana modal a travez de cualquier control.
                //La forma de hacerlo seria:
                //formik.values.IdInstitutoBK = `${formik.values.IdInstitutoOK}-${formik.values.IdCEDI}`;
                //formik.values.Matriz = autoChecksSelecteds.join(",");

                //Equipo 2: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const CondRolCondicion = CondProCondicionValues(values);

                //Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondProCondicion>>", CondProCondicion);

                //Equipo 2: llamar el metodo que desencadena toda la logica
                //para ejecutar la API "AddOneCondProCondicion" y que previamente
                //construye todo el JSON de la coleccion de PricesList para
                //que pueda enviarse en el "body" de la API y determinar si
                //la inserción fue o no exitosa.
                await AddOneCondProCondicion(CondProCondicion);
                //Equipo 2: si no hubo error en el metodo anterior
                //entonces lanzamos la alerta de exito.
                setMensajeExitoAlert("CondProCondicion fue creado y guardado Correctamente");
                //Equipo 2: falta actualizar el estado actual (documentos/data) para que
                //despues de insertar el nuevo instituto se visualice en la tabla,
                //pero esto se hara en la siguiente nota.
                //fetchDataCondProCondicion();
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
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddCondProCondicionModal;