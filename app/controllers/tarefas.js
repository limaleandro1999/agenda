module.exports.cadastroDeTarefa = function(application, req, res){
    res.render('cadastro_tarefas', {tarefa: ''});
}

module.exports.cadastrarTarefa = function(application, req, res){
    let tarefa = req.body;
    tarefa.id_usuario = req.session.id_usuario;
    
    let TarefaDAO = new application.app.dao.tarefaDAO();
    TarefaDAO.inserirTarefa(tarefa, res);
}

module.exports.inicio = function(application, req, res){
    let TarefaDAO = new application.app.dao.tarefaDAO();
    
    TarefaDAO.getTarefas(req.session.id_usuario, req, res);
}

module.exports.editaTarefa = function(application, req, res){
    let TarefaDAO = new application.app.dao.tarefaDAO();
    let id_tarefa = req.params.id; 
    
    TarefaDAO.getTarefa(id_tarefa, res);
}

module.exports.editarTarefa = function(application, req, res){
    let tarefa = req.body;
    let TarefaDAO = new application.app.dao.tarefaDAO();

    TarefaDAO.alterarTarefa(tarefa, res);
}

module.exports.deletarTarefa = function(application, req, res){
    let id_tarefa = req.params.id;
    let TarefaDAO = new application.app.dao.tarefaDAO();

    TarefaDAO.deletarTarefa(id_tarefa, res);
}