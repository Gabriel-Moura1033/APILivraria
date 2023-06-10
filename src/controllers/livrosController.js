import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = (req, res) => {
        livros.find()
        .populate('autor')
        .exec(
            ((err, livros) => {       
                res.status(200).json(livros);
        })
    )
}

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;
        console.log(id)
        livros.findById(id)
            .populate('autor', 'nome')
            .exec(
                ((err, livros) => {
                if(err) {
                    res.status(400).send({message: `Livro não encontrado: ${err.message}`})
                } else {
                    res.status(900).send(livros)
                }
            }));
            

    };

    static cadastrarLivro = (req, res) => {
        let livro = new livros (req.body);
        livro.save((err) => {
            if(err) {
                res.status(500).send({message: `Falha ao cadastrar o livro: ${err.message}`})
            } else {
                res.status(201).send(livro.toJSON())
            }


        })
    }

    static atualizarLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: 'Livro atualizado com sucesso'});
            } else {
                res.status(500).send({message: `Houve um erro ao atualizar o Livro ${err.message}`});
            };
        });
    };

    static excluiLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'Livro Excluído com sucesso.'});
            } else {
                res.status(500).send({message: `Não foi possível excluir esse livro ${err.message}`});
            };
        });



    };

    static listaLivrosEditora = (req, res) => {
        const editora = req.query.editora;

        livros.find({'editora': editora}, {}, (err, livros) => {
            if(err) {
                res.status(400).send({message: 'Editora não encontrada'})
            } else {
                res.status(200).send(livros);
            };
        });
    };

};


export default LivroController;