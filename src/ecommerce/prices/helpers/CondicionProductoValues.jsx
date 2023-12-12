import { CondicionProductoModel } from "../models/CondicionProductoModel";

//Equipo 2: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const CondicionProductoValues = (values) => {
  let CondicionProducto = CondicionProductoModel()
  CondiconProducto.DesPromo = values.DesPromo,
    CondiconProducto.IdTipoPromoOK = values.IdTipoPromoOK,
    CondiconProducto.Formula = values.Formula
  return CondicionProducto
}