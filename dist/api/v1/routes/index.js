"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = require("express");
var _config = _interopRequireDefault(require("../../../config/config"));
var _prodserv = _interopRequireDefault(require("./prodserv.routes"));
// Import Routes

//import ordersRoutes from './orders.routes';
var routerAPI = function routerAPI(app) {
  var router = (0, _express.Router)();
  var api = _config["default"].API_URL;
  app.use(api, router);
  // Routes
  router.use('/prod-serv', _prodserv["default"]);
  //router.use('/orders', ordersRoutes);
  // Return Router
  return router;
};
module.exports = routerAPI;