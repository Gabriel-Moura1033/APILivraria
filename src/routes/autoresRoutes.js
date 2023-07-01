import express from "express";
import AutorController from "../controllers/AutorController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router  
  .get("/autores", AutorController.listarAutores, paginar)
  .get("/autores/:id", AutorController.listarAutorPorId)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluiAutor);

export default router;