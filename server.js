const app = require("./src/config/custom-express");

//3000 porta
app.listen(3000, function() {
    console.log("servidor rodando na porta 3000");
}); //vai ser executado sempre que o servidor for iniciado

