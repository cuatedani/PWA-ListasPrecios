import * as PricesListServices from '../services/precios.services';

//------------------- GET ------------------------Modificada-----------------------
export const GetAllPricesList = async (req, res, next) => {
    try {
        const PricesListAll = await PricesListServices.getPricesListAll();

        if (PricesListAll) {
            return res.status(PricesListAll.status).json(PricesListAll);
        }

    } catch (error) {
        next(error);
        console.log("---------Error en getAllPricesList CONTROLLER----------");
    }
};

//-----------------------------API GET ONE----------------Modificado----------------------------
export const GetOnePricesList = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdListaOK } = req.query; // Obtén los valores de los query parameters

        // Llamar a la función para buscar y pasa los valores
        const result = await PricesListServices.getPricesListgByIdService(IdListaOK, IdInstitutoOK);

        if (result) {
            return res.status(result.status).json(result);
        }
    } catch (error) {
        next(error);
    }
};

//-------------------- POST ----------------------Modificada--------------------
// AGREGA UN PRODUCTO A LA COLECCION
export const AddOnePricesList = async (req, res, next) => {
    try {
        const PricesListAdded = await PricesListServices.addPricesList(req.body);

        if (PricesListAdded) {
            return res.status(PricesListAdded.status).json(PricesListAdded);
        }
    } catch (error) {
        next(error);
    }
};

//-----------------------------API PUT--------------------Modificada----------------------------
export const UpdateOnePricesList = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdListaOK } = req.query;
        const newData = req.body;

        //Se llama al servicio y espera la respuesta para seguir con las demas lineas de codigo
        const result = await PricesListServices.UpdatePricesListService(IdInstitutoOK, IdListaOK, newData);

        //Se valida el status de la consulta
        if (result.status === 200) {
            return res.status(200).json(result); //Status 200 si todo OK 
        } else if (result.status === 404) {
            return res.status(404).json(result); //Status 404 SI fallo
        }
    } catch (error) {
        next(error);
    }
};
//------------------------------DELETE API-----------------Modificada--------------------------
export const DeleteOnePricesList = async (req, res, next) => {
    try {
        // Obtén el valor a eliminar de los parámetros de la solicitud
        const { IdInstitutoOK, IdListaOK } = req.query;

        // Llama al servicio de eliminación y pasa el valor a eliminar
        const result = await PricesListServices.deletePricesListByValueService(IdInstitutoOK, IdListaOK);

        return res.status(result.status).json(result);

    } catch (error) {
        next(error);
    }
};

//-------------------------------APIS DE PRUEBA PARA PATCH----------------------------
export const UpdatePatchPricesList = async (req, res, next) => {
    try {
        const { IdInstitutoOK, IdListaOK } = req.query;
        const newData = req.body;

        const result = await PricesListServices.UpdateOnePricesList(IdInstitutoOK, IdListaOK, newData);

        if (result.status === 200) {
            return res.status(200).json(result);
        } else if (result.status === 404) {
            return res.status(404).json({
                message: "No se encontró el recurso",
                queryParameters: req.query,
                requestBody: req.body,
            });
        }
    } catch (error) {
        next(error);
    }
};


