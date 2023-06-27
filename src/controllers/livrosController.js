import NaoEncontrado from "../erros/NaoEncontrado.js";
import {livros} from "../models/index.js";

class LivroController {

  static listarLivros =  async (req, res, next) => { 
    try{
      await livros.find()
        .populate("autor")
        .exec(
          ((erro, livros) => {       
            res.status(200).json(livros);
          })
        );
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    const id = req.params.id;

    try {
      
      const resultadoLivroId = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      if(resultadoLivroId !== null) {
        res.status(200).send(resultadoLivroId);
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }
      
    } catch (erro) {
      next(erro);
    }

  };

  static cadastrarLivro = async (req, res, next) => { 
    try{
      let livro = new livros (req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultadoUp = await livros.findByIdAndUpdate(id, {$set: req.body});
      

      if (livroResultadoUp !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }

    } catch (erro) {
      next(erro);
    }
    
  };

  static excluiLivro = async (req, res, next) => {
    const id = req.params.id;
    try {
      const resultadoLivroDel = await livros.findByIdAndDelete(id);
      
      if (resultadoLivroDel !== null) {
        res.status(200).send({message: "Livro Excluído com sucesso."});
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }

    } catch (erro) {
      next(erro);
    }

  };

  static listaLivrosEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      const resultadoEditoraLivros = await livros.find({"editora": editora}, {});
      res.status(200).send(resultadoEditoraLivros);
    } catch (erro) {
      next(erro);
    }
  };

}


export default LivroController;