import {  CondProCondicionModel } from "../models/CondProCondicionModel";

//Equipo 2: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const CondProCondicionValues = (values)=>{
  let CondProCondicion =  CondProCondicionModel()
  CondProCondicion.IdEtiqueta=values.IdEtiqueta,
  CondProCondicion.Etiqueta=values.Etiqueta,
  CondProCondicion.IdOpComparaValores=values.IdOpComparaValores,
  CondProCondicion.IdOpLogicoEtiqueta=values.IdOpLogicoEtiqueta
  return CondProCondicion
}