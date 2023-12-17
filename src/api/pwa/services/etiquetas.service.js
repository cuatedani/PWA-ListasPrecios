import etiquetas from '../models/etiquetas';
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../middlewares/respPWA.handler';


//===========================================================GET===========================================================S
export const getEtiquetasAll = async() => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer todas las Etiquetas";
        data.method = "GET";
        data.api = "/etiquetas";
        data.process = "Extraer todas las Etiquetas de la coleccción de cat_etiquetas";

        const EtiquetasAll = await etiquetas.find()
        .then((etiquetas) => {
            if(!etiquetas) {
                data.status = 404;
                data.messageDEV = "La base de datos <<NO>> tiene Etiquetas configuradas";
                throw Error(data.messageDEV);
            }

            return etiquetas;
        });

        data.status = 200; //200 = codigo cuando encuentras documentos
        data.messageUSR = "La extracción de las Etiquetas <<SI>> tuvo exito";
        data.dataRes = EtiquetasAll;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La extracción de las Etiquetas <<NO>> tuvo exito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}

export const getEtiquetasById = async (id) => {
    let bitacora = BITACORA(); // Inicializa la bitácora
    let data = DATA(); // Inicializa los datos de la solicitud

    try {
        // Registra el proceso en la bitácora
        bitacora.process = `Obtener Etiquetas por ID: ${id}`;
        
        // Establece el método de la solicitud en "GET"
        data.method = "GET";
        
        // Establece la ruta de la API en "/shipping/{id}"
        data.api = `/etiquetas/${id}`;
        
        // Establece la descripción del proceso
        data.process = `Obtener una Etiqueta específica de la colección de cat_etiquetas por su ID`;

        // Busca una entrega en la base de datos por su ID
        const etiquetas = await etiquetas.findOne({ IdInstitutoOK: id });

        if (!etiquetas) {
            // Si no se encuentra una entrega con el ID especificado, configura los datos de error
            data.status = 404;
            data.messageDEV = `No se encontró una Etiqueta con el ID ${id}.`;
            
            // Lanza un error con el mensaje de error
            throw Error(data.messageDEV);
        }

        // Establece los datos de éxito en la respuesta
        data.status = 200;
        data.messageUSR = "La obtención de la Etiqueta <<SI>> tuvo éxito";
        data.dataRes = etiquetas;

        // Agrega un mensaje de éxito a la bitácora
        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        // Devuelve una respuesta exitosa
        return OK(bitacora);

    } catch (error) {
        // Manejo de errores: Si se produce un error en el bloque "try"
        
        if (!data.status) data.status = error.statusCode; // Establece el código de estado en caso de error
        let { message } = error; // Obtiene el mensaje de error

        if (!data.messageDEV) data.messageDEV = message; // Establece el mensaje de error en los datos de la solicitud
        
        if (!data.dataRes.length === 0) data.dataRes = error; // Establece los datos de error en caso de que no se haya configurado
        
        // Establece el mensaje de error del usuario
        data.messageUSR = "La obtención de la Etiqueta <<NO>> tuvo éxito";

        // Agrega un mensaje de fallo a la bitácora
        bitacora = AddMSG(bitacora, data, 'FAIL');

        // Devuelve una respuesta de error
        return FAIL(bitacora);
    } finally {
        // La sección "finally" se ejecuta independientemente de si se produce un error o no
        // Aquí puedes realizar cualquier limpieza necesaria
    }
}
//===========================================================FING GET===========================================================


