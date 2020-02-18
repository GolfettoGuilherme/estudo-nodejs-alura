require("marko/node-require").install();
require("marko/express");


const express = require("express"); //modulo node necesario para rodar um servidor
const app = express();
const bodyParser = require('body-parser');
//aqui é tipo um middleware (ou startup.cs)


//habilitar o body parser a receber objetos complexos nas rotas
app.use(bodyParser.urlencoded({
    extended: true
}));

const rotas = require("../app/rotas/rotas");

rotas(app);

module.exports = app; //dizendo pro node que o modulo vai exportar alguma coisa