import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch(erro) {
      res.status(500).json({message: "Erro interno no servidor"});
    }
  };

  static listarAutorPorId = async (req, res) => {
    const id = req.params.id;
    try{
      const autorResultado = await autores.findById(id);
      res.status(200).send(autorResultado);
    } catch(erro) {
      res.status(200).json({message: "Esse autor não existe."});
    }
     

  };

  static cadastrarAutor = async (req, res) => {
    let autor = new autores (req.body);   
    try {
      await autor.save();
      res.status(201).send(autor);
    } catch(erro) {
      res.status(500).send({message: `Houve um erro ao cadastrar o autor. ${erro.message}`});
    }   
  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;
    try{  
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (erro) {
      res.status(500).send({message: `Houve um erro ao atualizar o Autor ${erro.message}`});
    }
  };

  static excluiAutor = async (req, res) => {
    const id = req.params.id;
    try{  
      await autores.findByIdAndDelete(id, {$set: req.body});
      res.status(200).send({message: "Autor Excluído com sucesso."});
    } catch (erro) {
      res.status(500).send({message: `Não foi possível excluir esse Autor ${erro.message}`});
    }

  };

}


export default AutorController;