module.exports.cadastrar = function(application, req, res){
    let usuario = req.body;

    let UsuarioDAO = new application.app.dao.usuarioDAO();

    UsuarioDAO.insertUsuario(usuario, res);
}

module.exports.cadastro = function(application, req, res){
    res.render('cadastro');
}

module.exports.login = function(application, req, res){
    res.render('login');
}

module.exports.autenticar = function(application, req, res){
    let usuario = req.body;

    let UsuarioDAO = new application.app.dao.usuarioDAO();

    UsuarioDAO.autenticar(usuario, req, res);
}

module.exports.logout = function(application, req, res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/login');
        }
    })
}