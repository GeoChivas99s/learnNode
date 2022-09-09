const express = require("express");
const { default: mongoose } = require("mongoose");
const monngoose = require("mongoose");
const { ignore } = require("nodemon/lib/rules");

const app = express();
app.use(express.json());

require("./models/Artigo");

const Blog = mongoose.model("Blog");

monngoose
  .connect("mongodb://localhost:27017/LearnDataBase", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Conexão feita com sucesso!!!");
  })
  .catch(() => {
    console.log("Conexão feita com erro!!!");
  });

app.get("/listar", (req, res) => {
  Blog.find({})
    .then((article) => {
      res.status(200).json({
        data: article,
        error: false,
        totalElements: article?.length,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: true,
        message: err,
      });
    });
});

app.get("/listar/:id", (req, res) => {
  Blog.findById({ _id: req.params.id })
    .then((article) => {
      res.status(200).json({
        data: article,
        error: false,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: true,
        message: err,
      });
    });
});

app.delete("/delete/:id", (req, res) => {
  Blog.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: "Problema ao eliminar o usuário!!!",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Eliminado com sucesso !!!",
    });
  });
});

app.post("/cadastrar", (req, res) => {
  Blog.create(req.body, (err) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: "Erro ao cadastrar um article",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Cadastrado com Sucesso!!!!",
    });
  });
});

app.put("/editar/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, { ...req.body }, (err) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: "Erro ao actualizar um article",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Actualizado com Sucesso!!!!",
    });
  });
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080: ");
});
