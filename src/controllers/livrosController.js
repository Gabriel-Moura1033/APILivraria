import livros from "../models/Livro.js";

class LivroController {

  static listarLivros =  async (req, res) => { 
    try{
      await livros.find()
        .populate("autor")
        .exec(
          ((erro, livros) => {       
            res.status(200).json(livros);
          })
        );
    } catch (erro) {
      res.status(500).json({message: `Ocorreu um erro na busca: ${erro.message}`});
    }
  };

  static listarLivroPorId = async (req, res) => {
    const id = req.params.id;

    try {
      
      const resultadoLivroId = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).send(resultadoLivroId);
      


    } catch (erro) {
      res.status(400).send({message: `Livro não encontrado: ${erro.message}`});
    }

  };

  static cadastrarLivro = async (req, res) => { 
    try{
      let livro = new livros (req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (erro) {
      res.status(500).send({message: `Falha ao cadastrar o livro: ${erro.message}`});
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualizado com sucesso"});


    } catch (erro) {
      res.status(500).send({message: `Houve um erro ao atualizar o Livro ${erro.message}`});
    }
    
  };

  static excluiLivro = async (req, res) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro Excluído com sucesso."});

    } catch (erro) {
      res.status(404).send({message: `Não foi possível excluir esse livro ${erro.message}`});
    }

  };

  static listaLivrosEditora = async (req, res) => {
    const editora = req.query.editora;
    try {
      const resultadoEditoraLivros = await livros.find({"editora": editora}, {});
      res.status(200).send(resultadoEditoraLivros);
    } catch (erro) {
      res.status(400).send({message: "Editora não encontrada"});
    }
  };

}


export default LivroController;