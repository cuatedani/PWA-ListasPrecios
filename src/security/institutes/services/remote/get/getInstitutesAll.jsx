import axios from "axios";
export default function getAllInstitutes() {
    return new Promise((resolve, reject) => {
      //Equipo 2: 'http://localhost:3020/api/pwa/precio/' 
      axios.get(`${import.meta.env.VITE_CAT_PRICES_LIST_URL}`)
        .then((response) => {
          const data = response.data;
 
          if (!data.success) {
            console.error("No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          } else if (data.data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_institutos>>");
            resolve([]);
          } else if (data.success) {
            const InstitutesData = data.data[0].dataRes;
            console.log("Colección: <<cat_institutos>>", InstitutesData);
            resolve(JSON.parse(JSON.stringify(InstitutesData))); // Resuelve la promesa y hace una copia profunda
          }
        })
        .catch((error) => {
          console.error("Error en <<getAllInstitutes - Services>>", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }