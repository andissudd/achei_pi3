"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send("<H1> Portfolio</H1> \n    <h3>Autores: Francisco Anderson e Let\u00EDcia Maciel</h3> \n    <p>Objetivo: Desenvolver uma aplica\u00E7\u00E3o web respons\u00E1vel por gerenciar usu\u00E1rios, \n    utilizando Node.js, Express e TypeScript. A aplica\u00E7\u00E3o deve permitir a cria\u00E7\u00E3o, \n    leitura, atualiza\u00E7\u00E3o e remo\u00E7\u00E3o (CRUD) de usu\u00E1rios, al\u00E9m de fornecer p\u00E1ginas para adicionar e editar usu\u00E1rios.</p>");
});
//Start server
var port = 8000;
app.listen(port, function () {
    console.log("Servidor do portfolio esperando reqs: https://localhost/".concat(port));
});
