"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInstitutesAll = exports.addInstitute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _institutes = _interopRequireDefault(require("../models/institutes"));
var _respPWA = require("../../../middlewares/respPWA.handler");
var getInstitutesAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var bitacora, data, InstitutesAll, message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          bitacora = (0, _respPWA.BITACORA)();
          data = (0, _respPWA.DATA)();
          _context.prev = 2;
          bitacora.process = "Extraer todos los institutos";
          data.method = "GET";
          data.api = "/institutes"; //AJCG: no afecta a las apis lo que se escriba aquí
          data.process = "Extraer todos los institutos de la conexion de cat_institutos";
          _context.next = 9;
          return _institutes["default"].find().then(function (institutes) {
            if (!institutes) {
              data.status = 404;
              data.message = "La base de datos NO tiene institutos configurados";
              throw Error(data.messageDEV);
            }
            return institutes;
          });
        case 9:
          InstitutesAll = _context.sent;
          data.status = 200; //codigo cuando se encuentran los documentos
          data.messageUSR = "La extracción de la Institucón...";
          data.dataRes = InstitutesAll;
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'OK', 200, true);
          return _context.abrupt("return", (0, _respPWA.OK)(bitacora));
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          if (!data.status) data.status = _context.t0.statusCode;
          message = _context.t0.message;
          if (!data.messageDEV) data.messageDEV = message;
          if (!data.dataRes.length == 0) data.dataRes = _context.t0;
          data.messageUSR = "La extracción de los institutos NO tuvo exito";
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'FAIL');
          return _context.abrupt("return", (0, _respPWA.FAIL)(bitacora));
        case 26:
          _context.prev = 26;
          return _context.finish(26);
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 17, 26, 28]]);
  }));
  return function getInstitutesAll() {
    return _ref.apply(this, arguments);
  };
}();
exports.getInstitutesAll = getInstitutesAll;
var addInstitute = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(newInstitute) {
    var bitacora, data, institutesadd, message;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          bitacora = (0, _respPWA.BITACORA)();
          data = (0, _respPWA.DATA)();
          _context2.prev = 2;
          bitacora.process = "Agregar un nuevo instituto";
          data.method = "POST";
          data.api = "/institutes"; //AJCG: no afecta a las apis lo que se escriba aquí
          data.process = "Agregar un nuevo instituto de la colección";
          _context2.next = 9;
          return _institutes["default"].insertMany(newInstitute, {
            order: true
          }).then(function (institutes) {
            if (!institutes) {
              data.status = 400;
              data.message = "La insercion del instituto NO tuvo exito";
              throw Error(data.messageDEV);
            }
            return institutes;
          });
        case 9:
          institutesadd = _context2.sent;
          data.status = 201; //codigo cuando se encuentran los documentos
          data.messageUSR = "La inserción del instituto fue exitosa";
          data.dataRes = institutesadd;
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'OK', 201, true);
          return _context2.abrupt("return", (0, _respPWA.OK)(bitacora));
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](2);
          if (!data.status) data.status = _context2.t0.statusCode;
          message = _context2.t0.message;
          if (!data.messageDEV) data.messageDEV = message;
          if (!data.dataRes.length == 0) data.dataRes = _context2.t0;
          data.messageUSR = "La insercion del instituto NO tuvo exito";
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'FAIL');
          return _context2.abrupt("return", (0, _respPWA.FAIL)(bitacora));
        case 26:
          _context2.prev = 26;
          return _context2.finish(26);
        case 28:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 17, 26, 28]]);
  }));
  return function addInstitute(_x) {
    return _ref2.apply(this, arguments);
  };
}();
exports.addInstitute = addInstitute;