module.exports = function(application){
    application.get('/form_adicionar_tarefa', function(req, res){
        application.app.controllers.tarefas.cadastroDeTarefa(application, req, res);
    });

    application.post('/cadastrar_tarefa', function(req, res){
        application.app.controllers.tarefas.cadastrarTarefa(application, req, res);
    });

    application.get('/form_editar_tarefa/:id', function(req, res){
        application.app.controllers.tarefas.editaTarefa(application, req, res);
    });

    application.post('/editar_tarefa', function(req, res){
        application.app.controllers.tarefas.editarTarefa(application, req, res);
    });

    application.get('/deletar_tarefa/:id', function(req, res){
        application.app.controllers.tarefas.deletarTarefa(application, req, res);
    });
}