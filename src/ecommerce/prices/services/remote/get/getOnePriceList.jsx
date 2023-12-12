import axios from "axios";
export function getOnePricesList(id) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3020/api/pwa/prices-list/${id}`)
        .then((response) => {
          const data = response.data;
 
          if (!data.success) {
            console.error("No se pudo realizar correctamente la petición <<getOnePricesList - Services>>", data);
            reject(data);
          } else if (data.data.length === 0) {
            console.info("🛈 No se encontro el documento con ID<<"+id+">>");
            resolve([]);
          } else if (data.success) {
            const PricesListData = data.data[0].dataRes;
            console.log("Colección: <<cat_listas>>", PricesListData);
            resolve(JSON.parse(JSON.stringify(PricesListData))); //
          }
        })
        .catch((error) => {
          console.error("Error en <<getOnePricesList - Services>>", error);
          reject(error);
        });
    });
  }