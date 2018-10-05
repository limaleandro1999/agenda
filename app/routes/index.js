module.exports = function(application){
    application.get('/', function(req, res){
        application.app.controllers.tarefas.inicio(application, req, res);
    });
}