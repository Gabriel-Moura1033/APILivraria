import erroBase from "./erroBase.js";

class NaoEncontrado extends erroBase {
  constructor(message = "O Endpoint informado não existe") {
    super(message, 404);
  }
}

export default NaoEncontrado;