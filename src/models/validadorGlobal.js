import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => {
    return valor !== "";
  },
  message: ({ path }) => `O campo ${path} foi informado em branco`
});