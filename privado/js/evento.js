
const formEvento = document.getElementById('formEvento');

formEvento.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:3000/eventos';
buscarTodosEventos();

var motivoAcao = "CADASTRAR";

function gravarEvento(){
    const objetoEvento = {
        nome: document.getElementById('nome').value,
        data: document.getElementById('data').value,
        local: document.getElementById('local').value,
        preco: document.getElementById('preco').value,
        descricao: document.getElementById('descricao').value,
        horario: document.getElementById('horario').value,
        ingressos: document.getElementById('ingressos').value
    }

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });

}


function selecionarEvento(id, nome, data, local, preco, descricao, horario, ingressos, motivo) {
    document.getElementById('nome').value = nome;
    document.getElementById('data').value = data;
    document.getElementById('local').value = local;
    document.getElementById('preco').value = preco;
    document.getElementById('descricao').value = descricao;
    document.getElementById('horario').value = horario;
    document.getElementById('ingressos').value = ingressos;

    motivoAcao = motivo;
    const botaoConfirmacao = document.getElementById('botaoConfirmacao');
    botaoConfirmacao.innerHTML = motivoAcao === 'EDITAR' ? 'EDITAR' : 'EXCLUIR';
    
    // Armazene o ID do evento para uso nas funções de atualizar e excluir
    document.getElementById('eventoId').value = id; // Supondo que você tenha um input oculto para armazenar o ID
}

function excluirEvento(){
    const idEvento = document.getElementById('eventoId').value; // Obtenha o ID do evento

    fetch(`${enderecoAPI}/${idEvento}`, { // Supondo que sua API aceita o ID na URL
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        exibirMensagem(respostaAPI.mensagem, respostaAPI.status ? 'green' : 'red');
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}


function atualizarEvento(){
    const objetoEvento = {
        id: document.getElementById('eventoId').value, // Inclua o ID no objeto
        nome: document.getElementById('nome').value,
        data: document.getElementById('data').value,
        local: document.getElementById('local').value,
        preco: document.getElementById('preco').value,
        descricao: document.getElementById('descricao').value,
        horario: document.getElementById('horario').value,
        ingressos: document.getElementById('ingressos').value
    };

    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        exibirMensagem(respostaAPI.mensagem, respostaAPI.status ? 'green' : 'red');
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}


function buscarTodosEventos() {
    fetch(enderecoAPI, { method: 'GET' })
        .then((resposta) => {
            return resposta.json();
        })
        .then((respostaAPI) => {
            console.log(respostaAPI); // Adicione este log
            // Verifica se respostaAPI e listaEvento são válidos
            if (respostaAPI.status === true && Array.isArray(respostaAPI.listaEvento)) {
                exibirTabelaEvento(respostaAPI.listaEvento);
            } else {
                exibirMensagem('Nenhum evento encontrado.', 'red');
            }
        })
        .catch((erro) => {
            exibirMensagem(erro, '#D2691E');
        });
}





function validarCampos(evento) {
    evento.preventDefault(); // Impede o envio do formulário

    const form = document.getElementById('formEvento');
    form.classList.add('was-validated'); // Adiciona a classe de validação

    const nome = document.getElementById('nome');
    const data = document.getElementById('data');
    const local = document.getElementById('local');
    const preco = document.getElementById('preco');
    const descricao = document.getElementById('descricao');
    const horario = document.getElementById('horario');
    const ingressos = document.getElementById('ingressos');

    if (nome.value && data.value && local.value && preco.value && descricao.value && horario.value && ingressos.value) {
        if (motivoAcao === "CADASTRAR") {
            gravarEvento();
        } else if (motivoAcao === "EDITAR") {
            atualizarEvento();
            motivoAcao = "CADASTRAR";
        } else if (motivoAcao === "EXCLUIR") {
            excluirEvento();
            motivoAcao = "CADASTRAR";
        }

        form.reset(); 
        buscarTodosEventos();
    }
}



function exibirMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style='color: " + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}


function exibirTabelaEvento(listaEventos) {
    const espacoTabela = document.getElementById('containerTabela');

    // Limpa a tabela anterior se existir
    espacoTabela.innerHTML = "";

    // Verifica se a lista de eventos é válida
    if (Array.isArray(listaEventos) && listaEventos.length > 0) {
        const tabela = document.createElement('table');
        tabela.classList = "table table-striped table-hover"; // Classe do Bootstrap para tabela

        // Cabeçalho da tabela
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>NOME</th>
                <th>DATA</th>
                <th>LOCAL</th>
                <th>PREÇO</th>
                <th>DESCRIÇÃO</th>
                <th>HORÁRIO</th>
                <th>INGRESSOS</th>
                <th>AÇÃO</th>
            </tr>
        `;
        
        // Corpo da tabela
        const corpo = document.createElement('tbody');
        for (const evento of listaEventos) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${evento.nome}</td>
                <td>${evento.data}</td>
                <td>${evento.local}</td>
                <td>${evento.preco}</td>
                <td>${evento.descricao}</td>
                <td>${evento.horario}</td>
                <td>${evento.ingressos}</td>
                <td>
                    <button class="btn btn-warning" onclick="selecionarEvento('${evento.nome}','${evento.data}','${evento.local}','${evento.preco}','${evento.descricao}','${evento.horario}','${evento.ingressos}','EDITAR')">Alterar</button>
                    <button class="btn btn-danger" onclick="selecionarEvento('${evento.nome}','${evento.data}','${evento.local}','${evento.preco}','${evento.descricao}','${evento.horario}','${evento.ingressos}','EXCLUIR')">Excluir</button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        
        // Adiciona a tabela à div que você já tem no HTML
        espacoTabela.appendChild(tabela);
    } else {
        exibirMensagem('Nenhum evento encontrado.', 'red');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    buscarTodosEventos(); // Chama a função ao carregar a página
});

console.log('Eventos encontrados:', eventos);

