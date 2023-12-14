"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInstitutosALL = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _institutes = _interopRequireDefault(require("../services/institutes.services"));
var _express = require("express");
var getInstitutosALL = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, act) {
    var instituesAll;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _institutes["default"].getInstitutosALL();
        case 3:
          instituesAll = _context.sent;
          if (!instituesAll) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(instituesAll.status).json(instituesAll));
        case 6:
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function getInstitutosALL(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.getInstitutosALL = getInstitutosALL;