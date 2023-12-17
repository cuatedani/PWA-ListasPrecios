import * as mongoose from 'mongoose';
import config from '../../../config/config';
import obtenerConexion from '../../../config/connectionsFactory';
import obtenerModelo from '../../../config/modelsFactory';

const preciosSchema = new mongoose.Schema({
  IdInstitutoOK: {type : String}, 
  IdListaOK: {type : String}, 
  IdListaBK: {type : String}, 
  DesLista: {type : String}, 
  FechaExpiraIni: {
    date: {type : String},
  },
  FechaExpiraFin: {
    date: {type : String},
  },
  IdTipoListaOK: {type : String}, 
  IdTipoGeneraListaOK: {type : String}, 
  IdListaBaseOK: {type : String}, 
  IdTipoFormulaOK: {type : String}, 
  cat_listas_presenta_precios: [
    {
      _id: false,
      IdProdServOK: {type : String}, 
      IdPresentaBK: {type : String}, 
      IdTipoFormulaOK: {type : String}, 
      Formula: {type : String}, 
      Precio: {type : Number}, 
      detail_row: {
        Activo: {type : String}, 
        Borrado: {type : String}, 
        detail_row_reg: [
          {
            FechaReg: {
              date: {type : String}, 
            },
            UsuarioReg: {type : String},
          }
        ]
      }
    }],
  cat_listas_condicion_roles: [
    {
      _id: false,
      DesCondicion: {type : String}, 
      FechaExpiraIni: {
        date: {type : String}, 
      },
      FechaExpiraFin: {
        date: {type : String}, 
      },
      Condicion: {type : String}, 
      condicion: [
        {
          _id: false,
          IdTipoCondicionOK: {type : String}, //Extraido de otra colección
          IdTipoOperadorOK: {type : String},  //Extraido de otra colección
          Valor:
          {
            valor : {type : String},
          },
          Secuecia: {type : String}, // ¿Autogenerado?
          detail_row: {
            Activo: {type : String}, 
            Borrado: {type : String}, 
            detail_row_reg: [
              {
                _id: false,
                FechaReg: {
                  date: {type : String}, 
                },
                UsuarioReg: {type : String}, 
              }
            ]
          }
        }]
    }],
  cat_listas_condicion_prod_serv: [
    {
      _id: false,
      DesPromo: {type : String}, 
      IdTipoPromoOK: {type : String}, 
        Formula: {type : String}, 
      condicion: [
        {
          IdEtiqueta: {type : String}, 
          Etiqueta: {type : String}, 
          Valores: [
            {
              valor: {type : String}, 
              IdComparaValor: {type : String}, 
            },
            {
              valor: {type : String}, 
              IdComparaValor: {type : String}, 
            }
          ],
          IdOpComparaValores: {type : String}, 
          IdOpLogicoEtiqueta: {type : String}, 
        }
      ],
      detail_row: {
        Activo: {type : String}, 
        Borrado: {type : String}, 
        detail_row_reg: [
          {
            _id: false,
            FechaReg: {
              date: {type : String}, 
            },
            UsuarioReg: {type : String}, 
          }
        ]
      }
    }
  ],
  cat_listas_negocios: [
    {
      _id: false,
      IdNegocioOK: {type : String}, 
      detail_row: {
        Activo: {type : String}, 
        Borrado: {type : String}, 
        detail_row_reg: [
          {
            _id: false,
            FechaReg: {
              date: {type : String}, 
            },
            UsuarioReg: {type : String}, 
          }
        ]
      }
    }
  ],
  detail_row: {
    Activo: {type : String}, 
    Borrado: {type : String}, 
    detail_row_reg: [
      {
        _id: false,
        FechaReg: {
          date: {type : String}, 
        },
        UsuarioReg: {type : String}, 
      }
    ]
  }
});


const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;
  
const conn =  obtenerConexion(dbName, dbCluster);
	
const model = obtenerModelo('cat_listas', 
						  preciosSchema,
						  conn, 
						  dbName, 
						  dbCluster); 

export default model;