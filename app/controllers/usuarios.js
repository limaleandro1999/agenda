module.exports.cadastrar = function(application, req, res){
    let usuario = req.body;
    
    req.assert('nome', 'O campo nome deve ser preenchido!').notEmpty();
    req.assert('email', 'O campo email deve ser preenchido!').notEmpty();
    req.assert('email', 'O email deve está no formato exemplo@email.com').isEmail();
    req.assert('senha', 'O campo senha deve ser preenchido!').notEmpty();
    req.assert('senha', 'A senha deve ter entre 6 e 16 caracteres!').len(6, 16);

    let erros = req.validationErrors();
    
    if(erros){
        res.render('cadastro', {validacao : erros});
        return;
    }

    let UsuarioDAO = new application.app.dao.usuarioDAO();

    UsuarioDAO.insertUsuario(usuario, res);
}

module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {validacao : ''});
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