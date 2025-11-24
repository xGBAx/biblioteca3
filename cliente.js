import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    matricula: String
});

export default mongoose.model('cliente', clienteSchema);