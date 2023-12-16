import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CondProConValoresValues } from "../../helpers/CondProConValoresValues";
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";

const AddCondProConValoresModal = ({ AddCondProConValoresShowModal, setAddCondProConValoresShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const formik = useFormik({
        initialValues: {
            valor: "",
            IdComparaValor: "",
        },
        validationSchema: Yup.object({
            valor: Yup.string().required("Campo requerido"),
            IdComparaValor: Yup.string().required("Campo requerido")
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
                const CondProConValores = CondProConValoresValues(values);

                //Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondProConValores>>", CondProConValores);

                //Equipo 2: llamar el metodo que desencadena toda la logica
                //para ejecutar la API "AddOneCondProConValores" y que previamente
                //construye todo el JSON de la coleccion de PricesList para
                //que pueda enviarse en el "body" de la API y determinar si
                //la inserción fue o no exitosa.
                await AddOneCondProConValores(CondProConValores);
                //Equipo 2: si no hubo error en el metodo anterior
                //entonces lanzamos la alerta de exito.
                setMensajeExitoAlert("CondProConValores fue creado y guardado Correctamente");
                //Equipo 2: falta actualizar el estado actual (documentos/data) para que
                //despues de insertar el nuevo instituto se visualice en la tabla,
                //pero esto se hara en la siguiente nota.
                //fetchDataCondProConValores();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la CondProConValores");
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
            open={AddCondProConValoresShowModal}
            onClose={() => setAddCondProConValoresShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nuevos Valores</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de la Lista de Precios*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Equipo 2: Campos de captura o selección */}
                    <TextField
                        id="valor"
                        label="valor*"
                        value={formik.values.valor}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={formik.touched.valor && Boolean(formik.errors.valor)}
                        helperText={formik.touched.valor && formik.errors.valor}
                    />
                    <TextField
                        id="IdComparaValor"
                        label="IdComparaValor*"
                        value={formik.values.IdComparaValor}
                        {...commonTextFieldProps}
                        error={formik.touched.IdComparaValor && Boolean(formik.errors.IdComparaValor)}
                        helperText={formik.touched.IdComparaValor && formik.errors.IdComparaValor}
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
                        onClick={() => setAddCondProConValoresShowModal(false)}
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
export default AddCondProConValoresModal;