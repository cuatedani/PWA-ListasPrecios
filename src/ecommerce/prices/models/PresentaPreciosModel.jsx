import { getDetailRow } from "../helpers/Utils";

export function PresentaPreciosModel() {
    let cat_listas_presenta_precios = {
        cat_listas_presenta_precios: [{
            IdProdServOK: { type: String },
            IdPresentaBK: { type: String },
            IdTipoFormulaOK: { type: String },
            Formula: { type: String },
            Precio: { type: Number },
            detail_row: getDetailRow(),
        }]
    };
    return cat_listas_presenta_precios
};