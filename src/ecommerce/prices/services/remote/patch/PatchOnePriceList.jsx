export function PatchOnePriceList(id, pricelist) {
  console.log("<<EJECUTA>> API <<PatchOnePriceList>> Requiere:", pricelist);
  const { id } = pricelist; // Asegúrate de que el objeto pricelist tiene un campo 'id'

  return new Promise((resolve, reject) => {
    axios.patch(`http://localhost:3020/api/pwa/prices-list/${id}`, pricelist)
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
