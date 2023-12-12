export function CondicionRolesModel() {
    let cat_listas_condicion_roles = {
        cat_listas_condicion_roles: [{
            DesCondicion: { type: String },
            FechaExpiraIni: { type: Date },
            FechaExpiraFin: { type: Date },
            Condicion: { type: String },
            condicion: []
        }]
    };
    return cat_listas_condicion_roles
};