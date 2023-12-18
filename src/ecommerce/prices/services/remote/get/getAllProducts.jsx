import axios from "axios";

export default function getAllProducts() {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:3020/api/pwa/productos/")
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          console.error("<<ERROR>> <<NO>> se ejecuto la API <<GetAllProducts>> de forma correcta", data);
          reject(data); //Equipo 2: Rechaza la promesa con la respuesta si no fue exitosa
        } else if (data.data.length === 0) {
          console.info("🛈 <<NO>> se encontraron documentos <<cat_productos>>");
          resolve([]);
        } else if (data.success) {
          const products = data.data[0].dataRes;
          //console.log("Coleccion: <<cat_products>>", products);
          resolve(JSON.parse(JSON.stringify(products))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<GetAllProducts>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}