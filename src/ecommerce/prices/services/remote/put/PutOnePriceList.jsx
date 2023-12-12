import axios from "axios";

export function PutOnePriceList(id, pricelist) {
   
    console.log("<<EJECUTA>> API <<PutOnePriceList>> Requiere:", pricelist)
    return new Promise((resolve, reject) => {
        axios.put('http://localhost:3020/api/pwa/prices-list/'+id , pricelist)
        .then((response) => {
          console.log("<<RESPONSE>> PutOnePriceList", pricelist)
          const data = response.data;
          if (!data.success) { 
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<PutOnePriceList>> de forma correcta", data);
            reject(data);
          } else if (data.success) {
            resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<PutOnePriceList>>", error);
          reject(error);
        });   
    });
}