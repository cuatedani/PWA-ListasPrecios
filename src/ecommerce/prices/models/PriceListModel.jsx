import { getDetailRow } from "../helpers/Utils";

export function PriceListModel() {
    let PriceList = {
        IdInstitutoOK: { type: String },
        IdListaOK: { type: String },
        IdListaBK: { type: String },
        DesLista: { type: String },
        FechaExpiraIni: { type: Date },
        FechaExpiraFin: { type: Date },
        IdTipoListaOK: { type: String },
        IdTipoGeneraListaOK: { type: String },
        IdListaBaseOK: { type: String },
        IdTipoFormulaOK: { type: String },
        cat_listas_presenta_precios: [],
        cat_listas_condicion_roles: [],
        cat_listas_condicion_prod_serv: [],
        cat_listas_negocios: [],
        detail_row: getDetailRow(),
    };
    return PriceList
};