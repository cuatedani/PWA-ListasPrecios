import mongoose from 'mongoose';

const prodservSchema = new mongoose.Schema({
    IdProdServOK: { type : String },
    IdProdServBK: { type : String },
    DesProdServ: { type : String },
    Indice: {type : String},
    //ESTATUS
    cat_prod_serv_estatus: [
      {
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
            _id: false,
        },
    ],
});

//cat_productos puede ser remplazado dependiendo del modelo que se este haciendo
export default mongoose.model(
    'cat_productos',
    prodservSchema,
    'cat_productos'
  );