import express from "express";
import AutorController from "../controllers/AutorController.js";

const router = express.Router();

router  
  .get("/autores", AutorController.listarAutores)
  .get("/autores/:id", AutorController.listarAutorPorId)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluiAutor);

export default router;