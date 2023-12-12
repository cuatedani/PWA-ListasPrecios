export function CondProCondicionModel() {
    let condicion = {
        condicion: [
            {
                IdEtiqueta: { type: String },
                Etiqueta: { type: String },
                IdOpComparaValores: { type: String },
                IdOpLogicoEtiqueta: { type: String },
                Valores: [],
            }
        ],
    };
    return condicion
};