import { CondicionProductoModel } from "../models/CondicionProductoModel";

//Equipo 2: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const CondicionProductoValues = (values) => {
  const CondicionProducto = { ...CondicionProductoModel };
  CondicionProducto.DesPromo = values.DesPromo,
    CondicionProducto.IdTipoPromoOK = values.IdTipoPromoOK,
    CondicionProducto.Formula = values.Formula
  return CondicionProducto;
};
