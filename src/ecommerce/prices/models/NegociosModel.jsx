import { getDetailRow } from "../helpers/Utils";

export function NegociosModel() {
    let cat_listas_negocios = {
        cat_listas_negocios: [{
            IdNegocioOK: { type: String },
            detail_row: getDetailRow(),
        }]
    };
    return cat_listas_negocios
};