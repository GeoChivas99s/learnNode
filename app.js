const express = require("express");

const app = express();

app.use(express.json())

app.get("/", (req, res) => {

 console.log(req.body)  
 return  res.json({
    error: false,
    message: "Hello World !! "
  });
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080: ");
});
