"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("../../../config/config"));
var _modelsFactory = _interopRequireDefault(require("../../../config/modelsFactory"));
var _connectionsFactory = _interopRequireDefault(require("../../../config/connectionsFactory"));
var prodservSchema = new _mongoose["default"].Schema({
  IdProdServOK: {
    type: String
  },
  IdProdServBK: {
    type: String
  },
  DesProdServ: {
    type: String
  },
  Indice: {
    type: String
  },
  //ESTATUS
  cat_prod_serv_estatus: [{
    _id: false,
    IdTipoEstatusOk: {
      type: String
    },
    Actual: {
      type: String
    },
    Observacion: {
      type: String
    },
    detail_row: {
      Activo: {
        type: String
      },
      Borrado: {
        type: String
      },
      detail_row_reg: {
        FechaReg: {
          type: Date,
          "default": Date.now
        },
        UsuarioReg: {
          type: String
        }
      }
    }
  }]
});
var dbName = _config["default"].DATABASE;
var dbCluster = _config["default"].CLUSTER;
var conn = (0, _connectionsFactory["default"])(dbName, dbCluster);
var model = (0, _modelsFactory["default"])('cat_productos', prodservSchema, conn, dbName, dbCluster);
var _default = model();
exports["default"] = _default;