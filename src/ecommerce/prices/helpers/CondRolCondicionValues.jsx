import { CondRolCondicionModel } from "../models/CondRolCondicionModel";

//Equipo 2: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const CondRolCondicionValues = (values) => {
  let CondRolCondicion = CondRolCondicionModel()
  CondRolCondicion.IdTipoCondicionOK = values.IdTipoCondicionOK,
    CondRolCondicion.IdTipoOperadorOK = values.IdTipoOperadorOK,
    CondRolCondicion.Valor = values.Valor,
    CondRolCondicion.Secuecia = values.Secuecia
  return CondRolCondicion
}