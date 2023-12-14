import institutes from '../models/institutes';
import {OK, FAIL, BITACORA, AddMSG, DATA} from '../../../middlewares/respPWA.handler';

export const getInstitutesAll = async() => {
    let bitacora = BITACORA();
    let data = DATA();

    try{
        bitacora.process = "Extraer todos los institutos";
        data.method = "GET";
        data.api = "/institutes"; //AJCG: no afecta a las apis lo que se escriba aquí
        data.process = "Extraer todos los institutos de la conexion de cat_institutos";

        const InstitutesAll = await institutes.find() 
        .then((institutes) => {
            if(!institutes){
                data.status = 404;
                data.message = "La base de datos NO tiene institutos configurados";
                throw Error(data.messageDEV);
            }
            return institutes;
        });

        data.status = 200; //codigo cuando se encuentran los documentos
        data.messageUSR = "La extracción de la Institucón...";
        data.dataRes = InstitutesAll;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);



    }catch(error){

        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if (!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length == 0) data.dataRes = error; 
        data.messageUSR = "La extracción de los institutos NO tuvo exito";

        bitacora = AddMSG(bitacora,data,'FAIL');

        return FAIL(bitacora);

    } 
    finally{
        //AJCG: haya o no haya error siempre ejecuta
    }

}



export const addInstitute = async(newInstitute) => {
    let bitacora = BITACORA();
    let data = DATA();

    try{
        bitacora.process = "Agregar un nuevo instituto";
        data.method = "POST";
        data.api = "/institutes"; //AJCG: no afecta a las apis lo que se escriba aquí
        data.process = "Agregar un nuevo instituto de la colección";

        const institutesadd = await institutes.insertMany(
            newInstitute,
            {order:true}
        ) 
        .then((institutes) => {
            if(!institutes){
                data.status = 400;
                data.message = "La insercion del instituto NO tuvo exito";
                throw Error(data.messageDEV);
            }
            return institutes;
        });

        data.status = 201; //codigo cuando se encuentran los documentos
        data.messageUSR = "La inserción del instituto fue exitosa";
        data.dataRes = institutesadd;
        bitacora = AddMSG(bitacora, data, 'OK', 201, true);
        
        return OK(bitacora);
    }catch(error){

        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if (!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length == 0) data.dataRes = error; 
        data.messageUSR = "La insercion del instituto NO tuvo exito";
        bitacora = AddMSG(bitacora,data,'FAIL');

        return FAIL(bitacora);

    } 
    finally{
        //AJCG: haya o no haya error siempre ejecuta
    }

}