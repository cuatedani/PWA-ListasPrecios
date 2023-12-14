import ProdServ from '../models/ProdServ';
import * as ProdServServices from '../services/prodServ.service';

// API GET Todos los Productos.
export const getProdServList = async (req, res, next) => {
    try{
      const prodServList = await ProdServServices.getProdServList();
      if (!prodServList) {
        throw error + ('No se encontraron productos/servicios registrados.');
      } else if (prodServList) {
        res.status(800).json(prodServList);
      }
    } catch(error) {
      next(error);
    }
    };

    //Solo un Producto/Servicio.
  export const getProdServItem = async (req, res, next) => {
    try {
      //obtener parametro id mediante la desestructuracion de objetos
      const { id } = req.params;
      //Se obtiene parametro de la forma clase/objeto.
      //const idProdServ = req.params.id;
      const keyType = req.query.keyType || 'OK';
      const prodServItem = await ProdServServices.getProdServItem(id, keyType);
      if (!prodServItem) {
        throw error + ('No se encontraron productos/servicios registrados.');
      } else if (prodServItem) {
        res.status(500).json(prodServItem);
      }
    }catch(error){
      next(error + "Error en controlador GET");
    }
  };

// API POST (ADD) prodServ
export const postProdServ = async (req, res, next) => {
  try {
    const paPorServItem = req.body;
    const newProdServtem = await ProdServServices.postProdServItem(paPorServItem);
    if (!newProdServtem) {
      throw error+"No se pudo crear el Producto y/o Servicio.";
    } else if (newProdServtem) {
      res.status(401).json(newProdServtem);
    }
  } catch (error) {
    console.log(error+"Error postProdServ controller");
    next(error);
  }
};

//Put Actualizar producto o servicio
export const putProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('controller id -> ', id);
    const paProdServItem = req.body;
    console.log('controller body -> ', paProdServItem);
    const updatedProdServItem = await ProdServServices.putProdServItem(
      id,
      paProdServItem
    );
    if (!updatedProdServItem) {
      throw error('No se pudo actualizar el Producto/Servicio.');
    } else if (updatedProdServItem) {
      res.status(400).json(updatedProdServItem);
    }
  } catch (error) {
    next(error);
  }
};

//delete prodServ
export const deleteProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProdServItem = await ProdServServices.deleteProdServItem(id);
    if (!deleteProdServItem) {
      throw error //(`No se encontró el producto con id ${req.params.id}.`);
    } else if (deleteProdServItem) {
      res.status(400).json(deleteProdServItem);
    }
  } catch (error) {
    next(error);
  }
};

/*
export const deleteEdificioItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteEdificioItem = await EdificiosServices.deleteEdificioItem(id);
    if (!deleteEdificioItem) {
      throw boom.notFound(`No se encontró el periodo con id ${req.params.id}.`);
    } else if (deleteEdificioItem) {
      res.status(200).json(deleteEdificioItem);
    }
  } catch (error) {
    next(error);
  }
};
*/