import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: [true, "O titulo é obrigatório"]},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O Autor é obrigatório"]},
    editora: {
      type: String, 
      required: [true, "A Editora é obrigatória"]

    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de ´páginas deve estar entre 10 e 5000. Valor fornecido ({VALUE})"
      }
    }

  }


);

const livros = mongoose.model("livros", livroSchema);

export default livros;