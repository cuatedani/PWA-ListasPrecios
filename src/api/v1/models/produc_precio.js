import mongoose from 'mongoose';

const prod_precioSchema = new mongoose.Schema({
    //Información general del area donde se encontrara el producto
    linea_Cat: { type : String },
    productName_Comun : {type, String}, //nombre para busqueda rapida, pero poco eficiente 
    fecha_Act_Product: { type : Date },
    
    //PRODUCTOS
    productos: [{ //sub documento de prodcutos
        _id: false,
        producto_AK: { type : String },
        producto_MK: { type: String },
        productName: { type: String },
        prduct_detail_row : {
            _id: false,
            marca : { type : String},  //puede ser enlazado por marca o por proovedor
            //provedor_ID : {type : String}
            precio : { type : String},  //puede ser entero
            descripcion : {type : String},
            fecha_Ingreso : {type : Date},
            fecha_Caducidad : {type : Date},
            contenido_envase : {type : int},
            unidad_Medida : {type : String}, //pendiente de revision
            existencia : {type : String},
            cant_Existencia : {type : String}
        },
    },],
});

//cat_productos puede ser remplazado dependiendo del modelo que se este haciendo
export default mongoose.model(
    'cat_productos',
    prodservSchema,
    'cat_productos'
  );