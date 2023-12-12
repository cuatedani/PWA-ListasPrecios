import axios from "axios";

export function DeleteOnePriceList(id) {
   
    console.log("<<EJECUTA>> API <<DeleteOnePriceList>> Requiere:")
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3020/api/pwa/prices-list/${id}`)
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
          console.error("<<ERROR>> en API <<DeleteOnePriceList>>", error);
          reject(error);
        });   
    });
}