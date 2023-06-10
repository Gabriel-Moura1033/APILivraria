import  express  from "express";
import db from "../config/dbconnect.js";
import livros from "./models/Livro.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, 'Erro de Conexão ao banco de dados'));
db.once("open", () => {
    console.log('Conectado ao banco de dados com sucesso.')
});

const app = express();
app.use(express.json());
routes(app);
export default app;