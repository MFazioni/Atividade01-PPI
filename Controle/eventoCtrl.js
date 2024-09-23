import EventoDAO from "../DAO/EventoDAO.js";
import Evento from "../Modelo/Evento.js";

export default class EventoCtrl {

    gravar (requisicao, resposta) {
        if (requisicao.method == "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            const data = dados.data;
            const local = dados.local;
            const preco = dados.preco;
            const descricao = dados.descricao;
            const horario = dados.horario;
            const ingressos = dados.ingressos;

            if (nome && data && local && preco && descricao && horario && ingressos){
                const evento = new Evento(nome, data, local, preco, descricao, horario, ingressos);

                evento.incluir().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Evento incluído com sucesso"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao incluir o evento: " + erro.message
                    })
                });
            }
        }
        else{

            resposta.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida"

            })

        }

    };

    alterar(requisicao, resposta) {
        if ((requisicao.method == "PUT" || requisicao.method == "PATCH") && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            const data = dados.data;
            const local = dados.local;
            const preco = dados.preco;
            const descricao = dados.descricao;
            const horario = dados.horario;
            const ingressos = dados.ingressos;
            

            if (nome && data && local && preco && descricao && horario && ingressos){
                const evento = new Evento(nome, data, local, preco, descricao, horario, ingressos);
                evento.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Evento alterado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar o Evento: " + erro.message
                    })
                })


            }else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Requisição inválida. Informe todos os dados"
                })
            }
        } else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida. Consulte a documentação."
            });
        }


    };

    excluir(requisicao, resposta) {
        if (requisicao.method == "DELETE" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;

            if (nome){
                const evento = new Evento(nome);
                evento.excluir().then(() =>{
                    resposta.status(200).json({
                    "status": true,
                    "mensagem":"Evento excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o evento: " + erro.message
                    })
                })
                }
                else{
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Requisição inválida! Informe o nome do evento para excluir."
                    });

                }
        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida. Consulte a documentação!"
            });
        }
    };



    consultar (requisicao, resposta) {

        let termoBusca = requisicao.params.termoBusca;
        if(!termoBusca){
            termoBusca = "";
        }
        if (requisicao.method == "GET"){
            const evento = new Evento();
            evento.consultar(termoBusca).then((eventos) => {
                return resposta.status(200).json({
                    "status": true,
                    "listaEventos": eventos
                });

            }).catch((erro) => {
                return resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar os eventos: " + erro.message
                })


            })
        }
        else{
            return resposta.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação"
            })
        }

    };


}