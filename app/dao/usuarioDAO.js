const crypto = require('crypto');
const Usuario = require('../models/usuario');

function UsuarioDAO(){

}

UsuarioDAO.prototype.insertUsuario = function(usuario, res){
    let senhaCriptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');

    let novoUsuario = new Usuario({
        nome: usuario.nome,
        email: usuario.email,
        senha: senhaCriptografada
    });

    novoUsuario.save(function(err){
        if(err){
            console.log(err.message);
        }else{
            res.redirect('/');
        }
    });
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
    let senhaCriptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
    usuario.senha = senhaCriptografada;

    Usuario.find(usuario, function(err, results){
        if(results.length > 0){
            req.session.usuario = results[0].nome;
            req.session.email = results[0].email;
            req.session.id_usuario = results[0]._id;
            
            res.redirect('/');
        }else{
            res.redirect('/login');
        }
    });
}

module.exports = function(){
    return UsuarioDAO;
}