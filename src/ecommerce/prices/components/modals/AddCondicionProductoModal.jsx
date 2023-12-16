import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CondicionProductoValues } from "../../helpers/CondicionProductoValues";
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";

const AddCondicionProductoModal = ({AddCondicionProductoShowModal, setAddCondicionProductoShowModal}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const formik = useFormik({
        initialValues: {
            DesPromo: "",
            IdTipoPromoOK: "",
            Formula: ""
        },
        validationSchema: Yup.object({
            DesPromo: Yup.string().required("Campo requerido"),
            IdTipoPromoOK: Yup.string().required("Campo requerido"),
            Formula: Yup.string().required("Campo requerido"),
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
                const CondicionProducto = CondicionProductoValues(values);

                //Equipo 2: mandamos a consola los datos extraidos
                console.log("<<CondicionProducto>>", CondicionProducto);

                //Equipo 2: llamar el metodo que desencadena toda la logica
                //para ejecutar la API "AddOneCondicionProducto" y que previamente
                //construye todo el JSON de la coleccion de PricesList para
                //que pueda enviarse en el "body" de la API y determinar si
                //la inserción fue o no exitosa.
                await AddOneCondicionProducto(CondicionProducto);
                //Equipo 2: si no hubo error en el metodo anterior
                //entonces lanzamos la alerta de exito.
                setMensajeExitoAlert("CondicionProducto fue creado y guardado Correctamente");
                //Equipo 2: falta actualizar el estado actual (documentos/data) para que
                //despues de insertar el nuevo instituto se visualice en la tabla,
                //pero esto se hara en la siguiente nota.
                //fetchDataCondicionProducto();
              } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la CondicionProducto");
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

    return(
        <Dialog
            open={AddCondicionProductoShowModal}
            onClose={() => setAddCondicionProductoShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nueva Promocion</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de la Lista de Precios*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                    >
                    {/* Equipo 2: Campos de captura o selección */}
                    <TextField
                        id="DesPromo"
                        label="DesPromo*"
                        value={formik.values.DesPromo}
                        /* onChange={formik.handleChange} */
                        {...commonTextFieldProps}
                        error={ formik.touched.DesPromo && Boolean(formik.errors.DesPromo) }
                        helperText={ formik.touched.DesPromo && formik.errors.DesPromo }
                    />
                    <TextField
                        id="IdTipoPromoOK"
                        label="IdTipoPromoOK*"
                        value={formik.values.IdTipoPromoOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdTipoPromoOK && Boolean(formik.errors.IdTipoPromoOK) }
                        helperText={ formik.touched.IdTipoPromoOK && formik.errors.IdTipoPromoOK }
                    />
                    <TextField
                        id="Formula"
                        label="Formula*"
                        value={formik.values.Formula}
                        {...commonTextFieldProps}
                        error={ formik.touched.Formula && Boolean(formik.errors.Formula) }
                        helperText={ formik.touched.IdLisFormulataBK && formik.errors.Formula }
                    />
                    <TextField
                        id="Formula"
                        label="Formula*"
                        value={formik.values.Formula}
                        {...commonTextFieldProps}
                        error={ formik.touched.Formula && Boolean(formik.errors.Formula) }
                        helperText={ formik.touched.Formula && formik.errors.Formula }
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
                        onClick={() => setAddCondicionProductoShowModal(false)}
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
export default AddCondicionProductoModal;