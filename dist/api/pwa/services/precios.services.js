"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPricesListgByIdService = exports.getPricesListAll = exports.deletePricesListByValueService = exports.addPricesList = exports.UpdatePricesListService = exports.UpdatePatchOnePricesList = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _precios = _interopRequireDefault(require("../models/precios"));
var _respPWA = require("../../../middlewares/respPWA.handler");
//--------------------------------GET ALL--------------------------Modificada---------------------------
var getPricesListAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var bitacora, data, PricesListAll, message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          bitacora = (0, _respPWA.BITACORA)();
          data = (0, _respPWA.DATA)();
          _context.prev = 2;
          bitacora.process = "Extraer todas las listas de precios";
          data.method = "GET";
          data.api = "/prices-list/"; //AJCG: no afecta a las apis lo que se escriba aquí
          data.process = "Extraer todas las listas de precios en la colección: cat_precios";
          _context.next = 9;
          return _precios["default"].find().then(function (PricesList) {
            if (!PricesList) {
              data.status = 404;
              data.message = "La base de datos NO tiene Listas de precios configurados";
              throw Error(data.messageDEV);
            }
            return PricesList;
          });
        case 9:
          PricesListAll = _context.sent;
          data.status = 200; //codigo cuando se encuentran los documentos
          data.messageUSR = "La extracción de las listas de precios fue exitosa";
          data.dataRes = PricesListAll;
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'OK', 200, true);
          return _context.abrupt("return", (0, _respPWA.OK)(bitacora));
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          if (!data.status) data.status = _context.t0.statusCode;
          message = _context.t0.message;
          if (!data.messageDEV) data.messageDEV = message;
          if (!data.dataRes.length === 0) data.dataRes = _context.t0;
          data.messageUSR = "La extracción de las listas de precios en la API getOnePricesList NO tuvo exito";
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
  return function getPricesListAll() {
    return _ref.apply(this, arguments);
  };
}();
exports.getPricesListAll = getPricesListAll;
var getPricesListgByIdService = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, IdInstitutoOK) {
    var bitacora, data, _PricesList, message;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          bitacora = (0, _respPWA.BITACORA)();
          data = (0, _respPWA.DATA)();
          _context2.prev = 2;
          bitacora.process = "Obtener Lista de Precios por ID: ".concat(id);
          data.method = "GET";
          data.api = "/priceslist/".concat(id);
          data.process = "Obtener Lista de Precios especifica de la colecci\xF3n Listas";
          _context2.next = 9;
          return _PricesList.findOne({
            IdInstitutoOK: IdInstitutoOK,
            IdListaOK: id
          });
        case 9:
          _PricesList = _context2.sent;
          if (_PricesList) {
            _context2.next = 14;
            break;
          }
          data.status = 404;
          data.messageDEV = "No se encontr\xF3 una lista con ID ".concat(id);
          throw Error(data.messageDEV);
        case 14:
          data.status = 200;
          data.messageUSR = "La obtención de la Lista tuvo exito";
          data.dataRes = _PricesList;
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'OK', 200, true);
          return _context2.abrupt("return", (0, _respPWA.OK)(bitacora));
        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](2);
          if (!data.status) data.status = _context2.t0.statusCode;
          message = _context2.t0.message;
          if (!data.messageDEV) data.messageDEV = message;
          if (!data.dataRes.length === 0) data.dataRes = _context2.t0;
          data.messageUSR = "La obtención de la Lista no tuvo éxito";

          // Agrega un mensaje de fallo a la bitácora
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'FAIL');

          // Devuelve una respuesta de error
          return _context2.abrupt("return", (0, _respPWA.FAIL)(bitacora));
        case 30:
          _context2.prev = 30;
          return _context2.finish(30);
        case 32:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 21, 30, 32]]);
  }));
  return function getPricesListgByIdService(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

//---------------------------------------POST PRODUCT------------------Modificada---------------------
exports.getPricesListgByIdService = getPricesListgByIdService;
var addPricesList = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(newPriceList) {
    var bitacora, data, PricesListAdded, message;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          bitacora = (0, _respPWA.BITACORA)();
          data = (0, _respPWA.DATA)();
          _context3.prev = 2;
          bitacora.process = "Agregar una nueva lista de precios";
          data.method = "POST";
          data.api = "/priceslist/";
          data.process = "Agregar una nueva lista de precios a la colección cat_precios";
          _context3.next = 9;
          return _precios["default"].insertMany(newPriceList, {
            order: true
          }).then(function (pricesList) {
            if (!pricesList) {
              data.status = 400; //400 indica que no se pudo insertar
              data.messageDEV = "La inserción de la lista de precios <<NO>> fue exitosa";
              throw Error(data.messageDEV);
            }
            return pricesList;
          });
        case 9:
          PricesListAdded = _context3.sent;
          data.status = 201; //201 = codigo cuando se inserta exitosamente SIUU
          data.messageUSR = "La inserción de la lista de precios <<SI>> fue exitosa";
          data.dataRes = PricesListAdded;
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'OK', 201, true);
          return _context3.abrupt("return", (0, _respPWA.OK)(bitacora));
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](2);
          if (!data.status) data.status = _context3.t0.statusCode;
          message = _context3.t0.message;
          if (!data.messageDEV) data.messageDEV = message;
          if (!data.dataRes.length === 0) data.dataRes = _context3.t0;
          data.messageUSR = "La inserción de la lista de precios <<NO>> fue exitosa";
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'FAIL');
          return _context3.abrupt("return", (0, _respPWA.FAIL)(bitacora));
        case 26:
          _context3.prev = 26;
          return _context3.finish(26);
        case 28:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 17, 26, 28]]);
  }));
  return function addPricesList(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

//---------------------------------------UPDATE PRODUCT----------------FUNCIONANDO-----------------
exports.addPricesList = addPricesList;
var UpdatePricesListService = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(IdInstitutoOK, IdListaOK, newData) {
    var bitacora, data, UpdatedPricesList, message;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          bitacora = (0, _respPWA.BITACORA)();
          data = (0, _respPWA.DATA)();
          _context4.prev = 2;
          bitacora.process = "Actualizar la lista de precios con ID ".concat(IdListaOK); //Mensaje del proceso con el id del producto a actualizar
          data.method = "PUT"; //Metodo que se esta empleando
          data.api = "/priceslist"; //URL de la API que se esta utilizando 
          data.process = "Actualizar la lista de precios en la colecci\xF3n de cat_precios"; //Mensaje del proceso que se esta llevando a cabo más especifico

          // Aqui se realiza la actualización del producto
          _context4.next = 9;
          return prices.findOneAndUpdate({
            IdInstitutoOK: IdInstitutoOK,
            IdListaOK: IdListaOK
          }, newData, {
            "new": true // Esto devolverá el documento actualizado en lugar del anterior
          });
        case 9:
          UpdatedPricesList = _context4.sent;
          if (UpdatedPricesList) {
            _context4.next = 14;
            break;
          }
          data.status = 404; //404 indica que no encontro el producto que se quiere actualizar
          data.messageDEV = "No se encontr\xF3 ninguna lista de precios con el ID ".concat(idListaOK);
          throw Error(data.messageDEV);
        case 14:
          data.status = 200;
          data.messageUSR = "La lista de precio con ID ".concat(IdListaOK, " se actualiz\xF3 con \xE9xito");
          data.dataRes = UpdatedPricesList;
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'OK', 200, true);
          return _context4.abrupt("return", (0, _respPWA.OK)(bitacora));
        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](2);
          if (!data.status) data.status = _context4.t0.statusCode;
          message = _context4.t0.message;
          if (!data.messageDEV) data.messageDEV = message;
          if (!data.dataRes.length === 0) data.dataRes = _context4.t0;
          data.messageUSR = "La actualizaci\xF3n de la lista de precio con ID ".concat(idListaOK, " fall\xF3");
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'FAIL');
          return _context4.abrupt("return", (0, _respPWA.FAIL)(bitacora));
        case 30:
          _context4.prev = 30;
          return _context4.finish(30);
        case 32:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 21, 30, 32]]);
  }));
  return function UpdatePricesListService(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

//--------------------------------------DELETE PRODUCTO-------------------FUNCIONANDO-----------------------
exports.UpdatePricesListService = UpdatePricesListService;
var deletePricesListByValueService = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(IdInstitutoOK, IdListaOK) {
    var bitacora, data, result, message;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          bitacora = (0, _respPWA.BITACORA)();
          data = (0, _respPWA.DATA)();
          _context5.prev = 2;
          //PROCESO DONDE SE ACTUALIZA TANTO LA BITACORA COMO LA DATA PARA GUARDAR LOS REGISTROS DE LAS OPREACIONES QUE SE ESTAN HACIENDO***********
          bitacora.process = "Borrar la lista de precio con ID ".concat(ID); //Mensaje del proceso con el id del precio a actualizar
          data.method = "Delete"; //Metodo que se esta empleando
          data.api = "/priceslist"; //URL de la API que se esta utilizando 
          data.process = "Borrar la lista de precios de la colecci\xF3n de cat_precios"; //Mensaje del proceso que se esta llevando a cabo más especifico

          // Realiza la eliminación del documento en función del valor proporcionado <<CONSULTA>>
          _context5.next = 9;
          return prices.deleteOne({
            IdInstitutoOK: IdInstitutoOK,
            IdListaOK: IdListaOK
          });
        case 9:
          result = _context5.sent;
          if (!(result.deletedCount === 0)) {
            _context5.next = 14;
            break;
          }
          // SI NO ENCONTRO UN DOCUMENTO CON EL ID PROPORCIONADO ACTUALIZA LA DATA CON EL ERROR Y SALE DEL METODO
          data.status = 404; //404 indica que no encontro el producto que se quiere actualizar
          data.messageDEV = "No se encontr\xF3 un producto para borrar con el ID ".concat(ID);
          throw Error(data.messageDEV);
        case 14:
          //EN CASO DE QUE SI ENCONTRO EL DOCUMETO ACTUALIZA LA DATA CON UN STATUS 200 INDICANDO QUE TODO ESTA OK******************************
          data.status = 200;
          data.messageUSR = "Producto se borro con \xE9xito";

          //ACTUALIZACION DE LA BITACORA DONDE SE REGISTRA EL MOVIMIENTO QUE SE ESTA HACIENDO
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'OK', 200, true);

          //MANDA UN OK A LA BITACORA INDICANDO QUE LA OPERACION FUE EXITOSA
          return _context5.abrupt("return", (0, _respPWA.OK)(bitacora));
        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](2);
          //AQUI ENTRA CUANDO NO SE ENCONTRO EL PRODUCTO QUE SE DESEA BORRAR, COSULTA LA DATA BUSCANDO EL STATUS DE LA COSULTA
          //Y ACTUALIZA LA DATA INDICANDO QUE HUBO UN ERROR Y CUAL ES ESE ERROR.
          if (!data.status) data.status = _context5.t0.statusCode;
          message = _context5.t0.message;
          if (!data.messageDEV) data.messageDEV = message;
          if (!data.dataRes.length === 0) data.dataRes = _context5.t0;
          data.messageUSR = "La eliminacion de la lista de precios con ID ".concat(ID, " fall\xF3");
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'FAIL');
          return _context5.abrupt("return", (0, _respPWA.FAIL)(bitacora));
        case 29:
          _context5.prev = 29;
          return _context5.finish(29);
        case 31:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 20, 29, 31]]);
  }));
  return function deletePricesListByValueService(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

//----------------------------------APIS DE SUBDOCUMENTOS------------------------------------------------------
exports.deletePricesListByValueService = deletePricesListByValueService;
var UpdatePatchOnePricesList = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(IdInstitutoOK, IdListaOK, updateData) {
    var bitacora, data, currentPricesList, key, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          bitacora = (0, _respPWA.BITACORA)();
          data = (0, _respPWA.DATA)();
          _context6.prev = 2;
          bitacora.process = 'Modificar una lista.';
          data.process = 'Modificar una sola lista';
          data.method = 'PATCH';
          data.api = '/priceslist';
          _context6.next = 9;
          return _precios["default"].findOne({
            IdInstitutoOK: IdInstitutoOK,
            IdListaOK: IdListaOK
          });
        case 9:
          currentPricesList = _context6.sent;
          if (currentPricesList) {
            _context6.next = 14;
            break;
          }
          data.status = 404;
          data.messageDEV = "No se encontr\xF3 una lista con el ID ".concat(IdListaOK, " ");
          throw new Error(data.messageDEV);
        case 14:
          for (key in updateData) {
            if (updateData.hasOwnProperty(key)) {
              currentPricesList[key] = updateData[key];
            }
          }
          _context6.next = 17;
          return currentPricesList.save();
        case 17:
          result = _context6.sent;
          data.dataRes = Object.keys(updateData).reduce(function (acc, key) {
            acc[key] = result[key];
            return acc;
          }, {});
          data.status = 200;
          data.messageUSR = 'Modificación de subdocumentos de Listas de Precios fue Exitoso';
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'OK', 201, true);
          return _context6.abrupt("return", (0, _respPWA.OK)(bitacora));
        case 25:
          _context6.prev = 25;
          _context6.t0 = _context6["catch"](2);
          if (!data.status) data.status = _context6.t0.statusCode;
          if (!data.messageDEV) data.messageDEV = _context6.t0.message;
          if (data.dataRes === undefined) data.dataRes = _context6.t0;
          data.messageUSR = "La actualizacion de la lista con ID ".concat(IdListaOK, " NO tuvo exito");
          bitacora = (0, _respPWA.AddMSG)(bitacora, data, 'FAIL');
          return _context6.abrupt("return", (0, _respPWA.FAIL)(bitacora));
        case 33:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[2, 25]]);
  }));
  return function UpdatePatchOnePricesList(_x9, _x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
exports.UpdatePatchOnePricesList = UpdatePatchOnePricesList;