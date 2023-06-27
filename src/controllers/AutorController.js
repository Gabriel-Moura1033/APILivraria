//import mongoose from "mongoose";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

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
        next(new NaoEncontrado("Esse autor não existe no banco de dados."));
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
      const autorResultadoUp = await autores.findByIdAndUpdate(id, {$set: req.body});
      
      if(autorResultadoUp !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluiAutor = async (req, res, next) => {
    const id = req.params.id;
    try{  
      const autorResultadoDel = await autores.findByIdAndDelete(id, {$set: req.body});
    
      if (autorResultadoDel !== null) {
        res.status(200).send({message: "Autor Excluído com sucesso."});
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));
      }

    } catch (erro) {
      next(erro);
    }

  };

}


export default AutorController;