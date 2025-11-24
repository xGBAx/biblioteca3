import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cliente from "./cliente.js";
import autor from "./autor.js";
import livro from "./livro.js";
import emprestimo from "./emprestimo.js";
import multa from "./multa.js";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.log("Deu erro ao conectar com o MongoDB", error);
  }
};

connectDB();

/* --------------------- CLIENTE --------------------- */

// POST
app.post('/cliente', async (req, res) => {
  try {
    const novoCliente = await cliente.create(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ALL
app.get('/cliente', async (req, res) => {
  try {
    const clientes = await cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET POR ID
app.get('/cliente/:id', async (req, res) => {
  try {
    const c = await cliente.findById(req.params.id);
    if (!c) return res.status(404).json({ error: "Cliente não encontrado" });
    res.status(200).json(c);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT
app.put('/cliente/:id', async (req, res) => {
  try {
    const novoCliente = await cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
app.delete('/cliente/:id', async (req, res) => {
  try {
    const clienteExcluido = await cliente.findByIdAndDelete(req.params.id);
    res.status(200).json(clienteExcluido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* --------------------- AUTOR --------------------- */

app.post("/autor", async (req, res) => {
  try {
    const novoAutor = await autor.create(req.body);
    res.status(201).json(novoAutor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/autor", async (req, res) => {
  try {
    const autores = await autor.find();
    res.status(200).json(autores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET POR ID
app.get("/autor/:id", async (req, res) => {
  try {
    const a = await autor.findById(req.params.id);
    if (!a) return res.status(404).json({ error: "Autor não encontrado" });
    res.status(200).json(a);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/autor/:id", async (req, res) => {
  try {
    const autorAtualizado = await autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(autorAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/autor/:id", async (req, res) => {
  try {
    const autorExcluido = await autor.findByIdAndDelete(req.params.id);
    res.status(200).json(autorExcluido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* --------------------- LIVRO --------------------- */

app.post("/livro", async (req, res) => {
  try {
    const novoLivro = await livro.create(req.body);
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/livro", async (req, res) => {
  try {
    const livros = await livro.find();
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET POR ID
app.get("/livro/:id", async (req, res) => {
  try {
    const l = await livro.findById(req.params.id);
    if (!l) return res.status(404).json({ error: "Livro não encontrado" });
    res.status(200).json(l);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/livro/:id", async (req, res) => {
  try {
    const livroAtualizado = await livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(livroAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/livro/:id", async (req, res) => {
  try {
    const livroExcluido = await livro.findByIdAndDelete(req.params.id);
    res.status(200).json(livroExcluido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* --------------------- EMPRÉSTIMO --------------------- */

app.post("/emprestimo", async (req, res) => {
  try {
    const novoEmprestimo = await emprestimo.create(req.body);
    res.status(201).json(novoEmprestimo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/emprestimo", async (req, res) => {
  try {
    const emprestimos = await emprestimo.find();
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET POR ID
app.get("/emprestimo/:id", async (req, res) => {
  try {
    const e = await emprestimo.findById(req.params.id);
    if (!e) return res.status(404).json({ error: "Empréstimo não encontrado" });
    res.status(200).json(e);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/emprestimo/:id", async (req, res) => {
  try {
    const emprestimoAtualizado = await emprestimo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(emprestimoAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/emprestimo/:id", async (req, res) => {
  try {
    const emprestimoExcluido = await emprestimo.findByIdAndDelete(req.params.id);
    res.status(200).json(emprestimoExcluido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* --------------------- MULTA --------------------- */

app.post("/multa", async (req, res) => {
  try {
    const novaMulta = await multa.create(req.body);
    res.status(201).json(novaMulta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/multa", async (req, res) => {
  try {
    const multas = await multa.find();
    res.status(200).json(multas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET POR ID
app.get("/multa/:id", async (req, res) => {
  try {
    const m = await multa.findById(req.params.id);
    if (!m) return res.status(404).json({ error: "Multa não encontrada" });
    res.status(200).json(m);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/multa/:id", async (req, res) => {
  try {
    const multaAtualizada = await multa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(multaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/multa/:id", async (req, res) => {
  try {
    const multaExcluida = await multa.findByIdAndDelete(req.params.id);
    res.status(200).json(multaExcluida);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get('/', (req, res) => {
  res.send('API Biblioteca - OK');
});

/* --------------------- SERVER --------------------- */

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});