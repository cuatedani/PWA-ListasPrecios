import boom from '@hapi/boom';

import * as prodServServices from '../services/prodServ.services';

//ZAM: [OBTENER] TODOS LOS PRODUCTOS
export const GetAllProdServ = async (req, res, next) => {
	try {
		const productosAll = await prodServServices.GetAllProdServ();
		if (productosAll) {
			return res.status(productosAll.status).json(productosAll);
		}
	} catch (error) {
		next(error);
	}
};

//FIC: [OBTENER] 1 PRODUCTO
export const GetOneProdServ = async (req, res, next) => {
	try {
		//const productId = req.params.productId; // Obtener el ID del parámetro
		//const productId = req.params.id; //cuando se envia un solo valor
		const params = req.query;
		//console.log("productId 0000",productId)
		// Lógica para obtener el producto/servicio específico con el ID
		const prodServ = await prodServServices.GetOneProdServ(params);
		if (prodServ) {
			return res.status(prodServ.status).json(prodServ);
		}
	} catch (error) {
		next(boom.badImplementation(error));
	}
};

//ZAM: [AGREGAR] 1 PRODUCTO
export const AddOneProdServ = async (req, res, next) => {
	try {
		const producto = req.body;
		const productAdded = await prodServServices.AddOneProdServ(producto);
		if (productAdded) {
			productAdded.session = null;
			return res.status(productAdded.status).json(productAdded);
		}
	} catch (error) {
		next(error);
	}
};

//ZAM: [MODIFICAR] 1 PRODUCTO
export const UpdateOneProdServ = async (req, res, next) => {
	try {
		//const productId = req.params.id;
		const params = req.query;
		const updateData = req.body;
		
		const productUpdated = await prodServServices.UpdateOneProdServ(params,updateData);
		if (productUpdated) {
			productUpdated.session = null;
			return res.status(productUpdated.status).json(productUpdated);
		}
	} catch (error) {
		next(error);
	}
};


//EN REQUIERE FALTA IdInstitutoOK
// UPDATE eCOMMERCE
export const PatchOneProdServ = async (req, res, next) => {
	try {
  
	  //const { id } = req.params;
	  const params = req.query;
	  const body = req.body;
	  //const keyType = req.query.keyType || 'OK';
  
	  //const ProdServUpdated = await prodServServices.PatchOneProdServ(params, req.body, keyType);
	  const ProdServUpdated = await prodServServices.PatchOneProdServ(params, body);

	  if (ProdServUpdated) {
		return res.status(ProdServUpdated.status).json(ProdServUpdated);
	  }
	} catch (error) {
	  next(error);
	}
  };
  



//ZAM: [ELIMINAR] 1 PRODUCTO
export const DeleteOneProdServ = async (req, res, next) => {
	try {
		//const productId = req.params.id;
		const params = req.query;
			const productDeleted = await prodServServices.DeleteOneProdServ(params);
		if (productDeleted) {
			productDeleted.session = null;
			return res.status(productDeleted.status).json(productDeleted);
		}
	} catch (error) {
		next(error);
	}
};

  
  /////////////////////////////////////////////////////
  // *********** DELETE SECTION eCOMMERCE *********** //
  /////////////////////////////////////////////////////
  //EN REQUIERE FALTA IdInstitutoOK
  // DELETE eCOMMERCE
  /* export const DeleteOneProdServ2 = async (req, res, next) => {
	try {
  
	  const { id } = req.params;
	  const keyType = req.query.keyType || 'OK';
  
	  const ProdServDeleted = await prodServServices.DeleteOneProdServ(id, keyType);
	  if (ProdServDeleted) {
		return res.status(ProdServDeleted.status).json(ProdServDeleted);
	  }
	} catch (error) {
	  next(error);
	}
  };
 */