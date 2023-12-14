"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var mongoose = _interopRequireWildcard(require("mongoose"));
var _config = _interopRequireDefault(require("../../../config/config"));
var _connectionsFactory = _interopRequireDefault(require("../../../config/connectionsFactory"));
var _modelsFactory = _interopRequireDefault(require("../../../config/modelsFactory"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var institutesSchemaPWA = new mongoose.Schema({
  IdInstitutoOK: {
    type: String
  },
  IdInstitutoBK: {
    type: String
  },
  IdInstitutoSupOK: {
    type: String
  },
  DesInstituto: {
    type: String
  },
  Alias: {
    type: String
  },
  Matriz: {
    type: String
  },
  IdTipoGiroOK: {
    type: String
  },
  cat_negocios: [{
    _id: false,
    IdNegocioOK: {
      type: String
    },
    IdNegocioBK: {
      type: String
    },
    IdNegocioSupOK: {
      type: String
    },
    DesNegocio: {
      type: String
    },
    Alias: {
      type: String
    },
    Matriz: {
      type: String
    },
    info_ad: [{
      _id: false,
      IdEtiquetaOK: {
        type: String
      },
      IdEtiqueta: {
        type: String
      },
      Etiqueta: {
        type: String
      },
      Valor: {
        type: String
      },
      IdTipoSeccionOK: {
        type: String
      },
      Secuencia: {
        type: Number
      },
      detail_row: {
        _id: false,
        Activo: {
          type: String,
          "default": 'S'
        },
        Borrado: {
          type: String,
          "default": 'N'
        },
        detail_row_reg: [{
          _id: false,
          FechaReg: {
            type: Date,
            "default": Date.now()
          },
          UsuarioReg: {
            type: String,
            "default": 'SYSTEM'
          }
        }]
      }
    }],
    archivos: [{
      _id: false,
      IdArchivoBK: {
        type: String
      },
      DesArchivo: {
        type: String
      },
      RutaArchivo: {
        type: String
      },
      IdTipoArchivoOK: {
        type: String
      },
      IdTipoSeccionOK: {
        type: String
      },
      Secuencia: {
        type: Number
      },
      Principal: {
        type: String
      },
      detail_row: {
        _id: false,
        Activo: {
          type: String,
          "default": 'S'
        },
        Borrado: {
          type: String,
          "default": 'N'
        },
        detail_row_reg: [{
          _id: false,
          FechaReg: {
            type: Date,
            "default": Date.now
          },
          UsuarioReg: {
            type: String,
            "default": 'SYSTEM'
          }
        }]
      }
    }],
    telefonos: [{
      _id: false,
      DesTelefono: {
        type: String
      },
      CodPais: {
        type: String
      },
      NumTelefono: {
        type: String
      },
      NumExtension: {
        type: String
      },
      Principal: {
        type: String
      },
      IdTipoTelefonoOK: {
        type: String
      },
      detail_row: {
        _id: false,
        Activo: {
          type: String,
          "default": 'S'
        },
        Borrado: {
          type: String,
          "default": 'N'
        },
        detail_row_reg: [{
          _id: false,
          FechaReg: {
            type: Date,
            "default": Date.now
          },
          UsuarioReg: {
            type: String,
            "default": 'SYSTEM'
          }
        }]
      }
    }],
    dir_webs: [{
      _id: false,
      DesDirWeb: {
        type: String
      },
      DireccionWeb: {
        type: String
      },
      IdTipoDirWebOK: {
        type: String
      },
      Principal: {
        type: String
      },
      detail_row: {
        _id: false,
        Activo: {
          type: String,
          "default": 'S'
        },
        Borrado: {
          type: String,
          "default": 'N'
        },
        detail_row_reg: [{
          _id: false,
          FechaReg: {
            type: Date,
            "default": Date.now
          },
          UsuarioReg: {
            type: String,
            "default": 'SYSTEM'
          }
        }]
      }
    }],
    domicilios: [{
      _id: false,
      DesDomicilio: {
        type: String
      },
      CalleNumero: {
        type: String
      },
      EntreCalle1: {
        type: String
      },
      EntreCalle2: {
        type: String
      },
      Referencia: {
        type: String
      },
      CodPostal: {
        type: String
      },
      Principal: {
        type: String
      },
      CoordenadasXY: {
        type: String
      },
      IdTipoDomicilioOK: {
        type: String
      },
      Pais: {
        type: String
      },
      Estado: {
        type: String
      },
      Municipio: {
        type: String
      },
      Localidad: {
        type: String
      },
      Colonia: {
        type: String
      },
      detail_row: {
        _id: false,
        Activo: {
          type: String,
          "default": 'S'
        },
        Borrado: {
          type: String,
          "default": 'N'
        },
        detail_row_reg: [{
          _id: false,
          FechaReg: {
            type: Date,
            "default": Date.now
          },
          UsuarioReg: {
            type: String,
            "default": 'SYSTEM'
          }
        }]
      }
    }],
    detail_row: {
      _id: false,
      Activo: {
        type: String,
        "default": 'S'
      },
      Borrado: {
        type: String,
        "default": 'N'
      },
      detail_row_reg: [{
        _id: false,
        FechaReg: {
          type: Date,
          "default": Date.now
        },
        UsuarioReg: {
          type: String,
          "default": 'SYSTEM'
        }
      }]
    }
  }],
  detail_row: {
    _id: false,
    Activo: {
      type: String,
      "default": 'S'
    },
    Borrado: {
      type: String,
      "default": 'N'
    },
    detail_row_reg: [{
      _id: false,
      FechaReg: {
        type: Date,
        "default": Date.now()
      },
      UsuarioReg: {
        type: String,
        "default": 'SYSTEM'
      }
    }]
  }
});

//FIC: *******************************************************************
var dbName = _config["default"].DATABASE;
var dbCluster = _config["default"].CLUSTER;
var conn = (0, _connectionsFactory["default"])(dbName, dbCluster);
var model = (0, _modelsFactory["default"])('cat_institutos', _config["default"].PLATFORM === 'PWA' ? institutesSchemaPWA : institutesSchemaWEB, conn, dbName, dbCluster);
var _default = model;
/* export default mongoose.model(
	'cat_institutos',
	config.PLATFORM==='PWA' ? institutesSchemaPWA : institutesSchemaWEB,
	'cat_institutos'
);
 */
exports["default"] = _default;