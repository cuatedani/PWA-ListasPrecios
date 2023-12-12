import {  PresentaPreciosModel } from "../models/PresentaPreciosModel";

//Equipo 2: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const PresentaPreciosValues = (values)=>{
  let PresentaPrecios =  PresentaPreciosModel()
  PresentaPrecios.IdProdServOK=values.IdProdServOK,
  PresentaPrecios.IdPresentaBK=values.IdPresentaBK,
  PresentaPrecios.IdTipoFormulaOK=values.IdTipoFormulaOK,
  PresentaPrecios.Formula=values.Formula,
  PresentaPrecios.Precio=values.Precio
  return PresentaPrecios
}