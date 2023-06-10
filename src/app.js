import  express  from "express";

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id)
}

const app = express();

app.use(express.json());

const livros = [
    {
        "id": 1,
        "titulo": "Senhor dos aneis"
    },
    {
        "id": 2,
        "titulo": "O Hobbit"
    }
];

app.get('/', (req, res) => {
    res.status(200).send('API Node JS');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);  
    res.status(200).json(livros[index]);
})

app.post('/livros', (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso.");  
})

app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(201).send(`O título do livro ${req.params.id} foi atualizado.`)
})

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1); // não é excluido em lote.
    res.status(201).send(`O livro ${id} foi removido com sucesso.`)
})



export default app;