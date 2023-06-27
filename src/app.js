/* eslint-disable no-unused-vars */
import  express  from "express";
import db from "../config/dbconnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de Conexão ao banco de dados"));
db.once("open", () => {
  console.log("Conectado ao banco de dados com sucesso.");
});

const app = express();
app.use(express.json());
routes(app);
app.use(manipulador404);
app.use(manipuladorDeErros);
export default app;