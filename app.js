const express = require("express");
const app = express();
//aparece todas as requisiçoẽs no terminal
const morgan = require('morgan');
//trabalhar com requisição no corpo da requisição
const bodyParser = require('body-parser');
//aceitar conexão externar
const cors = require("cors");

const login = require('./src/middleware/login');
const user = require('./src/controllers/usuarios')
const restricao = require('./src/middleware/restricao_api')

//aceitar conexão externar
app.use(cors());
app.use(express.json());

//TODOS OS MODULOS QUE SERÃO UTILIZADOS
app.use(morgan("dev"));
//apenas dados simples
app.use(bodyParser.urlencoded({extended: false}));
//aceitar formato json de entrada
app.use(bodyParser.json());


//APLICAR RESTRIÇÃO PARA QUEM VAI ACESSAR A API
app.use(restricao.restricao)

//AQUE VAI FICAR TODAS AS ROTAS
app.post("/user/login",user.login)

//para se cadastrar
app.post("/user/cadastro",user.register)

//AQUE VAMOS FAZER A ROTA HOME PRIVADA
app.get("/", login.obrigatorio, user.user_home);

//RETORNAR TODOS OS USUARIOS
app.get("/user/", user.user_get);

//QUANDO NÃO ENCONTRAR NENHUMA ROTA EXISTENTE
app.use(user.not);

module.exports = app;