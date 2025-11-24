import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    nome: String,
    nacionalidade: String
});

export default mongoose.model('autor', autorSchema);
