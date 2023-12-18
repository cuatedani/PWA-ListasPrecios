import axios from "axios";

export default function getAllBusiness() {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:3020/api/pwa/negocios/")
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          console.error("<<ERROR>> <<NO>> se ejecuto la API <<GetAllBusiness>> de forma correcta", data);
          reject(data); //FIC: Rechaza la promesa con la respuesta si no fue exitosa
        } else if (data.data.length === 0) {
          console.info("🛈 <<NO>> se encontraron documentos <<cat_negocios>>");
          resolve([]);
        } else if (data.success) {
          const Business = data.data[0].dataRes;
          //console.log("Coleccion: <<cat_negocios>>", Business);
          resolve(JSON.parse(JSON.stringify(Business))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<GetAllBusiness>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}