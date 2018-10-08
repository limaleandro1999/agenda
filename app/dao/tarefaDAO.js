const Tarefa = require('../models/tarefa');
const ObjectId = require('mongodb').ObjectId;

function TarefaDAO(){

}

TarefaDAO.prototype.inserirTarefa = function(tarefa, res){

    let novaTarefa = new Tarefa({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        data_tarefa: tarefa.data_tarefa,
        cor_da_tarefa: tarefa.cor_da_tarefa,
        id_usuario: ObjectId(tarefa.id_usuario)
    });

    novaTarefa.save(function(err, result){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
}

TarefaDAO.prototype.getTarefas = function(id_usuario, data_tarefa, req, res){
    let mes = data_tarefa.getMonth() + 1;
    let ano = data_tarefa.getFullYear();
    
    Tarefa.aggregate([
        {
            $match : {
                data_tarefa: {
                    $gte: new Date(ano + '-'+ mes +'-1'),
                    $lt: new Date(ano + '-'+ mes +'-31')
                },
                id_usuario: ObjectId(id_usuario)
            }
        },
        {
            $sort: {
                data_tarefa: -1
            }
        },
        {
            $group: {
                _id: {
                    data_tarefa: '$data_tarefa'
                },
                quantidade_de_tarefas: {
                    $sum: 1
                },
                tarefas: {
                    $push: {
                        id_tarefa: '$_id',
                        titulo: '$titulo',
                        descricao: '$descricao',
                        data_tarefa: '$data_tarefa',
                        cor_da_tarefa: '$cor_da_tarefa'
                    }
                }
            }
        }       
    ])
    .exec(function(err, result){
        if(err){
            console.log(err);
        }else{
            res.render('index', {tarefas: result, session : req.session});
        }
    });
}

TarefaDAO.prototype.getTarefa = function(id_tarefa, res){
    Tarefa.findById(ObjectId(id_tarefa), function(err, result){
        if(err){
            console.log(err);
        }else{
            res.render('cadastro_tarefas', {tarefa: result});
        }
    });
}

TarefaDAO.prototype.alterarTarefa = function(tarefa, res){
    Tarefa.update({_id : ObjectId(tarefa.id_tarefa)}, tarefa, function(err, raw){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
}

TarefaDAO.prototype.deletarTarefa = function(id_tarefa, res){
    Tarefa.deleteOne({_id : ObjectId(id_tarefa)}, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
}

module.exports = function(){
    return TarefaDAO;
}