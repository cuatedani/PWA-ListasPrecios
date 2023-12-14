
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Import para trabajar con v1
import routeAPI from './api/v1/routes/index';
//Import para trabajar con pwa
import routerAPIPWA from './api/pwa/routes/index';

//Config para variables de entorno
import config from './config/config';

//FIC: Declaramos la variable app igualandola a express
const app = express();

//FIC: Establece la conexion a la BD
import { mongoose } from './config/database.config';

//FIC: Settings App
app.set('port', config.PORT);

//FIC: Middlewares generales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());    //para usar express en formato json
app.use(express.urlencoded({ extended: false }));

//Routes
const api = config.API_URL;

app.get(`${api}`, (req, res) => {
    res.send(
        `<h1>RESTful running in root</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})

app.get('/DrFIC', (req,res)=>{
    res.send(
        `<h1>RESTful running in DrFIC</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})

// Routes
//routeAPI(app);
routerAPIPWA(app);//Cambiar según se desee trabajar con v1 o pwa

// Export App
export default app;