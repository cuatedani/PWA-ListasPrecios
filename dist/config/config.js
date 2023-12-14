"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var _default = {
  CLUSTER: process.env.CLUSTER || 'NO SE ENCONTRÓ EN .ENV',
  HOST: process.env.HOST || 'NO SE ENCONTRÓ EN .ENV',
  PORT: process.env.PORT || 'NO SE ENCONTRÓ EN .ENV',
  API_URL: process.env.API_URL || '/api/v1',
  CONNECTION_STRING: process.env.CONNECTION_STRING || 'mongodb://127.0.0.1:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000',
  DATABASE: process.env.DATABASE || 'db_ecommerce',
  DB_USER: process.env.DB_USER || 'AdminUser',
  DB_PASSWORD: process.env.DB_PASSWORD || 'florecitarockera'
};
exports["default"] = _default;