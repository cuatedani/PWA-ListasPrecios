import PricesList from '../models/precios';
import Institutes from '../models/Institutes'
import { OK, FAIL, BITACORA, AddMSG, DATA } from '../../../middlewares/respPWA.handler';

//--------------------------------GET ALL--------------------------Modificada---------------------------
export const GetAllPricesList = async () => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Extraer todas las listas de precios";
    data.method = "GET";
    data.api = "/priceslist/"; //AJCG: no afecta a las apis lo que se escriba aquí
    data.process = "Extraer todas las listas de precios en la colección: cat_precios";

    const priceslist = await PricesList.find()

    if (priceslist.length === 0) {
      data.status = 404;
      data.messageDEV = "La base de datos no tiene listas configurados";
      throw new Error(data.messageDEV);
    }

    data.status = 200;
    data.messageUSR = "Listado de listas obtenido con éxito";
    data.dataRes = priceslist;
    bitacora = AddMSG(bitacora, data, 'OK', 200, true);

    return OK(bitacora);

  } catch (error) {
    if (!data.status) data.status = 500;
    data.messageDEV = error.message;
    data.messageUSR = "No se pudieron listar las listas";

    bitacora = AddMSG(bitacora, data, 'FAIL');
    return FAIL(bitacora);
  }
};

// API GET listas por id

export const GetOnePricesListByID = async (IdInstitutoOK, IdListaOK) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Traer una Lista especifica";
    data.method = "GET";
    data.api = `/priceslist/${IdInstitutoOK}`;
    data.process = "Traer una Lista especifica en la base de datos";

    const priceslist = await PricesList.findOne({
      IdInstitutoOK: IdInstitutoOK,
      IdListaOK: IdListaOK
    });
    if (!priceslist) {
      data.status = 404;
      data.messageDEV = "La lista no se encontró en la base de datos";
      throw new Error(data.messageDEV);
    } else {
      const detallesPricesList = priceslist;
      data.status = 200;
      data.messageUSR = "Lista obtenida con éxito";
      data.dataRes = detallesPricesList;

      bitacora = AddMSG(bitacora, data, 'OK', 200, true);

      return OK(bitacora);
    }

  } catch (error) {
    if (!data.status) data.status = 500;
    data.messageDEV = error.message;
    data.messageUSR = "No se pudo obtener la lista";

    bitacora = AddMSG(bitacora, data, 'FAIL');
    return FAIL(bitacora);
  }
};

// API para Crear una Lista
export const AddOnePricesList = async (datosPricesList) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Crear un nuevo Pago";
    data.method = "POST";
    data.api = "/priceslist/add";
    data.process = "Crear un nuevo registro de listas en la base de datos";

    const nuevoPricesList = new PricesList(datosPricesList);

    await nuevoPricesList.save();

    data.status = 201;
    data.messageUSR = "La lista se ha creado con éxito";

    bitacora = AddMSG(bitacora, data, 'OK', 201, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = 500;
    data.messageDEV = error.message;
    data.messageUSR = "No se pudo crear la lista";

    bitacora = AddMSG(bitacora, data, 'FAIL');
    return FAIL(bitacora);
  }
};

//---------------------------------------UPDATE LISTA----------------FUNCIONANDO-----------------
// API para Actualizar 
export const UpdateOnePricesList = async (IdInstitutoOK, IdListaOK, nuevosDatos) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Actualizar una Lista";
    data.method = "PUT";
    data.api = `/actualizar/${IdInstitutoOK}`;
    data.process = "Actualizar los detalles de una lista en la base de datos";

    const pricesListActualizado = await PricesList.findOneAndUpdate({
      IdInstitutoOK: IdInstitutoOK,
      IdListaOK: IdListaOK
    }, nuevosDatos, { new: true });


    if (!pricesListActualizado) {
      data.status = 404;
      data.messageDEV = "La lista no se encontró en la base de datos";
      throw new Error(data.messageDEV);
    }

    data.status = 200;
    data.messageUSR = "La lista se ha actualizado con éxito";
    data.dataRes = pricesListActualizado;

    bitacora = AddMSG(bitacora, data, 'OK', 200, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = 500;
    data.messageDEV = error.message;
    data.messageUSR = "No se pudo actualizar la lista";

    bitacora = AddMSG(bitacora, data, 'FAIL');
    return FAIL(bitacora);
  }
};


