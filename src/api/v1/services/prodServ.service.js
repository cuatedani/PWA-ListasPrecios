import ProdServ from '../models/ProdServ';

//GET PRODUCTS AND SERVICES LIST (retorna una lista de JSON)
export const getProdServList = async () => {
    let prodServList;
    try {
          prodServList = await ProdServ.find();
          return(prodServList);
    } catch (error) {
      //res.status(500).json({ message: 'Error: ' + ficError });
      throw error + "Error en ProductList";
    }
  };

  //GET PRODUCT OR SERVICE BY ID (retorna un JSON)
export const getProdServItem = async (id, keyType) => {
    let prodServItem;
   
    try {
      if (keyType === 'OK') {
        prodServItem = await ProdServ.findOne({
        IdProdServOK: id,
        });
      } else if (keyType === 'BK') {
          prodServItem = await ProdServ.findOne({
          IdProdServBK: id,
        });
      }
      return(prodServItem);
    } catch (error) {
      throw error + 'Error en ProducItem';
    }
  };

// POST (ADD) Productos y/o Servicios.
export const postProdServItem = async (paProdServItem) => {
    try {
      const newProdServItem = new ProdServ(paProdServItem);
      return await newProdServItem.save();
    } catch (error) {
      throw error + 'Error en el servicio post (ADD)';
    }
  };

// PUT (MODIFY) Products / Services
export const putProdServItem = async (id, paProdServItem) => {
  try {
    const newProdServItem = new ProdServ(putProdServItem);
    return await newProdServItem.findOneAndUpdate(
      { IdProdServOK: id },
      paProdServItem,
      {new: true,}
    );
  } catch (error) {
    throw error+"Error en Services Put ProdServ";
  }
};

//DELETE Productos/Servicios
export const deleteProdServItem = async (id) => {
  try {
    return await ProdServ.findOneAndDelete({ IdProdServOK: id });
  } catch (error) {
    throw error+"Error al borrar Producto/Servicio";
  }
};