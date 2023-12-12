import { CondicionRolesModel } from "../models/CondicionRolesModel";

//Equipo 2: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const CondicionRolesValues = (values) => {
  let CondicionRoles = CondicionRolesModel()
  CondicionRoles.DesCondicion = values.DesCondicion,
    CondicionRoles.FechaExpiraIni = values.FechaExpiraIni,
    CondicionRoles.FechaExpiraFin = values.FechaExpiraFin,
    CondicionRoles.Formula = values.Formula,
    CondicionRoles.Condicion = values.Condicion
  return CondicionRoles
}