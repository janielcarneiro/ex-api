
exports.restricao = (req, res, next) =>{
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
}