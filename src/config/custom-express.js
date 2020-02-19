require("marko/node-require").install();
require("marko/express");


const express = require("express"); //modulo node necesario para rodar um servidor
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));
//aqui é tipo um middleware (ou startup.cs)

//middleware neccessario para usar arquivos estaticos
app.use('/estatico', express.static('src/app/public'));

//habilitar o body parser a receber objetos complexos nas rotas
app.use(bodyParser.urlencoded({
    extended: true
}));

const rotas = require("../app/rotas/rotas");

rotas(app);

module.exports = app; //dizendo pro node que o modulo vai exportar alguma coisa