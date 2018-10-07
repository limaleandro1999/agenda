require('dotenv').config();
const express = require('express'),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({extended : true}));

app.use(expressSession({
    secret: 'sdãsdasdfçasdflkãsdflsfdçlkãsdfapeokdlfkãsdlfkdçlk',
    resave : false,
    saveUninitialized : false
}));

app.use(function(req, res, next){
    if(req.path !== '/cadastro' && req.path !== '/login' && req.path !== '/cadastrar' && req.path !== '/autenticar'){
        if(req.session.email === undefined){
            res.redirect('/login');
        }else{
            next();
        }
    }else{
        next();
    }
});

consign({cwd: process.cwd()+"/app"}).
    include('app/routes')
    .then('app/controllers')
    .then('app/dao')
    .then('config/connection.js')
    .into(app);

module.exports = app;
