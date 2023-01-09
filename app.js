const express = require("express");
const app = express();
//aparece todas as requisiçoẽs no terminal
const morgan = require('morgan');
//trabalhar com requisição no corpo da requisição
const bodyParser = require('body-parser');


//TODOS OS MODULOS QUE SERÃO UTILIZADOS
app.use(morgan("dev"));
//apenas dados simples
app.use(bodyParser.urlencoded({extended: false}));
//aceitar formato json de entrada
app.use(bodyParser.json());


//APLICAR RESTRIÇÃO PARA QUEM VAI ACESSAR A API
app.use((req, res, next) =>{
    //servidores que vão ser aceito
    res.header('Access-Control-Allow-Origin', '*');
    //os tipos de cabeçalho aceito
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    //os metodos que vão poder ser retornado
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({})
    }

    next();
})

//AQUE VAI FICAR TODAS AS ROTAS
app.get("/auth/login", (req, res, next) => {
    res.send("<h1>OK Vamos fazer Login AKI</h1>")
});

app.get("/", (req, res) =>{
    res.send("Olá sou seu aplicativo EX");
});



//QUANDO NÃO ENCONTRAR NENHUMA ROTA EXISTENTE
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
})

module.exports = app;