import * as mongoose from 'mongoose';
import config from '../../../config/config';
import obtenerConexion from '../../../config/connectionsFactory';
import obtenerModelo from '../../../config/modelsFactory';


const etiquetasSchemaPWA = new mongoose.Schema({
	IdInstitutoOK: { type: String },
	IdEtiquetaOK: { type: String },
});


//FIC: ***********************
const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;
  
const conn =  obtenerConexion(dbName, dbCluster);
	
const model = obtenerModelo('cat_etiquetas', 
						etiquetasSchemaPWA,
						  conn, 
						  dbName, 
						  dbCluster);

export default model;