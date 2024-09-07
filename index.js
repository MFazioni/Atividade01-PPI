
import express from 'express';
import autenticar from './seguranca/autenticar.js';
import { verificarAutenticacao, sair } from './seguranca/autenticar.js';
import session from 'express-session';
import Evento from './Modelo/Evento.js';
import EventoDAO from './DAO/EventoDAO.js';


const host = '0.0.0.0';
const porta = 3000;
const app = express();

//-----------------------------------------------------------------------------------------------------------------------------------------------------------//

const evento = new Evento("Festival de Cinema","2024-11-09","Sesc",14.00,"Uma seleção de filmes nacionais.","18:00",80);


//evento.incluir().then(() =>{
    console.log("Evento incluído com sucesso!");
//}).catch((erro) =>{
//    console.log("Erro ao incluir o evento: " + erro);

//})



evento.consultar("Festival de Cinema").then((listaEventos)=>{
    for (const evento of listaEventos){
        console.log(evento.toString());

    }
}).catch((erro) =>{
    console.log("Erro ao consultar os eventos: " + erro);

});



//-----------------------------------------------------------------------------------------------------------------------------------------------------------//

app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'segredo',
    resave: true,
    saveUninitialized: true,
    cookie: {  
        maxAge: 1000 * 60 * 15
    }
}));

app.get('/detalhesrock', (requisicao, resposta) => {
    resposta.sendFile(__dirname + '/publico/privado/detalhesrock.html');
});


app.use(express.static('./publico'));

app.get('/login',(requisicao, resposta) => {
    resposta.redirect('/login.html');
});

app.get('/logout', sair);

app.post('/login', autenticar);

app.use(verificarAutenticacao, express.static('./privado'));



app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});