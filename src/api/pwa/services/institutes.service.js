import Institutos from '../models/Institutes';
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../middlewares/respPWA.handler';


export const getInstitutesAll = async() => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer todos los Institutos";
        data.method = "GET";
        data.api = "/institutes";
        data.process = "Extraer todos los Institutos de la coleccción de cat_institutos";

        const InstitutesAll = await Institutos.find()
        .then((institutes) => {
            if(!institutes) {
                data.status = 404;
                data.messageDEV = "La base de datos <<NO>> tiene Institutos configurados";
                throw Error(data.messageDEV);
            }

            return institutes;
        });

        data.status = 200; //200 = codigo cuando encuentras documentos
        data.messageUSR = "La extracción de los Institutos <<SI>> tuvo exito";
        data.dataRes = InstitutesAll;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La extracción de los Institutos <<NO>> tuvo exito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}



//PARA POST
export const addInstitute = async(newInstitute) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar un nuevo Instituto";
        data.method = "POST";
        data.api = "/institutes";
        data.process = "Agregar un nuevo instituto a la coleccción de cat_institutos";

        const instituteAdded = await Institutos.insertMany(
            newInstitute,
            { order: true }
        )
        .then((institute) => {
            if(!institute) {
                data.status = 400; //400 de que no se pudo insertar; es diferente a 404
                data.messageDEV = "La inserción del Instituto <<NO>> fue exitosa";
                throw Error(data.messageDEV);
            }

            return institute;
        });

        data.status = 201; //201 = codigo cuando se inserta exitosamente SIUU
        data.messageUSR = "La inserción del Instituto <<SI>> fue exitosa";
        data.dataRes = instituteAdded;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción del Instituto <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}

//===========================================================PUT===========================================================
export const updateEntrega = async (id, newData) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar la Entrega con ID ${id}`;
        data.method = "PUT";
        data.api = `/entrega/${id}`;
        data.process = `Actualizar la Entrega en la colección de Entregas`;

        // Aquí realizas la actualización de la entrega
        const updatedEntrega = await Institutos.findOneAndUpdate({ IdInstitutoOK: id }, newData, {
            new: true, // Esto te devolverá el documento actualizado en lugar del anterior
        });

        if (!updatedEntrega) {
            data.status = 404;
            data.messageDEV = `No se encontró una Entrega con el ID ${id}`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = `La Entrega con ID ${id} se actualizó con éxito`;
        data.dataRes = updatedEntrega;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = `La actualización de la Entrega con ID ${id} falló`;

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        // Haya o no error siempre ejecuta aquí
    }
}
//===========================================================FIN PUT===========================================================

//===========================================================DELETE===========================================================
export const deleteEntregaByValue = async (valueToDelete) => {
    try {
      // Realiza la eliminación del documento en función del valor proporcionado
      const result = await Institutos.deleteOne({ IdInstitutoOK: valueToDelete });
  
      if (result.deletedCount === 0) {
        // Si no se encontró un documento para eliminar, lanza un error
        throw new Error('Entrega no encontrado.');
      }
  
      return { message: 'Entrega eliminado correctamente.' };
    } catch (error) {
      throw error;
    }
  };
//===========================================================FIN DELETE===========================================================  