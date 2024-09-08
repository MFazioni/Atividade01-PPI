
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

// INCLUIR -------------------------------------------


// const evento = new Evento("Peça de Teatro","2024-08-20","Teatro Cesar Cava",35.00,"Peça teatral sobre os Retirantes","19:00",200);



// evento.incluir().then(() =>{
//    console.log("Evento incluído com sucesso!");
// }).catch((erro) =>{
//    console.log("Erro ao incluir o evento: " + erro);

// })


// CONSULTAR -------------------------------------------

// const evento = new Evento("Festival de Cinema", "2024-11-10", "Teatro Municipal", 20.00, "Nova descrição do evento", "19:00", 100);

// evento.consultar("Festival de Cinema")
//    .then((listaEventos) => {
//        if (listaEventos.length > 0) {
//            for (const eventoItem of listaEventos) {
//                console.log(eventoItem.toString());
//            }
//        } else {
//            console.log("Nenhum evento encontrado.");
//        }
//    })
//    .catch((erro) => {
//        console.log("Erro ao consultar os eventos: " + erro);
//    });


// ALTERAR -------------------------------------------

// const evento = new Evento("Festival de Cinema", "2024-11-05", "Teatro Cesar Cava", 20.00, "Filmes de época.", "19:00", 200);

// evento.alterar(evento)
//    .then(() => {
//        console.log("Evento atualizado com sucesso!");
//    })
//    .catch((erro) => {
//        console.log("Erro ao atualizar o evento: " + erro);
//    });


// EXCLUIR --------------------------------------

// const evento = new Evento("Peça de Teatro","2024-08-20","Teatro Cesar Cava",35.00,"Peça teatral sobre os Retirantes","19:00",200);

// evento.excluir(evento)
//    .then(() => {
//        console.log("Evento excluído com sucesso!");
//    })
//    .catch((erro) => {
//        console.log("Erro ao excluir o evento: " + erro);
//    });






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