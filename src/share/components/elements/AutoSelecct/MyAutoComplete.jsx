import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
export default function MyAutoComplete({
  label,
  options,
  displayProp,
  idProp,
  onSelectValue,
  disabled = false,
}) {
  const [selection, setSelection] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  //Sirve para seleccionar una opción
  const handleValueChange = (newValue) => {
    setSelection(newValue);
    onSelectValue(newValue);
  };
  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        disabled={disabled}
        value={selection}
        onChange={(e, newValue) => {
          handleValueChange(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="MyAutoCompleteKey"
        options={options}
        getOptionLabel={(option) => option[displayProp]} // Mostrar la propiedad deseada

        renderInput={(params) => (
          <TextField {...params} label={label} fullWidth /> // Establece el ancho del TextField
        )}
      />
    </div>
  );
}