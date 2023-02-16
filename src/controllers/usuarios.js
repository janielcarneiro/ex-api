const mysql = require('../../mysql');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.user_get = (req, res, next)=>{

    const query = 'SELECT * FROM `Usuarios`';
    mysql.execute(query, (err, results, fields) => {
        res.json(results)
    }
)}

exports.user_home = (req, res, next) => {
    res.status(200).send({
        nome: req.user.nome,
        email: req.user.email,
    })
}

exports.register = (req, res, next)=>{

    let query = 'SELECT * FROM `Usuarios` WHERE email = ?';
    let query2 = 'INSERT INTO `Usuarios` (nome, email, senha) VALUES (?, ?, ?)';
    //fazer verificação se não tem email repetido
    mysql.execute(query, [req.body.email], (err, results, fields) => {
        if(err){
            return res.status(500).send({err: err})
        }
        if(results.length > 0){
            res.status(409).send({mensagem: 'Usuario já existeste'})
        }else{
            bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) =>{
                if(errBcrypt)
                    return res.status(500).send({error: errBcrypt})
                mysql.execute(query2, [req.body.nome, req.body.email, hash],
                (error, results) => {
                    if(error)
                        return res.status(500).send({error: error});
                    resposta = {
                        mensagem: "Usuario cadastrado com sucesso",
                        usuarioCriado: {
                            id: results.insertId,
                            nome: req.body.nome,
                            email: req.body.email,
                            senha: hash,
                        }
                    }

                    return res.status(201).send(resposta);
                }
                )
            })
        }
          
    })
}

exports.login = (req, res, next) => {
    let query = 'SELECT * FROM `Usuarios` WHERE email = ?';

    mysql.execute(query, [req.body.email], (error, results, fields)=> {
        if(error)
            return res.status(500).send({error: error});
        if(results.length < 1)
            return res.status(401).send({mensagem: 'Usuario não cadastrado'})
        //compara a senha com hash gerado
        bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
            if(err)
                return res.status(401).send({mensagem: "Falha na autenticação"})
            if(result){
                //configurar o token
                const token = jwt.sign({
                    id: results[0].id, 
                    nome: results[0].nome,
                    email: results[0].email,
                }, 'secret', {expiresIn: '10d'})

                return res.status(200).send({
                    user: {
                        id: results[0].id,
                        nome: results[0].nome,
                        email: results[0].email,
                        mensagem: "autenticado com sucesso",
                        token: token
                    },
                })
            }
            res.status(401).send({mensagem: "Falha na autenticação"})
        })
    })

};

exports.not = (req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
}