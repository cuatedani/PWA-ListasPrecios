import {  InstituteModel } from "../models/institutesModels";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const InstituteValues = (values)=>{
  let Institute =  InstituteModel()
  Institute.IdInstitutoOK=values.IdInstitutoOK,
  Institute.IdInstitutoBK=values.IdInstitutoBK,
  Institute.DesInstituto=values.DesInstituto,
  Institute.Alias=values.Alias,
  Institute.Matriz=values.Matriz,
  Institute.IdTipoGiroOK=values.IdTipoGiroOK,
  Institute.IdInstitutoSupOK=values.IdInstitutoSupOK
  return Institute
}