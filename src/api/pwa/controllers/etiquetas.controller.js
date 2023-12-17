import * as etiquetaServices from '../services/etiquetas.service';

//*************************************************************************************************** */
// GET
export const getEtiquetasAll = async(req, res, next) => {
    try{
        const etiquetasAll = await etiquetaServices.getEtiquetasAll();
        
        if(etiquetasAll) {
            return res.status(etiquetasAll.status).json(etiquetasAll);
        }
    }catch(error){
        next(error);
    }
};

export const getEtiquetasByIdController = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el valor a consultar de los parámetros de la solicitud
    
        // Llamar a la función para buscar y pasa el valor
        const result = await etiquetaServices.getEtiquetasById(id);
    
        if(result) {
            return res.status(result.status).json(result);
        }
      } catch (error) {
        next(error);
      }
};
// FIN GET
