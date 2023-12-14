import PricesList from '../models/precios';
import {OK, FAIL, BITACORA, AddMSG, DATA} from '../../../middlewares/respPWA.handler';

//--------------------------------GET ALL--------------------------Modificada---------------------------
export const getPricesListAll = async() => { 
    let bitacora = BITACORA();
    let data = DATA();

    try{
        bitacora.process = "Extraer todas las listas de precios";
        data.method = "GET";
        data.api = "/prices-list/"; //AJCG: no afecta a las apis lo que se escriba aquí
        data.process = "Extraer todas las listas de precios en la colección: cat_precios";

        const PricesListAll = await PricesList.find()               
        .then((PricesList) => {                                 
            if(!PricesList){                                    
                data.status = 404;
                data.message = "La base de datos NO tiene Listas de precios configurados";
                throw Error(data.messageDEV);
            }
            return PricesList;
        });

        data.status = 200; //codigo cuando se encuentran los documentos
        data.messageUSR = "La extracción de las listas de precios fue exitosa";
        data.dataRes = PricesListAll;                                
        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    }catch(error){

        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if (!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error; 
        data.messageUSR = "La extracción de las listas de precios en la API getOnePricesList NO tuvo exito";

        bitacora = AddMSG(bitacora,data,'FAIL');

        return FAIL(bitacora);

    } 
    finally{
        //await localSession.endSession();
    }

}

export const getPricesListgByIdService = async (id, IdInstitutoOK) => {
    let bitacora=BITACORA();
    let data=DATA();

    try{
        bitacora.process=`Obtener Lista de Precios por ID: ${id}`;
        data.method="GET";
        data.api=`/priceslist/${id}`;
        data.process=`Obtener Lista de Precios especifica de la colección Listas`
        const PricesList = await PricesList.findOne({IdInstitutoOK:IdInstitutoOK, IdListaOK:id});

        if(!PricesList){
            data.status=404;
            data.messageDEV=`No se encontró una lista con ID ${id}`;
            throw Error(data.messageDEV);
        }
        data.status=200;
        data.messageUSR="La obtención de la Lista tuvo exito";
        data.dataRes=PricesList;
        bitacora=AddMSG(bitacora,data,'OK',200,true);
        return OK(bitacora);
    }catch(error){
        if (!data.status) data.status = error.statusCode; 
        let { message } = error; 
        if (!data.messageDEV) data.messageDEV = message; 
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La obtención de la Lista no tuvo éxito";

        // Agrega un mensaje de fallo a la bitácora
        bitacora = AddMSG(bitacora, data, 'FAIL');

        // Devuelve una respuesta de error
        return FAIL(bitacora);
    } finally {
        // Aqui se ejecuta independientemente de si se produce un error o no
    }
};

//---------------------------------------POST PRODUCT------------------Modificada---------------------

export const addPricesList = async(newPriceList) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar una nueva lista de precios";
        data.method = "POST";
        data.api = "/priceslist/";
        data.process = "Agregar una nueva lista de precios a la colección cat_precios";

        const PricesListAdded = await PricesList.insertMany(
            newPriceList,
            { order: true }
        )
        .then((pricesList) => {
            if(!pricesList) {
                data.status = 400; //400 indica que no se pudo insertar
                data.messageDEV = "La inserción de la lista de precios <<NO>> fue exitosa";
                throw Error(data.messageDEV);
            }

            return pricesList;
        });

        data.status = 201; //201 = codigo cuando se inserta exitosamente SIUU
        data.messageUSR = "La inserción de la lista de precios <<SI>> fue exitosa";
        data.dataRes = PricesListAdded;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de la lista de precios <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}

