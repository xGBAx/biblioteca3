import mongoose from "mongoose";

const emprestimoSchema = new mongoose.Schema({
    usuarioId: String,
    livroId: String,
    dataEmprestimo: String,
    dataDevolucao: String,
    devolvido: Boolean
});

export default mongoose.model('emprestimo', emprestimoSchema);
