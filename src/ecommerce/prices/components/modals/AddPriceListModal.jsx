import React, { useState, useEffect } from "react";
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField,
    DialogActions, Box, Alert, Select, MenuItem
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PriceListValues } from "../../helpers/PriceListValues";
import { AddOnePriceList } from "../../../prices/services/remote/post/AddOnePriceList";
import getAllInstitutes from "../../../prices/services/remote/get/getAllInstitutes";
import getAllPricesList from '../../services/remote/get/getAllPricesList';
import getAllLabels from "../../../prices/services/remote/get/getAllLabels";
import { v4 as genID } from "uuid";

const AddPriceListModal = ({ AddPriceListShowModal, setAddPriceListShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");

    const [InstitutesValues, setInstitutesValues] = useState([]);
    const [TipoListaValues, setTipoListaValues] = useState([]);
    const [TipoFormulaValues, setTipoFormulaValues] = useState([]);
    const [ListaBaseValues, setListaBaseValues] = useState([]);

    const [Loading, setLoading] = useState(false);
    const [IdGen, setIdGen] = useState(
        genID().replace(/-/g, "").substring(0, 12)
    );

    useEffect(() => {
        getDataSelectInstitutes();
        getDataSelectEtiquetas();
        getDataSelectPriceList();
    }, []);

    //Equipo 2: Ejecutamos la API que obtiene todos los institutos.
    async function getDataSelectInstitutes() {
        try {
            const Institutes = await getAllInstitutes();
            setInstitutesValues(Institutes);
        } catch (e) {
            console.error("Error al obtener los Institutos:", e);
        }
    }

    //Equipo 2: Ejecutamos la API que obtiene todos los Etiquetas.
    async function getDataSelectEtiquetas() {
        try {
            //Obtenemos todas las etiquetas
            const Labels = await getAllLabels();
            //Obtenemosa las Etiquetas IdTipoListasPrecios
            const TipoLista = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoListasPrecios"
            );
            setTipoListaValues(TipoLista.valores);

            //Obtenemosa las Etiquetas IdTipoListasPrecios
            const TipoFormula = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoFormula"
            );
            setTipoFormulaValues(TipoFormula.valores);
        } catch (e) {
            console.error("Error al obtener Etiquetas para Tipos de Lista:", e);
        }
    }

    // Equipo 2: Ejecutamos la API que obtiene las listas de Precio.
    async function getDataSelectPriceList() {
        try {
            const Prices = await getAllPricesList();
            setListaBaseValues(Prices);
        } catch (e) {
            console.error("Error al obtener Listas de Precio:", e);
        }
    }

    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            IdListaOK: "",
            IdListaBK: "",
            DesLista: "",
            FechaExpiraIni: "",
            FechaExpiraFin: "",
            IdTipoListaOK: "",
            IdTipoGeneraListaOK: "",
            IdListaBaseOK: "",
            IdTipoFormulaOK: "",
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Campo requerido"),
            IdListaOK: Yup.string().required("Campo requerido"),
            IdListaBK: Yup.string().required("Campo requerido"),
            DesLista: Yup.string().required("Campo requerido"),
            FechaExpiraIni: Yup.date(),
            FechaExpiraFin: Yup.date().min(Yup.ref("FechaExpiraIni"), "La fecha final no puede ser antes que la fecha de Inicio"),
            IdTipoListaOK: Yup.string().required("Campo requerido"),
            IdTipoGeneraListaOK: Yup.string().required("Campo requerido"),
            IdListaBaseOK: Yup.string().required("Campo requerido"),
            IdTipoFormulaOK: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {

            //Equipo 2: Mostramos el loading
            setLoading(true);
            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Guardar");
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                var fechaDayjs1 = values.FechaExpiraIni;
                const fechaJS1 = fechaDayjs1.toDate();
                values.FechaExpiraIni = fechaJS1.toISOString();

                var fechaDayjs2 = values.FechaExpiraFin;
                const fechaJS2 = fechaDayjs2.toDate();
                values.FechaExpiraFin = fechaJS2.toISOString();

                const PriceList = PriceListValues(values);
                //console.log("<<PriceList>>", PriceList);
                await AddOnePriceList(PriceList);
                setMensajeExitoAlert("PriceList fue creado y guardado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la PriceList");
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
            open={AddPriceListShowModal}
            onClose={() => {
                setAddPriceListShowModal(false);
            }}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* Equipo 2: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nueva Lista de Precios</strong>
                    </Typography>
                </DialogTitle>
                {/* Equipo 2: Aqui va un tipo de control por cada Propiedad de la Lista de Precios*/}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* Equipo 2: Campos de captura o selección */}
                    <Select
                        value={formik.values.IdInstitutoOK}
                        label="Selecciona un Instituto"
                        name="IdInstitutoOK"
                        onBlur={formik.handleBlur}
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
                        onChange={(e) => {
                            const selectedInstituto = e.target.value;
                            formik.setFieldValue("IdInstitutoOK", selectedInstituto);
                            formik.setFieldValue("IdListaOK", `${selectedInstituto}-${IdGen}`);
                            formik.handleChange(e);
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

                    <TextField
                        id="IdListaOK"
                        label="IdListaOK*"
                        value={formik.values.IdListaOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdListaOK && Boolean(formik.errors.IdListaOK)}
                        disabled={true}
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
                        TextFieldComponent={(props) => (
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
                        value={formik.values.FechaExpiraFin}
                        minDate={formik.values.FechaExpiraIni}
                        onChange={(date) => formik.setFieldValue("FechaExpiraFin", date)}
                        TextFieldComponent={(props) => (
                            <TextField
                                {...props}
                                {...commonTextFieldProps}
                                error={formik.touched.FechaExpiraFin && Boolean(formik.errors.FechaExpiraFin)}
                                helperText={formik.touched.FechaExpiraFin && formik.errors.FechaExpiraFin}
                            />
                        )}
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
                    <Select
                        value={formik.values.IdListaBaseOK}
                        label="Selecciona una Lista Base:"
                        name="IdListaBaseOK"
                        onBlur={formik.handleBlur}
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.IdListaBaseOK && Boolean(formik.errors.IdListaBaseOK)}
                        onChange={(e) => {
                            const selectedListaBase = e.target.value;
                            formik.setFieldValue("IdListaBaseOK", selectedListaBase);
                            formik.handleChange(e);
                        }}
                    >
                        {ListaBaseValues.map((tipo) => (
                            <MenuItem
                                value={tipo.IdListaOK}
                                key={tipo.IdListaBK}
                            >
                                {tipo.IdListaBK}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={formik.values.IdTipoFormulaOK}
                        label="Selecciona un Tipo de Formula:"
                        name="IdTipoFormulaOK"
                        onBlur={formik.handleBlur}
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.IdTipoFormulaOK && Boolean(formik.errors.IdTipoFormulaOK)}
                        onChange={(e) => {
                            const selectedTipoFormula = e.target.value;
                            formik.setFieldValue("IdTipoFormulaOK", selectedTipoFormula);
                            formik.handleChange(e);
                        }}
                    >
                        {TipoFormulaValues.map((tipo) => (
                            <MenuItem
                                value={tipo.IdValorOK}
                                key={tipo.Valor}
                            >
                                {tipo.Valor}
                            </MenuItem>
                        ))}
                    </Select>
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
                            setAddPriceListShowModal(false);
                        }}
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
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddPriceListModal;