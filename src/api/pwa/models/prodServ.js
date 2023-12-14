import mongoose from "mongoose";
import config from "../../../config/config";
import obtenerModelo from '../../../config/modelsFactory';
import obtenerConexion from '../../../config/connectionsFactory';

const prodservSchema = new mongoose.Schema({
    IdProdServOK: { type : String },
    IdProdServBK: { type : String },
    DesProdServ: { type : String },
    Indice: {type : String},
    //ESTATUS
    cat_prod_serv_estatus: [
        {
            _id: false,
            IdTipoEstatusOk: { type : String },
            Actual: { type: String },
            Observacion: { type: String },
            detail_row : {
                Activo : { type : String},
                Borrado : { type : String},
                detail_row_reg: {
                    FechaReg: { type: Date, default: Date.now },
                    UsuarioReg: { type: String }
                }
            },
        },
    ],
});

const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;

const conn = obtenerConexion(dbName, dbCluster);

const model = obtenerModelo('cat_productos',
    prodservSchema,
    conn,
    dbName,
    dbCluster
);

export default model();