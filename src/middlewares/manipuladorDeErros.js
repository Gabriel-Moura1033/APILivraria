/* eslint-disable no-unused-vars */
import mongoose, { mongo } from "mongoose";
import erroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/requisicaoincorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
function manipuladorDeErros (erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof NaoEncontrado) {
    erro.enviarResposta(res);
  } else {
    new erroBase().enviarResposta();
  } 
} 
export default manipuladorDeErros;