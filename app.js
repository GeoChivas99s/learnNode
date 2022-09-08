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

app.get("/", (req, res) => {
  Blog.find({})
    .then((article) => {
      res.json({
        data: article,
        error: false,
        totalElements: article?.length,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err,
      });
    });
});

app.post("/cadastrar", (req, res) => {
  console.log(req.body);
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

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080: ");
});
