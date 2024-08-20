
import express from 'express';
import autenticar from './seguranca/autenticar.js';
import { verificarAutenticacao, sair } from './seguranca/autenticar.js';
import session from 'express-session';

const host = '0.0.0.0';
const porta = 3000;
const app = express();


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