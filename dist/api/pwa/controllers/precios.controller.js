"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatePatchPricesList = exports.UpdateOnePricesList = exports.GetOnePricesList = exports.GetAllPricesList = exports.DeleteOnePricesList = exports.AddOnePricesList = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var PricesListServices = _interopRequireWildcard(require("../services/precios.services"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//------------------- GET ------------------------Modificada-----------------------
var GetAllPricesList = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var PricesListAll;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return PricesListServices.getPricesListAll();
        case 3:
          PricesListAll = _context.sent;
          if (!PricesListAll) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(PricesListAll.status).json(PricesListAll));
        case 6:
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
          console.log("---------Error en getAllPricesList CONTROLLER----------");
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function GetAllPricesList(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

//-----------------------------API GET ONE----------------Modificado----------------------------
exports.GetAllPricesList = GetAllPricesList;
var GetOnePricesList = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$query, IdInstitutoOK, IdListaOK, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, IdInstitutoOK = _req$query.IdInstitutoOK, IdListaOK = _req$query.IdListaOK; // Obtén los valores de los query parameters
          // Llamar a la función para buscar y pasa los valores
          _context2.next = 4;
          return PricesListServices.getPricesListgByIdService(IdListaOK, IdInstitutoOK);
        case 4:
          result = _context2.sent;
          if (!result) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(result.status).json(result));
        case 7:
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function GetOnePricesList(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

//-------------------- POST ----------------------Modificada--------------------
// AGREGA UN PRODUCTO A LA COLECCION
exports.GetOnePricesList = GetOnePricesList;
var AddOnePricesList = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var PricesListAdded;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return PricesListServices.addPricesList(req.body);
        case 3:
          PricesListAdded = _context3.sent;
          if (!PricesListAdded) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(PricesListAdded.status).json(PricesListAdded));
        case 6:
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function AddOnePricesList(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

//-----------------------------API PUT--------------------Modificada----------------------------
exports.AddOnePricesList = AddOnePricesList;
var UpdateOnePricesList = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$query2, IdInstitutoOK, IdListaOK, newData, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query2 = req.query, IdInstitutoOK = _req$query2.IdInstitutoOK, IdListaOK = _req$query2.IdListaOK;
          newData = req.body; //Se llama al servicio y espera la respuesta para seguir con las demas lineas de codigo
          _context4.next = 5;
          return PricesListServices.UpdatePricesListService(IdInstitutoOK, IdListaOK, newData);
        case 5:
          result = _context4.sent;
          if (!(result.status === 200)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(200).json(result));
        case 10:
          if (!(result.status === 404)) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(404).json(result));
        case 12:
          _context4.next = 17;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function UpdateOnePricesList(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
//------------------------------DELETE API-----------------Modificada--------------------------
exports.UpdateOnePricesList = UpdateOnePricesList;
var DeleteOnePricesList = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _req$query3, IdInstitutoOK, IdListaOK, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          // Obtén el valor a eliminar de los parámetros de la solicitud
          _req$query3 = req.query, IdInstitutoOK = _req$query3.IdInstitutoOK, IdListaOK = _req$query3.IdListaOK; // Llama al servicio de eliminación y pasa el valor a eliminar
          _context5.next = 4;
          return PricesListServices.deletePricesListByValueService(IdInstitutoOK, IdListaOK);
        case 4:
          result = _context5.sent;
          return _context5.abrupt("return", res.status(result.status).json(result));
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function DeleteOnePricesList(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

//-------------------------------APIS DE PRUEBA PARA PATCH----------------------------
exports.DeleteOnePricesList = DeleteOnePricesList;
var UpdatePatchPricesList = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _req$query4, IdInstitutoOK, IdListaOK, newData, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$query4 = req.query, IdInstitutoOK = _req$query4.IdInstitutoOK, IdListaOK = _req$query4.IdListaOK;
          newData = req.body;
          _context6.next = 5;
          return PricesListServices.UpdateOnePricesList(IdInstitutoOK, IdListaOK, newData);
        case 5:
          result = _context6.sent;
          if (!(result.status === 200)) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", res.status(200).json(result));
        case 10:
          if (!(result.status === 404)) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", res.status(404).json(result));
        case 12:
          _context6.next = 17;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 17:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function UpdatePatchPricesList(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
exports.UpdatePatchPricesList = UpdatePatchPricesList;