import React, { useState, useEffect } from "react";
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField,
    DialogActions, Box, Alert, InputLabel, Select, MenuItem, FormHelperText
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as genID } from "uuid";
import { PriceListValues } from "../../helpers/PriceListValues";
import getAllInstitutes from "../../services/remote/get/getAllInstitutes";
import getAllLabels from "../../services/remote/get/getAllLabels";
import getAllPricesList from '../../services/remote/get/getAllPricesList';
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";

const EditPriceListModal = ({ EditPriceListShowModal, setEditPriceListShowModal, RowData }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");

    const [InstitutesValues, setInstitutesValues] = useState([]);
    const [TipoListaValues, setTipoListaValues] = useState([]);
    const [TipoFormulaValues, setTipoFormulaValues] = useState([]);
    const [ListaBaseValues, setListaBaseValues] = useState([]);

    const [SelectedTipoLista, setSelectedTipoLista] = useState([]);
    const [SelectedTipoFormula, setSelectedTipoFormula] = useState([]);
    const [SelectedPriceList, setSelectedPriceList] = useState([]);
    const [SelectedListaBase, setSelectedListaBase] = useState([]);

    const [Loading, setLoading] = useState(false);
    const [IdGen, setIdGen] = useState(
        genID().replace(/-/g, "").substring(0, 12)
    );

    useEffect(() => {
        getDataSelectPriceList();
        getDataSelectEtiquetas();
    }, []);

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

            //Obtenemosa las Etiquetas IdTipoFormula
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
            const updatedPrices = Prices.filter(
                (price) => price.IdListaOK !== RowData.IdListaBaseOK
            );
            console.log("Listas de Precio:", Prices);
            setListaBaseValues(updatedPrices);

        } catch (e) {
            console.error("Error al obtener Listas de Precio:", e);
        }
    }


    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: RowData.IdInstitutoOK || "",
            IdListaOK: RowData.IdListaOK || "",
            IdListaBK: RowData.IdListaBK || "",
            DesLista: RowData.DesLista || "",
            FechaExpiraIni: RowData.FechaExpiraIni || null,
            FechaExpiraFin: RowData.FechaExpiraFin || null,
            IdTipoListaOK: RowData.IdTipoListaOK || "",
            IdTipoGeneraListaOK: RowData.IdTipoGeneraListaOK || "",
            IdListaBaseOK: RowData.IdListaBaseOK || "",
            IdTipoFormulaOK: RowData.IdTipoFormulaOK || "",
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

            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Editar");
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const PriceList = PriceListValues(values);
                console.log("<<PriceList>>", PriceList);
                await PatchOnePriceList(PriceList);

                setMensajeExitoAlert("PriceList fue Actualizado Correctamente");
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
            onClose={() => {
                setEditPriceListShowModal(false);
            }}
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
                    <TextField
                        id="IdInstitutoOK"
                        label="IdInstitutoOK*"
                        value={formik.values.IdInstitutoOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
                        disabled={true}
                        helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
                    />
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
                    <Autocomplete
                        value={TipoListaValues.find(tipo => tipo.IdValorOK === formik.values.IdTipoListaOK) || null}
                        options={TipoListaValues}
                        getOptionLabel={(tipo) => tipo.Valor}
                        onChange={(e, selectedTipoLista) => {
                            formik.setFieldValue("IdTipoListaOK", selectedTipoLista ? selectedTipoLista.IdValorOK : "");
                            formik.handleChange(e);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un Tipo de Lista:"
                                onBlur={formik.handleBlur}
                                disabled={!!mensajeExitoAlert}
                                error={formik.touched.IdTipoListaOK && Boolean(formik.errors.IdTipoListaOK)}
                                helperText={formik.touched.IdTipoListaOK && formik.errors.IdTipoListaOK}
                            />
                        )}
                    />
                    <TextField
                        id="IdTipoGeneraListaOK"
                        label="IdTipoGeneraListaOK*"
                        value={formik.values.IdTipoGeneraListaOK}
                        {...commonTextFieldProps}
                        error={formik.touched.IdTipoGeneraListaOK && Boolean(formik.errors.IdTipoGeneraListaOK)}
                        helperText={formik.touched.IdTipoGeneraListaOK && formik.errors.IdTipoGeneraListaOK}
                    />
                    <Autocomplete
                        value={ListaBaseValues.find(tipo => tipo.IdListaOK === formik.values.IdListaBaseOK) || null}
                        options={ListaBaseValues}
                        getOptionLabel={(tipo) => tipo.IdListaBK}
                        onChange={(e, selectedListaBase) => {
                            formik.setFieldValue("IdListaBaseOK", selectedListaBase ? selectedListaBase.IdListaOK : "");
                            formik.handleChange(e);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona una Lista Base:"
                                onBlur={formik.handleBlur}
                                disabled={!!mensajeExitoAlert}
                                error={formik.touched.IdListaBaseOK && Boolean(formik.errors.IdListaBaseOK)}
                                helperText={formik.touched.IdListaBaseOK && formik.errors.IdListaBaseOK}
                            />
                        )}
                    />
                    <Autocomplete
                        value={TipoFormulaValues.find(tipo => tipo.IdValorOK === formik.values.IdTipoFormulaOK) || null}
                        options={TipoFormulaValues}
                        getOptionLabel={(tipo) => tipo.Valor}
                        onChange={(e, selectedTipoFormula) => {
                            formik.setFieldValue("IdTipoFormulaOK", selectedTipoFormula ? selectedTipoFormula.IdValorOK : "");
                            formik.handleChange(e);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un Tipo de Fórmula:"
                                onBlur={formik.handleBlur}
                                disabled={!!mensajeExitoAlert}
                                error={formik.touched.IdTipoFormulaOK && Boolean(formik.errors.IdTipoFormulaOK)}
                                helperText={formik.touched.IdTipoFormulaOK && formik.errors.IdTipoFormulaOK}
                            />
                        )}
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
                        onClick={() => setEditPriceListShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
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
export default EditPriceListModal;