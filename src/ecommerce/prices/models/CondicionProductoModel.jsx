import { getDetailRow } from "../helpers/Utils";

export function CondicionProductoModel() {
    let cat_listas_condicion_prod_serv = {
        cat_listas_condicion_prod_serv: [
            {
                DesPromo: { type: String },
                IdTipoPromoOK: { type: String },
                Formula: { type: String },
                condicion: [],
                detail_row: getDetailRow(),
            }
        ]
    };
    return cat_listas_condicion_prod_serv
};