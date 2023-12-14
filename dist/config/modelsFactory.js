"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("./config"));
var crearModelo = function crearModelo(nombre, schema, conexion) {
  var modelo = conexion.model(nombre, schema, nombre);
  return modelo;
};
var obtenerModelo = function obtenerModelo(nombre, schema, conexion, dbName, dbCluster) {
  var message = '';
  var model;
  if (conexion.modelNames().includes(nombre)) {
    model = conexion.model(nombre);
    message = dbName + ' - ' + nombre;
    console.log('FIC: Create Collection =========>> ', message);
  } else {
    model = crearModelo(nombre, schema, conexion);
    message = dbName + ' - ' + nombre;
    console.log('FIC: Omitted Collection ========>> ', message);
  }
  return model;
};
module.exports = obtenerModelo;