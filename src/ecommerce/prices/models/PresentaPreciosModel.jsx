import { getDetailRow } from "../helpers/Utils";

export const PresentaPreciosModel = {
    IdProdServOK: { type: String },
    IdPresentaBK: { type: String },
    IdTipoFormulaOK: { type: String },
    Formula: { type: String },
    Precio: { type: Number },
    detail_row: getDetailRow(),
};