//Eliminar lista
export const DeleteOnePricesList = async (IdInstitutoOK, IdListaOK) => {
  let bitacora = BITACORA();
  let data = DATA();
  let query = {};

  try {


    const pricesListAEliminar = await PricesList.findOne({
      IdInstitutoOK: IdInstitutoOK,
      IdListaOK: IdListaOK
    });

    if (!pricesListAEliminar) {
      data.status = 404;
      data.messageDEV = "La lista no se encontró en la base de datos";
      throw new Error(data.messageDEV);
    }

    const pricesListEliminado = await PricesList.findOneAndDelete({
      IdInstitutoOK: IdInstitutoOK,
      IdListaOK: IdListaOK
    });

    if (!pricesListEliminado) {
      data.status = 404;
      data.messageDEV = "La lista no se encontró en la base de datos";
      throw new Error(data.messageDEV);
    }

    data.status = 200;
    data.messageUSR = "La lista se ha eliminado con éxito";
    data.dataRes = pricesListEliminado;

    bitacora = AddMSG(bitacora, data, 'OK', 200, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = 500;
    data.messageDEV = error.message;
    data.messageUSR = "No se pudo eliminar la lista";

    bitacora = AddMSG(bitacora, data, 'FAIL');
    return FAIL(bitacora);
  }
};

//----------------------------------APIS DE SUBDOCUMENTOS------------------------------------------------------
//---------- Metodos PATCH de la API Listas------------------//
export const updatePricesList = async (IdInstitutoOK, IdListaOK, updateData) => {
  let bitacora = BITACORA();
  let response = updatePricesListMethod(bitacora, IdInstitutoOK, IdListaOK, updateData);
  return response;
};

export const updatePricesListMethod = async (bitacora, IdInstitutoOK, IdListaOK, updateData) => {
  let data = DATA();
  try {
    bitacora.process = 'Modificar una lista.';
    data.process = 'Modificar una lista';
    data.method = 'PATCH';
    data.api = '/precios/one';

    // Verifica si updateData es un objeto
    if (typeof updateData !== 'object' || updateData === null) {
      data.status = 400;
      data.messageDEV = 'El parámetro updateData debe ser un objeto no nulo.';
      throw new Error(data.messageDEV);
    }

    let productoUpdated = null;

    // Encuentra el documento principal usando IdInstitutoOK, IdListaOK
    const filter = {
      IdInstitutoOK: IdInstitutoOK,
      IdListaOK: IdListaOK
    };

    for (const key in updateData) {
      if (Object.prototype.hasOwnProperty.call(updateData, key)) {
        const value = updateData[key];

        const updateQuery = { $set: { [key]: value } };

        try {
          productoUpdated = await PricesList.findOneAndUpdate(
            filter,
            updateQuery,
            { new: true }
          );

          if (!productoUpdated) {
            console.error("No se encontró un documento para actualizar con ese ID,", IdListaOK);
            data.status = 400;
            data.messageDEV = 'La Actualización de un Subdocumento del producto NO fue exitoso.';
            throw new Error(data.messageDEV);
          }
        } catch (error) {
          console.error(error);
          data.status = 400;
          data.messageDEV = 'La Actualizacion de un Subdocumento de la lista de precios NO fue exitoso.';
          throw Error(data.messageDEV);
        }
      }
    }

    data.messageUSR = 'La Modificacion de los subdocumentos de la lista de precios SI fue exitoso.';
    data.dataRes = productoUpdated;
    bitacora = AddMSG(bitacora, data, 'OK', 201, true);
    return OK(bitacora);
  } catch (error) {
    console.error(error);
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR =
      'La Modificacionión de la lista de precios NO fue exitosa.' +
      '\n' +
      'Any operations that already occurred as part of this transaction will be rolled back.';
    bitacora = AddMSG(bitacora, data, 'FAIL');
    return FAIL(bitacora);
  }
};


//---------------------------------------------------------------------------------------------------------------
