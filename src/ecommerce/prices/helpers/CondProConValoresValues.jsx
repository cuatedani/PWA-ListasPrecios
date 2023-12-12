import { CondProConValoresModel } from "../models/CondProConValoresModel";

//Equipo 2: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const CondProConValoresValues = (values) => {
  let CondProConValores = CondProConValoresModel()
  CondProConValores.valor = values.valor,
    CondProConValores.IdComparaValor = values.IdComparaValor
  return CondProConValores
}