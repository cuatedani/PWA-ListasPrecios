import React, { useState, useEffect } from "react";
import {
    Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions,
    Box, Alert, Select, MenuItem
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CondProCondicionValues } from "../../helpers/CondProCondicionValues";
import PatchOnePriceList from "../../services/remote/patch/PatchOnePriceList";
import getAllLabels from "../../../prices/services/remote/get/getAllLabels";
import { SET_SELECTED_PRICELIST_DATA } from "../../redux/slices/PricesListSlice";
import { useSelector, useDispatch } from "react-redux";

const EditCondProCondicionModal = ({ EditCondProCondicionShowModal, setEditCondProCondicionShowModal, RowData }) => {

    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [TipoEtiquetaValues, setTipoEtiquetaValues] = useState([]);
    const [TipoComparadorValues, setTipoComparadorValues] = useState([]);
    const [TipoOperadorValues, setTipoOperadorValues] = useState([]);
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);
    const [PriceListData, setPriceListData] = useState(null);
    const [CondicionProductoData, setCondicionProductoData] = useState(null);
    const [CondProCondicionData, setCondProCondicionData] = useState(null);
    const SelectedPriceListData = useSelector((state) => state.PricesListReducer.SelPriceListData);
    const SelectedCondicionProductoData = useSelector((state) => state.CondicionProductoReducer.SelCondicionProductoData);

    useEffect(() => {
        async function fetchData() {
            try {
                getDataSelectEtiquetas();
                setCondicionProductoData(SelectedPriceListData.cat_listas_condicion_prod_serv);
                setCondProCondicionData(SelectedCondicionProductoData.condicion);
            } catch (error) {
                console.error("Error al cargar los datos en useEffect de CondProCondicionModal:", error);
            }
        }
        fetchData();
    }, []);

    //Equipo 2: Ejecutamos la API que obtiene todos los Etiquetas.
    async function getDataSelectEtiquetas() {
        try {
            //Obtenemos todas las etiquetas
            const Labels = await getAllLabels();
            //Obtenemosa las Etiquetas IdTipoGrupo
            const TipoEtiqueta = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoGrupo"
            );
            setTipoEtiquetaValues(TipoEtiqueta.valores);

            //Obtenemosa las Etiquetas IdTipoComparador
            const TipoComparador = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoComparador"
            );
            setTipoComparadorValues(TipoComparador.valores);

            //Obtenemosa las Etiquetas IdTipoOperadorAritmetico
            const TipoOperador = Labels.find(
                (Labels) => Labels.IdEtiquetaOK === "IdTipoOperadorAritmetico"
            );
            setTipoOperadorValues(TipoOperador.valores);
        } catch (e) {
            console.error("Error al obtener Etiquetas para Tipos de Lista:", e);
        }
    }

    const formik = useFormik({
        initialValues: {
            IdEtiqueta: RowData.IdEtiqueta,
            Etiqueta: RowData.Etiqueta,
            IdOpComparaValores: RowData.IdOpComparaValores,
            IdOpLogicoEtiqueta: RowData.IdOpLogicoEtiqueta,
        },
        validationSchema: Yup.object({
            IdEtiqueta: Yup.string().required("Campo requerido"),
            Etiqueta: Yup.string().required("Campo requerido"),
            IdOpComparaValores: Yup.string().required("Campo requerido"),
            IdOpLogicoEtiqueta: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {

            console.log("Equipo 2: entro al onSubmit despues de hacer click en boton Guardar");
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {

                const CondProCon = CondProCondicionValues(values);

                const indexToUpdate = CondProCondicionData.findIndex(item => (
                    item.IdEtiqueta === RowData.IdEtiqueta
                    && item.Etiqueta === RowData.Etiqueta
                    && item.IdOpComparaValores === RowData.IdOpComparaValores
                    && item.IdOpLogicoEtiqueta === RowData.IdOpLogicoEtiqueta
                ));

                const updatedConProCondicionData = [...CondProCondicionData];
                if (indexToUpdate !== -1) {
                    updatedConProCondicionData[indexToUpdate] = CondProCon;
                } else {
                    updatedConProCondicionData.push(CondProCon);
                }

                setCondProCondicionData(updatedConProCondicionData);

                const updatedPriceListData = {
                    ...SelectedPriceListData,
                    cat_listas_condicion_prod_serv: updatedConProCondicionData,
                };

                console.log("<<CondProCondicion>>", updatedPriceListData);

                await PatchOnePriceList(updatedPriceListData);
                dispatch(SET_SELECTED_PRICELIST_DATA(updatedPriceListData));

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
                        <strong>Editar Condicion</strong>
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
                        {...commonTextFieldProps}
                        error={formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta)}
                        disabled={true}
                        helperText={formik.touched.IdEtiqueta && formik.errors.IdEtiqueta}
                    />
                    <Select
                        value={formik.values.Etiqueta}
                        label="Selecciona un Tipo de Etiqueta:"
                        name="Etiqueta"
                        {...commonTextFieldProps}
                        onBlur={formik.handleBlur}
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.Etiqueta && Boolean(formik.errors.Etiqueta)}
                        onChange={(e) => {
                            const selectedTipoEtiqueta = e.target.value;
                            const selectedkey = e.target.key;
                            formik.setFieldValue("Etiqueta", selectedkey);
                            formik.setFieldValue("IdEtiqueta", selectedTipoEtiqueta);
                            formik.handleChange(e);
                        }}
                    >
                        {TipoEtiquetaValues.map((tipo) => (
                            <MenuItem
                                value={tipo.IdValorOK}
                                key={tipo.Valor}
                            >
                                {tipo.Valor}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={formik.values.IdOpComparaValores}
                        label="Selecciona un Tipo de Comparador:"
                        name="IdOpComparaValores"
                        onBlur={formik.handleBlur}
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.IdOpComparaValores && Boolean(formik.errors.IdOpComparaValores)}
                        onChange={(e) => {
                            const selectedTipoComparador = e.target.value;
                            formik.setFieldValue("IdOpComparaValores", selectedTipoComparador);
                            formik.handleChange(e);
                        }}
                    >
                        {TipoComparadorValues.map((tipo) => (
                            <MenuItem
                                value={tipo.IdValorOK}
                                key={tipo.Valor}
                            >
                                {tipo.Valor}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={formik.values.IdOpLogicoEtiqueta}
                        label="Selecciona un Tipo de Operador Logico:"
                        name="IdOpLogicoEtiqueta"
                        onBlur={formik.handleBlur}
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.IdOpLogicoEtiqueta && Boolean(formik.errors.IdOpLogicoEtiqueta)}
                        onChange={(e) => {
                            const selectedTipoOperador = e.target.value;
                            formik.setFieldValue("IdOpLogicoEtiqueta", selectedTipoOperador);
                            formik.handleChange(e);
                        }}
                    >
                        {TipoOperadorValues.map((tipo) => (
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
                        <span>MODIFICAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default EditCondProCondicionModal;