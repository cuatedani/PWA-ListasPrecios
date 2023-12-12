import { getDetailRow } from "../helpers/Utils";

export function CondRolCondicionModel() {
    let condicion = {
        condicion: [
            {
                IdTipoCondicionOK: { type: String }, //Extraido de otra colección
                IdTipoOperadorOK: { type: String },  //Extraido de otra colección
                Valor: { type: String },
                Secuecia: { type: String }, // ¿Autogenerado?
                detail_row: getDetailRow(),
            }]
    };
    return condicion
};