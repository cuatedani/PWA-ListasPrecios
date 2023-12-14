"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
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
    },
    _id: false
  }]
});

//cat_productos puede ser remplazado dependiendo del modelo que se este haciendo
var _default = _mongoose["default"].model('cat_productos', prodservSchema, 'cat_productos');
exports["default"] = _default;