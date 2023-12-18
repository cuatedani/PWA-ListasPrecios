import axios from "axios";
export default function getAllPricesList() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3020/api/pwa/precios/')
        .then((response) => {
          const data = response.data;
 
          if (!data.success) {
            console.error("No se pudo realizar correctamente la petición <<getAllPricesList - Services>>", data);
            reject(data);
          } else if (data.data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_listas>>");
            resolve([]);
          } else if (data.success) {
            const PricesListData = data.data[0].dataRes;
            console.log("Colección: <<cat_listas>>", PricesListData);
            resolve(JSON.parse(JSON.stringify(PricesListData))); //
          }
        })
        .catch((error) => {
          console.error("Error en <<getAllPricesList - Services>>", error);
          reject(error);
        });
    });
  }