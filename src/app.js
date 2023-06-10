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

app.post('/livros', (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso.");  
})

app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(201).send(`O título do livro ${req.params.id} foi atualizado.`)
})



export default app;