import axios from "axios";

export default function deleteOnePriceList(pricelist) {
  console.log("<<EJECUTA>> API <<DeleteOnePriceList>> Requiere: IdInstitutoOK-> ", pricelist.IdInstitutoOK, "  IdListaOK->",pricelist.IdListaOK );
  let IdInstitutoOK = pricelist.IdInstitutoOK;
  let IdListaOK = pricelist.IdListaOK;
  return new Promise((resolve, reject) => {
    axios.delete(`http://localhost:3020/api/pwa/precios/?IdInstitutoOK=${IdInstitutoOK}&IdListaOK=${IdListaOK}`)
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