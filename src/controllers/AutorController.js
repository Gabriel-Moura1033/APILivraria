//import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch(erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    const id = req.params.id;
    try{
      const autorResultado = await autores.findById(id);
      if(autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({message: "Esse autor não existe."});
      }
    } catch(erro) {
      next(erro);
    }
     

  };

  static cadastrarAutor = async (req, res, next) => {
    let autor = new autores (req.body);   
    try {
      await autor.save();
      res.status(201).send(autor);
    } catch(erro) {
      
      next(erro);
       
    }   
  };

  static atualizarAutor = async (req, res, next) => {
    const id = req.params.id;
    try{  
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (erro) {
      next(erro);
    }
  };

  static excluiAutor = async (req, res, next) => {
    const id = req.params.id;
    try{  
      await autores.findByIdAndDelete(id, {$set: req.body});
      res.status(200).send({message: "Autor Excluído com sucesso."});
    } catch (erro) {
      next(erro);
    }

  };

}


export default AutorController;