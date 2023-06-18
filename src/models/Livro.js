import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: [true, "O titulo é obrigatório"]},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O Autor é obrigatório"]},
    editora: {type: String, required: [true, "A Editora é obrigatória"]},
    numeroPaginas: {type: Number}

  }


);

const livros = mongoose.model("livros", livroSchema);

export default livros;