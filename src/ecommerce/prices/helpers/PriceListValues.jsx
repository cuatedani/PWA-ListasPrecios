import {  PriceListModel } from "../models/PriceListModel";

//Equipo 2: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const PriceListValues = (values)=>{
  let PriceList =  PriceListModel()
  PriceList.IdInstitutoOK=values.IdInstitutoOK,
  PriceList.IdListaOK=values.IdListaOK,
  PriceList.IdListaBK=values.IdListaBK,
  PriceList.DesLista=values.DesLista,
  PriceList.FechaExpiraIni=values.FechaExpiraIni,
  PriceList.FechaExpiraFin=values.FechaExpiraFin,
  PriceList.IdTipoListaOK=values.IdTipoListaOK,
  PriceList.IdTipoGeneraListaOK=values.IdTipoGeneraListaOK,
  PriceList.IdListaBaseOK=values.IdListaBaseOK,
  PriceList.IdTipoFormulaOK=values.IdTipoFormulaOK
  return PriceList
}