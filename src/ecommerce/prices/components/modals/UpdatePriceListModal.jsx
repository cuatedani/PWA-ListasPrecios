import React, { useState, useEffect } from "react";
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField,
    DialogActions, Box, Alert, InputLabel, Select, MenuItem, FormHelperText
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PriceListValues } from "../../helpers/PriceListValues";
import { PatchOnePriceList } from "../../../prices/services/remote/patch/PatchOnePriceList";
//import getAllInstitutes from "../../../../security/institutes/services/remote/get/getInstitutesAll";
import GetAllLabels from "../../services/remote/get/getAllLabels";

const EditPriceListModal =
    ({ EditPriceListShowModal, setAddPriceListShowModal, RowData }) => {
        const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
        const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
        const [InstitutesValues, setInstitutesValues] = useState([]);
        const [TipoListaValues, setTipoListaValues] = useState([]);
        const [ListaPreciosData, setPricesListData] = useState([]);
        const [Loading, setLoading] = useState(false);

        useEffect(() => {
            //getDataSelectInstitutes();
            getDataSelectTipoLista();
        }, []);

        //Equipo 2: Ejecutamos la API que obtiene todos los institutos.
        /* async function getDataSelectInstitutes() {
            try {
                const Institutes = await getAllInstitutes();
                setInstitutesValues(Institutes);
            } catch (e) {
                console.error("Error al obtener Etiquetas para Tipos Giros de Institutos:", e);
            }
        } */

        //Equipo 2: Funcion para obtener los Tipos de Lista
        async function getDataSelectTipoLista() {
            try {
                const Labels = await GetAllLabels();
                const TipoListasTypes = Labels.find(
                    (label) => label.IdEtiquetaOK === "IdTipoListas"
                );
                setTipoListaValues(TipoListasTypes);
            } catch (e) {
                console.error("Error al obtener Etiquetas para Tipo de Listas de Lista de Precios:", e);
            }
        }

        const formik = useFormik({
            initialValues: {
                IdInstitutoOK: ListaPreciosData.IdInstitutoOK,
                IdListaOK: ListaPreciosData.IdListaOK,
                IdListaBK: ListaPreciosData.IdListaBK,
                DesLista: ListaPreciosData.DesLista,
                FechaExpiraIni: ListaPreciosData.FechaExpiraIni,
                FechaExpiraFin: ListaPreciosData.FechaExpiraFin,
                IdTipoListaOK: ListaPreciosData.IdTipoListaOK,
                IdTipoGeneraListaOK: ListaPreciosData.IdTipoGeneraListaOK,
                IdListaBaseOK: ListaPreciosData.IdListaBaseOK,
                IdTipoFormulaOK: ListaPreciosData.IdTipoFormulaOK,
            },
            validationSchema: Yup.object({
                IdInstitutoOK: Yup.string().required("Campo requerido"),
                IdListaOK: Yup.string().required("Campo requerido"),
                IdListaBK: Yup.string().required("Campo requerido"),
                DesLista: Yup.string().required("Campo requerido"),
                FechaExpiraIni: Yup.date().required("Campo requerido"),
                FechaExpiraFin: Yup.date()
                    .required("Campo requerido")
                    .min(Yup.ref("FechaExpiraIni"), "La fecha final no puede ser antes que la fecha de Inicio"),
                IdTipoListaOK: Yup.string().required("Campo requerido"),
                IdTipoGeneraListaOK: Yup.string().required("Campo requerido"),
                IdListaBaseOK: Yup.string().required("Campo requerido"),
                IdTipoFormulaOK: Yup.string().required("Campo requerido"),
            }),
            onSubmit: async (values) => {
                //Equipo 2: Mostramos el loading
                setLoading(true);

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
                    const PriceList = PriceListValues(values);

                    //Equipo 2: mandamos a consola los datos extraidos
                    console.log("<<PriceList>>", PriceList);

                    //Equipo 2: llamar el metodo que desencadena toda la logica
                    //para ejecutar la API "AddOnePriceList" y que previamente
                    //construye todo el JSON de la coleccion de PricesList para
                    //que pueda enviarse en el "body" de la API y determinar si
                    //la inserción fue o no exitosa.
                    await PatchOne(PriceList.IdListaOK, PriceList);
                    //Equipo 2: si no hubo error en el metodo anterior
                    //entonces lanzamos la alerta de exito.
                    setMensajeExitoAlert("PriceList fue Actualizado Correctamente");
                    //Equipo 2: falta actualizar el estado actual (documentos/data) para que
                    //despues de insertar el nuevo instituto se visualice en la tabla,
                    //pero esto se hara en la siguiente nota.
                    //fetchDataPriceList();
                } catch (e) {
                    setMensajeExitoAlert(null);
                    setMensajeErrorAlert("No se pudo Actualizar la PriceList");
                }
                //Equipo: ocultamos el Loading.
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
                open={EditPriceListShowModal}
                onClose={() => setEditPriceListShowModal(false)}
                fullWidth
            >
                <form onSubmit={formik.handleSubmit}>
                    {/* Equipo 2: Aqui va el Titulo de la Modal */}
                    <DialogTitle>
                        <Typography>
                            <strong>Modificar Lista de Precios</strong>
                        </Typography>
                    </DialogTitle>
                    {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de la Lista de Precios*/}
                    <DialogContent
                        sx={{ display: 'flex', flexDirection: 'column' }}
                        dividers
                    >
                        {/* Equipo 2: Campos de captura o selección */}
                        {/*<Select
                        value={formik.values.IdInstitutoOK}
                        label="Selecciona un Instituto"
                        name="IdInstitutoOK"
                        onBlur={formik.handleBlur}
                        disabled={true}
                        error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
                        onChange={(e) => {
                            const selectedInstituto = e.target.value;
                            const generatedId = generateId(); // Puedes utilizar tu lógica para generar el IdGenerado
                            formik.setFieldValue("IdInstitutoOK", selectedInstituto);
                            formik.setFieldValue("IdListaOK", `${selectedInstituto}-${generatedId}`);
                            formik.handleChange;
                        }}
                    >
                        {InstitutesValues.map((instituto) => (
                            <MenuItem
                                value={instituto.IdInstitutoOK}
                                key={instituto.Alias}
                            >
                                {instituto.Alias}
                            </MenuItem>
                        ))}
                    </Select>
                    */}

                        <TextField
                            id="IdInstitutoOK"
                            label="IdInstitutoOK*"
                            value={formik.values.IdInstitutoOK}
                            disabled={true}
                            {...commonTextFieldProps}
                            error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
                            helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
                        />

                        <TextField
                            id="IdListaOK"
                            label="IdListaOK*"
                            value={formik.values.IdListaOK}
                            disabled={true}
                            {...commonTextFieldProps}
                            error={formik.touched.IdListaOK && Boolean(formik.errors.IdListaOK)}
                            helperText={formik.touched.IdListaOK && formik.errors.IdListaOK}
                        />
                        <TextField
                            id="IdListaBK"
                            label="IdListaBK*"
                            value={formik.values.IdListaBK}
                            {...commonTextFieldProps}
                            error={formik.touched.IdListaBK && Boolean(formik.errors.IdListaBK)}
                            helperText={formik.touched.IdListaBK && formik.errors.IdListaBK}
                        />
                        <TextField
                            id="DesLista"
                            label="DesLista*"
                            value={formik.values.DesLista}
                            {...commonTextFieldProps}
                            error={formik.touched.DesLista && Boolean(formik.errors.DesLista)}
                            helperText={formik.touched.DesLista && formik.errors.DesLista}
                        />
                        <DatePicker
                            id="FechaExpiraIni"
                            label="FechaExpiraIni*"
                            value={formik.values.FechaExpiraIni}
                            onChange={(date) => formik.setFieldValue("FechaExpiraIni", date)}
                            renderInput={(params) => (
                                <TextField
                                    {...params.inputProps}
                                    {...commonTextFieldProps}
                                    error={formik.touched.FechaExpiraIni && Boolean(formik.errors.FechaExpiraIni)}
                                    helperText={formik.touched.FechaExpiraIni && formik.errors.FechaExpiraIni}
                                />
                            )}
                        />
                        <DatePicker
                            id="FechaExpiraFin"
                            label="FechaExpiraFin*"
                            value={formik.values.FechaExpiraFin}
                            minDate={formik.values.FechaExpiraIni}
                            onChange={(date) => formik.setFieldValue("FechaExpiraFin", date)}
                            renderInput={(params) => (
                                <TextField
                                    {...params.inputProps}
                                    {...commonTextFieldProps}
                                    error={formik.touched.FechaExpiraFin && Boolean(formik.errors.FechaExpiraFin)}
                                    helperText={formik.touched.FechaExpiraFin && formik.errors.FechaExpiraFin}
                                />
                            )}
                        />
                        <TextField
                            id="IdTipoListaOK"
                            label="IdTipoListaOK*"
                            value={formik.values.IdTipoListaOK}
                            {...commonTextFieldProps}
                            error={formik.touched.IdTipoListaOK && Boolean(formik.errors.IdTipoListaOK)}
                            helperText={formik.touched.IdTipoListaOK && formik.errors.IdTipoListaOK}
                        />
                        <Select
                            value={formik.values.IdTipoListaOK}
                            label="Selecciona un Tipo de Lista:"
                            name="IdTipoListaOK"
                            onBlur={formik.handleBlur}
                            disabled={!!mensajeExitoAlert}
                            error={formik.touched.IdTipoListaOK && Boolean(formik.errors.IdTipoListaOK)}
                            onChange={(e) => {
                                const selectedTipoLista = e.target.value;
                                formik.setFieldValue("IdTipoListaOK", selectedTipoLista);
                                formik.handleChange(e);
                             }}
                        >
                            {TipoListaValues.map((tipo) => (
                                <MenuItem
                                    value={tipo.IdValorOK}
                                    key={tipo.Valor}
                                >
                                    {tipo.Valor}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            id="IdTipoGeneraListaOK"
                            label="IdTipoGeneraListaOK*"
                            value={formik.values.IdTipoGeneraListaOK}
                            {...commonTextFieldProps}
                            error={formik.touched.IdTipoGeneraListaOK && Boolean(formik.errors.IdTipoGeneraListaOK)}
                            helperText={formik.touched.IdTipoGeneraListaOK && formik.errors.IdTipoGeneraListaOK}
                        />
                        <TextField
                            id="IdListaBaseOK"
                            label="IdListaBaseOK*"
                            value={formik.values.IdListaBaseOK}
                            {...commonTextFieldProps}
                            error={formik.touched.IdListaBaseOK && Boolean(formik.errors.IdListaBaseOK)}
                            helperText={formik.touched.IdListaBaseOK && formik.errors.IdListaBaseOK}
                        />
                        <TextField
                            id="IdTipoFormulaOK"
                            label="IdTipoFormulaOK*"
                            value={formik.values.IdTipoFormulaOK}
                            {...commonTextFieldProps}
                            error={formik.touched.IdTipoFormulaOK && Boolean(formik.errors.IdTipoFormulaOK)}
                            helperText={formik.touched.IdTipoFormulaOK && formik.errors.IdTipoFormulaOK}
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
                            onClick={() => setAddPriceListShowModal(false)}
                        >
                            <span>CERRAR</span>
                        </LoadingButton>
                        <LoadingButton
                            color="primary"
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
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
export default EditPriceListModal;