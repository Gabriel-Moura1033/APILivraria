import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = (req, res) => {
        autores.find((err, autores) => {       
            res.status(200).json(autores);
    })
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id;

        autores.findById(id, (err, autores) => {
            if(err) {
                res.status(400).send({message: `Autor não encontrado: ${err.message}`})
            } else {
                res.status(200).send(autores)
            }
        })

    }

    static cadastrarAutor = (req, res) => {
        let autor = new autores (req.body);
        autor.save((err) => {
            if(err) {
                res.status(500).send({message: `Falha ao cadastrar o autor: ${err.message}`})
            } else {
                res.status(201).send(autor.toJSON())
            }


        })
    }

    static atualizarAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: 'Autor atualizado com sucesso'});
            } else {
                res.status(500).send({message: `Houve um erro ao atualizar o Autor ${err.message}`});
            };
        });
    };

    static excluiAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'Autor Excluído com sucesso.'});
            } else {
                res.status(500).send({message: `Não foi possível excluir esse Autor ${err.message}`});
            };
        });



    };

};


export default AutorController;