const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TarefaSchema = {
    titulo: String,
    descricao: String,
    data_tarefa: Date,
    cor_da_tarefa: String,
    id_usuario: Schema.Types.ObjectId
}

const Tarefa = mongoose.model('tarefa', TarefaSchema);

module.exports = Tarefa;