//---------------------------------------UPDATE PRODUCT----------------FUNCIONANDO-----------------
export const UpdatePricesListService = async (IdInstitutoOK, IdListaOK, newData) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar la lista de precios con ID ${IdListaOK}`; //Mensaje del proceso con el id del producto a actualizar
        data.method = "PUT"; //Metodo que se esta empleando
        data.api = `/priceslist`; //URL de la API que se esta utilizando 
        data.process = `Actualizar la lista de precios en la colección de cat_precios`; //Mensaje del proceso que se esta llevando a cabo más especifico

        // Aqui se realiza la actualización del producto
        const UpdatedPricesList = await prices.findOneAndUpdate({ IdInstitutoOK:IdInstitutoOK, IdListaOK: IdListaOK }, newData, {
            new: true, // Esto devolverá el documento actualizado en lugar del anterior
        });

        if (!UpdatedPricesList) {
            data.status = 404; //404 indica que no encontro el producto que se quiere actualizar
            data.messageDEV = `No se encontró ninguna lista de precios con el ID ${idListaOK}`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = `La lista de precio con ID ${IdListaOK} se actualizó con éxito`;
        data.dataRes = UpdatedPricesList;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = `La actualización de la lista de precio con ID ${idListaOK} falló`;

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        // Haya o no error siempre ejecuta aquí
    }
}

//--------------------------------------DELETE PRODUCTO-------------------FUNCIONANDO-----------------------
export const deletePricesListByValueService = async (IdInstitutoOK, IdListaOK) => {
    
    let bitacora = BITACORA();
    let data = DATA();

    try {
        
        //PROCESO DONDE SE ACTUALIZA TANTO LA BITACORA COMO LA DATA PARA GUARDAR LOS REGISTROS DE LAS OPREACIONES QUE SE ESTAN HACIENDO***********
        bitacora.process = `Borrar la lista de precio con ID ${ID}`; //Mensaje del proceso con el id del precio a actualizar
        data.method = "Delete"; //Metodo que se esta empleando
        data.api = `/priceslist`; //URL de la API que se esta utilizando 
        data.process = `Borrar la lista de precios de la colección de cat_precios`; //Mensaje del proceso que se esta llevando a cabo más especifico


        // Realiza la eliminación del documento en función del valor proporcionado <<CONSULTA>>
        const result = await prices.deleteOne({ IdInstitutoOK:IdInstitutoOK, IdListaOK:IdListaOK });
        // FIN <<CONSULTA>>

        //VALIDA SI SE ENCONTRO EL PRODUCTO QUE SE DESEA BORRAR******************************************************************************
        if (result.deletedCount === 0) {
        // SI NO ENCONTRO UN DOCUMENTO CON EL ID PROPORCIONADO ACTUALIZA LA DATA CON EL ERROR Y SALE DEL METODO
            data.status = 404; //404 indica que no encontro el producto que se quiere actualizar
            data.messageDEV = `No se encontró un producto para borrar con el ID ${ID}`;
            throw Error(data.messageDEV);
        }

        //EN CASO DE QUE SI ENCONTRO EL DOCUMETO ACTUALIZA LA DATA CON UN STATUS 200 INDICANDO QUE TODO ESTA OK******************************
        data.status = 200;
        data.messageUSR = `Producto se borro con éxito`;

        //ACTUALIZACION DE LA BITACORA DONDE SE REGISTRA EL MOVIMIENTO QUE SE ESTA HACIENDO
        bitacora = AddMSG(bitacora, data,'OK',200, true);
        
        //MANDA UN OK A LA BITACORA INDICANDO QUE LA OPERACION FUE EXITOSA
        return OK(bitacora);

    } catch (error) { //AQUI ENTRA CUANDO NO SE ENCONTRO EL PRODUCTO QUE SE DESEA BORRAR, COSULTA LA DATA BUSCANDO EL STATUS DE LA COSULTA
                      //Y ACTUALIZA LA DATA INDICANDO QUE HUBO UN ERROR Y CUAL ES ESE ERROR.
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = `La eliminacion de la lista de precios con ID ${ID} falló`;

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        // Haya o no error siempre ejecuta aquí
    }
  };

//----------------------------------APIS DE SUBDOCUMENTOS------------------------------------------------------
export const UpdatePatchOnePricesList = async (IdInstitutoOK, IdListaOK, updateData) => {
    let bitacora = BITACORA();
    let data = DATA();
    try {
        bitacora.process = 'Modificar una lista.';
        data.process = 'Modificar una sola lista';
        data.method = 'PATCH';
        data.api = '/priceslist';

        const currentPricesList = await PricesList.findOne({IdInstitutoOK:IdInstitutoOK, IdListaOK:IdListaOK});

        if(!currentPricesList){
            data.status=404;
            data.messageDEV=`No se encontró una lista con el ID ${IdListaOK} `;
            throw new Error(data.messageDEV);
        }

        for (const key in updateData){
            if(updateData.hasOwnProperty(key)){
                currentPricesList[key]=updateData[key];
            }
        }

        const result = await currentPricesList.save();

        data.dataRes=Object.keys(updateData).reduce((acc,key)=>{
            acc[key]=result[key];
            return acc;
        },{});

        data.status=200;
        data.messageUSR='Modificación de subdocumentos de Listas de Precios fue Exitoso';
        bitacora=AddMSG(bitacora,data,'OK',201,true);

        return OK(bitacora);
    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        if (!data.messageDEV) data.messageDEV = error.message;
        if (data.dataRes === undefined) data.dataRes = error;
        data.messageUSR = `La actualizacion de la lista con ID ${IdListaOK} NO tuvo exito`;
        bitacora = AddMSG(bitacora, data, 'FAIL');
        return FAIL(bitacora);
    }
};