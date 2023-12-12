import { NegociosModel } from "../models/NegociosModel";

//Equipo 2: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const NegociosValues = (values) => {
  let Negocios = NegociosModel()
  Negocios.IdNegocioOK = values.IdNegocioOK
  return Negocios
}