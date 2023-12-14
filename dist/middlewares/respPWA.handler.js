"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRANSOPTIONS = exports.OK = exports.FAIL = exports.DATA = exports.BITACORA = exports.AddMSG = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var BITACORA = function BITACORA() {
  var bitacora = {
    success: null,
    status: 0,
    process: '',
    messageUSR: '',
    messageDEV: '',
    countData: 0,
    countDataReq: 0,
    countDataRes: 0,
    countMsgUSR: 0,
    countMsgDEV: 0,
    data: [],
    session: _mongoose.ClientSession,
    loggedUser: ''
  };
  return bitacora;
};
exports.BITACORA = BITACORA;
var DATA = function DATA() {
  var data = {
    success: false,
    status: 0,
    process: '',
    principal: false,
    secuencia: 0,
    countDataReq: 0,
    countDataRes: 0,
    countFile: 0,
    messageUSR: '',
    messageDEV: '',
    method: '',
    api: '',
    dataReq: [],
    dataRes: [],
    file: []
  };
  return data;
};

/*     export const AddMSG = (bitacora, data) => {
	
    data.success    = data.success   || false;
    data.status     = data.status     || -1;
    data.process    = data.process    || 'No se especifico Proceso';
    data.principal  = data.principal  || false;
    
    data.secuencia++;
    
    if(data.messageDEV) {
        bitacora.messageDEV = data.messageDEV;
        bitacora.countMsgDEV++;
    }

    if(data.messageUSR) {
        bitacora.messageUSR = data.messageUSR;
        bitacora.countMsgUSR++;
    }

    if(data.dataReq) {
        bitacora.countDataReq++;
    }

    if(data.dataRes) {
        bitacora.countDataRes++;
    }
    
    bitacora.status = data.status;
    bitacora.data.push(data);
    bitacora.countData++;

	return bitacora;
}; */
exports.DATA = DATA;
var AddMSG = function AddMSG(bitacora, data, tipo) {
  var status = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
  var principal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (tipo === 'OK') {
    data.success = data.success || true;
    bitacora.success = data.sucess || true;
  } else {
    data.success = data.success || false;
    bitacora.success = data.sucess || false;
  }
  data.status = data.status || status;
  data.process = data.process || 'No se especifico Proceso';
  data.principal = data.principal || principal;
  data.method = data.method || 'No se especifico Metodo';
  data.api = data.api || 'No se especifico API';
  data.secuencia++;
  if (data.messageDEV) {
    bitacora.messageDEV = data.messageDEV;
    bitacora.countMsgDEV++;
  }
  if (data.messageUSR) {
    bitacora.messageUSR = data.messageUSR;
    bitacora.countMsgUSR++;
  }
  if (data.dataReq) {
    data.countDataReq++;
    bitacora.countDataReq++;
  }
  if (data.dataRes) {
    data.countDataRes++;
    bitacora.countDataRes++;
  }
  if (data.file) {
    data.countFile++;
  }
  bitacora.status = data.status;
  bitacora.data.push(data);
  bitacora.countData++;
  return bitacora;
};
exports.AddMSG = AddMSG;
var OK = function OK(bitacora) {
  return {
    success: bitacora.success || true,
    status: bitacora.status || 500,
    process: bitacora.process || 'No se especifico Proceso Principal',
    messageUSR: bitacora.messageUSR || 'No se especifico Mensaje Final de Usuario',
    messageDEV: bitacora.messageDEV || 'No se especifico Mensaje Final Tecnico',
    countData: bitacora.countData || 0,
    countDataReq: bitacora.countDataReq || 0,
    countDataRes: bitacora.countDataRes || 0,
    countMsgUSR: bitacora.countMsgUSR || 0,
    countMsgDEV: bitacora.countMsgDEV || 0,
    data: bitacora.data || [],
    session: bitacora.session || 'No se especifico Session de BD',
    loggedUser: bitacora.loggedUser || 'No se especificio el Usuario Logueado'
  };
};
exports.OK = OK;
var FAIL = function FAIL(bitacora) {
  return {
    success: bitacora.success || false,
    status: bitacora.status || 500,
    process: bitacora.process || 'No se especifico Proceso Principal',
    messageUSR: bitacora.messageUSR || 'No se especifico Mensaje Final de Usuario',
    messageDEV: bitacora.messageDEV || 'No se especifico Mensaje Final Tecnico',
    countData: bitacora.countData || 0,
    countDataReq: bitacora.countDataReq || 0,
    countDataRes: bitacora.countDataRes || 0,
    countMsgUSR: bitacora.countMsgUSR || 0,
    countMsgDEV: bitacora.countMsgDEV || 0,
    data: bitacora.data || [],
    session: bitacora.session || 'No se especifico Session de BD',
    loggedUser: bitacora.loggedUser || 'No se especificio el Usuario Logueado'
  };
};
exports.FAIL = FAIL;
var TRANSOPTIONS = function TRANSOPTIONS() {
  var transactionOptions = {
    readPreference: 'primary',
    //readPreference: 'secondary',
    readConcern: {
      level: 'local'
    },
    writeConcern: {
      w: 'majority'
    },
    maxCommitTimeMS: 1000
  };
  return transactionOptions;
};
exports.TRANSOPTIONS = TRANSOPTIONS;