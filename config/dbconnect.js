import mongoose from "mongoose";

mongoose.connect("Alimentar com URI de conexão do Atlas pro MongoDB")

let db = mongoose.connection;

export default db;
//