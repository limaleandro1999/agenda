const crypto = require('crypto');
const Usuario = require('../models/usuario');

function UsuarioDAO(){

}

UsuarioDAO.prototype.insertUsuario = function(usuario, req, res){
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
            Usuario.findOne({email : usuario.email}, function(err, results){
                req.session.usuario = results.nome;
                req.session.email = results.email;
                req.session.id_usuario = results._id;
                res.redirect('/');
            });
        }
    });
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
    let senhaCriptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
    usuario.senha = senhaCriptografada;

    Usuario.findOne(usuario, function(err, results){
        if(results){
            req.session.usuario = results.nome;
            req.session.email = results.email;
            req.session.id_usuario = results._id;
            
            res.redirect('/');
        }else{
            res.redirect('/login');
        }
    });
}

module.exports = function(){
    return UsuarioDAO;
}