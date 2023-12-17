import { getDetailRow } from "../helpers/Utils";

export const CondRolCondicionModel = {
    IdTipoCondicionOK: { type: String }, //Extraido de otra colección
    IdTipoOperadorOK: { type: String },  //Extraido de otra colección
    Valor: { type: String },
    Secuecia: { type: String }, // ¿Autogenerado?
    detail_row: getDetailRow(),
};