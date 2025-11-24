import mongoose from "mongoose";

const multaSchema = new mongoose.Schema({
    clienteId: String,
    valor: Number,
    motivo: String,
    data: String
});

export default mongoose.model('multa', multaSchema);
