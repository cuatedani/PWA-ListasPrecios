import { getDetailRow } from "../helpers/Utils";

export const CondicionProductoModel = {
    DesPromo: { type: String },
    IdTipoPromoOK: { type: String },
    Formula: { type: String },
    condicion: [],
    detail_row: getDetailRow(),
};