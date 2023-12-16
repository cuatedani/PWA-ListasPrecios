import axios from 'axios';

export function PatchOnePriceList(id, pricelist) {
  console.log("<<EJECUTA>> API <<PatchOnePriceList>> Requiere:", pricelist);
  return new Promise((resolve, reject) => {
    axios.patch(`http://localhost:3020/api/pwa/precio/one`, pricelist)
      .then((response) => {
        console.log("<<RESPONSE>> PatchOnePriceList", pricelist);
        const data = response.data;
        if (!data.success) {
          console.error("<<ERROR>> <<NO>> se ejecutó la API <<PatchOnePriceList>> de forma correcta", data);
          reject(data);
        } else if (data.success) {
          resolve(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<PatchOnePriceList>>", error);
        reject(error);
      });
  });
}
