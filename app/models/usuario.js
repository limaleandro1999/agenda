const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nome: String,
    email: {
        type: String,
        unique: true
    },
    senha: String,
});

const Usuario = mongoose.model('usuario', UsuarioSchema);

module.exports = Usuario;