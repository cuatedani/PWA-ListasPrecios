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
var preciosSchema = new mongoose.Schema({
  IdInstitutoOK: {
    type: String
  },
  IdListaOK: {
    type: String
  },
  IdListaBK: {
    type: String
  },
  DesLista: {
    type: String
  },
  FechaExpiraIni: {
    $date: {
      type: Date
    }
  },
  FechaExpiraFin: {
    $date: {
      type: Date
    }
  },
  IdTipoListaOK: {
    type: String
  },
  IdTipoGeneraListaOK: {
    type: String
  },
  IdListaBaseOK: {
    type: String
  },
  IdTipoFormulaOK: {
    type: String
  },
  cat_listas_presenta_precios: [{
    _id: false,
    IdProdServOK: {
      type: String
    },
    IdPresentaBK: {
      type: String
    },
    IdTipoFormulaOK: {
      type: String
    },
    Formula: {
      type: String
    },
    Precio: {
      type: Number
    },
    detail_row: {
      Activo: {
        type: String
      },
      Borrado: {
        type: String
      },
      detail_row_reg: [{
        FechaReg: {
          $date: {
            type: Date
          }
        },
        UsuarioReg: {
          type: String
        }
      }]
    }
  }],
  cat_listas_condicion_roles: [{
    _id: false,
    DesCondicion: {
      type: String
    },
    FechaExpiraIni: {
      $date: {
        type: Date
      }
    },
    FechaExpiraFin: {
      $date: {
        type: Date
      }
    },
    Condicion: {
      type: String
    },
    condicion: [{
      _id: false,
      IdTipoCondicionOK: {
        type: String
      },
      //Extraido de otra colección
      IdTipoOperadorOK: {
        type: String
      },
      //Extraido de otra colección
      Valor: {
        valor: {
          type: String
        }
      },
      Secuecia: {
        type: String
      },
      // ¿Autogenerado?
      detail_row: {
        Activo: {
          type: String
        },
        Borrado: {
          type: String
        },
        detail_row_reg: [{
          _id: false,
          FechaReg: {
            $date: {
              type: Date
            }
          },
          UsuarioReg: {
            type: String
          }
        }]
      }
    }]
  }],
  cat_listas_condicion_prod_serv: [{
    _id: false,
    DesPromo: {
      type: String
    },
    IdTipoPromoOK: {
      type: String
    },
    Formula: {
      type: String
    },
    condicion: [{
      IdEtiqueta: {
        type: String
      },
      Etiqueta: {
        type: String
      },
      Valores: [{
        valor: {
          type: String
        },
        IdComparaValor: {
          type: String
        }
      }, {
        valor: {
          type: String
        },
        IdComparaValor: {
          type: String
        }
      }],
      IdOpComparaValores: {
        type: String
      },
      IdOpLogicoEtiqueta: {
        type: String
      }
    }],
    detail_row: {
      Activo: {
        type: String
      },
      Borrado: {
        type: String
      },
      detail_row_reg: [{
        _id: false,
        FechaReg: {
          $date: {
            type: Date
          }
        },
        UsuarioReg: {
          type: String
        }
      }]
    }
  }],
  cat_listas_negocios: [{
    _id: false,
    IdNegocioOK: {
      type: String
    },
    detail_row: {
      Activo: {
        type: String
      },
      Borrado: {
        type: String
      },
      detail_row_reg: [{
        _id: false,
        FechaReg: {
          $date: {
            type: Date
          }
        },
        UsuarioReg: {
          type: String
        }
      }]
    }
  }],
  detail_row: {
    Activo: {
      type: String
    },
    Borrado: {
      type: String
    },
    detail_row_reg: [{
      _id: false,
      FechaReg: {
        $date: {
          type: Date
        }
      },
      UsuarioReg: {
        type: String
      }
    }]
  }
});
var dbName = _config["default"].DATABASE;
var dbCluster = _config["default"].CLUSTER;
var conn = (0, _connectionsFactory["default"])(dbName, dbCluster);
var model = (0, _modelsFactory["default"])('cat_precios', preciosSchema, conn, dbName, dbCluster);
var _default = model;
exports["default"] = _default;