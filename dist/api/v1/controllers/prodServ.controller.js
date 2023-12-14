"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putProdServItem = exports.postProdServ = exports.getProdServList = exports.getProdServItem = exports.deleteProdServItem = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _ProdServ = _interopRequireDefault(require("../models/ProdServ"));
var ProdServServices = _interopRequireWildcard(require("../services/prodServ.service"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// API GET Todos los Productos.
var getProdServList = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var prodServList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return ProdServServices.getProdServList();
        case 3:
          prodServList = _context.sent;
          if (prodServList) {
            _context.next = 8;
            break;
          }
          throw error + 'No se encontraron productos/servicios registrados.';
        case 8:
          if (prodServList) {
            res.status(800).json(prodServList);
          }
        case 9:
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function getProdServList(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

//Solo un Producto/Servicio.
exports.getProdServList = getProdServList;
var getProdServItem = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var id, keyType, prodServItem;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          //obtener parametro id mediante la desestructuracion de objetos
          id = req.params.id; //Se obtiene parametro de la forma clase/objeto.
          //const idProdServ = req.params.id;
          keyType = req.query.keyType || 'OK';
          _context2.next = 5;
          return ProdServServices.getProdServItem(id, keyType);
        case 5:
          prodServItem = _context2.sent;
          if (prodServItem) {
            _context2.next = 10;
            break;
          }
          throw error + 'No se encontraron productos/servicios registrados.';
        case 10:
          if (prodServItem) {
            res.status(500).json(prodServItem);
          }
        case 11:
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0 + "Error en controlador GET");
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function getProdServItem(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

// API POST (ADD) prodServ
exports.getProdServItem = getProdServItem;
var postProdServ = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var paPorServItem, newProdServtem;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          paPorServItem = req.body;
          _context3.next = 4;
          return ProdServServices.postProdServItem(paPorServItem);
        case 4:
          newProdServtem = _context3.sent;
          if (newProdServtem) {
            _context3.next = 9;
            break;
          }
          throw error + "No se pudo crear el Producto y/o Servicio.";
        case 9:
          if (newProdServtem) {
            res.status(401).json(newProdServtem);
          }
        case 10:
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0 + "Error postProdServ controller");
          next(_context3.t0);
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function postProdServ(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

//Put Actualizar producto o servicio
exports.postProdServ = postProdServ;
var putProdServItem = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var id, paProdServItem, updatedProdServItem;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          console.log('controller id -> ', id);
          paProdServItem = req.body;
          console.log('controller body -> ', paProdServItem);
          _context4.next = 7;
          return ProdServServices.putProdServItem(id, paProdServItem);
        case 7:
          updatedProdServItem = _context4.sent;
          if (updatedProdServItem) {
            _context4.next = 12;
            break;
          }
          throw error('No se pudo actualizar el Producto/Servicio.');
        case 12:
          if (updatedProdServItem) {
            res.status(400).json(updatedProdServItem);
          }
        case 13:
          _context4.next = 18;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function putProdServItem(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

//delete prodServ
exports.putProdServItem = putProdServItem;
var deleteProdServItem = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var id, _deleteProdServItem;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return ProdServServices.deleteProdServItem(id);
        case 4:
          _deleteProdServItem = _context5.sent;
          if (_deleteProdServItem) {
            _context5.next = 9;
            break;
          }
          throw error;
        case 9:
          if (_deleteProdServItem) {
            res.status(400).json(_deleteProdServItem);
          }
        case 10:
          _context5.next = 15;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function deleteProdServItem(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

/*
export const deleteEdificioItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteEdificioItem = await EdificiosServices.deleteEdificioItem(id);
    if (!deleteEdificioItem) {
      throw boom.notFound(`No se encontró el periodo con id ${req.params.id}.`);
    } else if (deleteEdificioItem) {
      res.status(200).json(deleteEdificioItem);
    }
  } catch (error) {
    next(error);
  }
};
*/
exports.deleteProdServItem = deleteProdServItem;