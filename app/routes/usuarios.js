module.exports = function(application){
    application.post('/cadastrar', function(req, res){
        application.app.controllers.usuarios.cadastrar(application, req, res);
    });

    application.post('/autenticar', function(req, res){
        application.app.controllers.usuarios.autenticar(application, req, res);
    });

    application.get('/cadastro', function(req, res){
        application.app.controllers.usuarios.cadastro(application, req, res);
    });

    application.get('/login', function(req, res){
        application.app.controllers.usuarios.login(application, req, res);
    });

    application.get('/logout', function(req, res){
        application.app.controllers.usuarios.logout(application, req, res);
    });
}