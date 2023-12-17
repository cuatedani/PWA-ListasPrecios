import * as institutesServices from '../services/institutes.service';

//*************************************************************************************************** */
// GET
export const getInstitutesAll = async(req, res, next) => {
    try{
        const institutesAll = await institutesServices.getInstitutesAll();
        
        if(institutesAll) {
            return res.status(institutesAll.status).json(institutesAll);
        }
    }catch(error){
        next(error);
    }
};
// FIN GET
//*************************************************************************************************** */
//*************************************************************************************************** */
// POST
//Feak: add one institute in da coleczion cat_institutos
export const addInstitute = async(req, res, next) => {
    try{
        const instituteAdded = await institutesServices.addInstitute(req.body);
        
        if(instituteAdded) {
            return res.status(instituteAdded.status).json(instituteAdded);
        }
    }catch(error){
        next(error);
    }
};
// FIN POST
//*************************************************************************************************** */

//*************************************************************************************************** */
// PUT
//Feak: 
export const updateEntrega = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el ID de la entrega desde los parámetros de la solicitud
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await institutesServices.updateEntrega(id, newData);

        if (result.status === 200) {
            return res.status(200).json(result);
        } else if (result.status === 404) {
            return res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
};
// FIN PUT
//*************************************************************************************************** */

//*************************************************************************************************** */
// DELETE
//Feak: 
export const deleteEntregaByValue = async (req, res, next) => {
    try {
      const { valueToDelete } = req.params; // Obtén el valor a eliminar de los parámetros de la solicitud
  
      // Llama al servicio de eliminación y pasa el valor a eliminar
      const result = await institutesServices.deleteEntregaByValue(valueToDelete);
  
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
// FIN DELETE
//*************************************************************************************************** */
