import axios from "axios";

export default function deleteOnePriceList(pricelist) {

  console.log("<<EJECUTA>> API <<DeleteOnePriceList>> Requiere:")
  return new Promise((resolve, reject) => {
    axios.delete(`http://localhost:3020/api/pwa/precio/`, pricelist)
      .then((response) => {
        console.log("<<RESPONSE>> DeleteOnePriceList", pricelist)
        const data = response.data;
        if (!data.success) {
          console.error("<<ERROR>> <<NO>> se ejecuto la API <<DeleteOnePriceList>> de forma correcta", data);
          reject(data);
        } else if (data.success) {
          resolve(data);
        }
      })
      .catch((error) => {
        console.error("Error en API DeleteOnePriceList", error);
        reject(error);
      });
  });
}