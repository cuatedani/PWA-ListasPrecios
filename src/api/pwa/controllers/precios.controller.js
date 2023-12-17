import * as pricesListServices from '../services/precios.services';

//------------------- GET ------------------------Modificada Funcionando-----------------------
export const GetAllPricesList = async (req, res, next) => {
  try {
    const resultado = await pricesListServices.GetAllPricesList();

    if (resultado) {
      return res.status(resultado.status).json(resultado);
    }
  } catch (error) {
    next(error);
  }
};

//-----------------------------API GET ONE----------------Modificado Funcionando----------------------------
export const GetOnePricesListByID = async (req, res, next) => {
  try {
    const { IdInstitutoOK, IdListaOK } = req.query;
    const preciosItem = await pricesListServices.GetOnePricesListByID(IdInstitutoOK, IdListaOK);

    if (preciosItem) {
      return res.status(preciosItem.status).json(preciosItem);
    }
  } catch (error) {
    next(error);
  }
};

//-------------------- POST ----------------------Modificada Funcionando--------------------
// AGREGA UN LISTA
export const AddOnePricesList = async (req, res, next) => {
  try {
    const datosPrecios = req.body;
    const resultado = await pricesListServices.AddOnePricesList(datosPrecios);

    if (resultado) {
      return res.status(resultado.status).json(resultado);
    }
  } catch (error) {
    next(error);
  }
};

//-----------------------------API PUT--------------------Modificada Funcionando----------------------------
export const UpdateOnePricesList = async (req, res, next) => {
  try {
    const { IdInstitutoOK, IdListaOK } = req.query;
    const nuevosDatos = req.body;

    const resultado = await pricesListServices.UpdateOnePricesList(IdInstitutoOK, IdListaOK, nuevosDatos);

    if (resultado) {
      return res.status(resultado.status).json(resultado);
    }
  } catch (error) {
    next(error);
  }
};
//------------------------------DELETE API-----------------Modificada Funcionando--------------------------
export const DeleteOnePricesList = async (req, res, next) => {
  try {
    const { IdInstitutoOK, IdListaOK } = req.query;
    const resultado = await pricesListServices.DeleteOnePricesList(IdInstitutoOK, IdListaOK);

    if (resultado) {
      return res.status(resultado.status).json(resultado);
    }
  } catch (error) {
    next(error);
  }
};

//-----------------------------PATCH-----------------------------
export const updatePricesList = async (req, res, next) => {
  try {
    const { IdInstitutoOK, IdListaOK } = req.query;
    console.log('IdInstitutoOK:', IdInstitutoOK);
    console.log('IdListaOK:', IdListaOK);
    console.log( 'Body',req.body);
    const updateData = req.body;
    //console.log(updateData);

    const pricesListUpdate = await pricesListServices.updatePricesList(IdInstitutoOK, IdListaOK, updateData);
    if (pricesListUpdate) {
      pricesListUpdate.session = null;
      return res.status(pricesListUpdate.status).json(pricesListUpdate);
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------------------------------------------------------------------------------

