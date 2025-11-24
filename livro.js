import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    titulo: String,
    autorId: String,   // pode usar String simples
    anoPublicacao: Number,
    genero: String,
    isbn: String,
    quantidade: Number
});

export default mongoose.model('livro', livroSchema);

