import axios from "axios";

export function AddOnePriceList(pricelist) {
   
    console.log("<<EJECUTA>> API <<AddOnePriceList>> Requiere:", pricelist)
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3020/api/pwa/precio/', pricelist)
        .then((response) => {
          console.log("<<RESPONSE>> AddOnePriceList", pricelist)
          const data = response.data;
          if (!data.success) { 
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOnePriceList>> de forma correcta", data);
            reject(data);
          } else if (data.success) {
            resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOnePriceList>>", error);
          reject(error);
        });   
    });
}