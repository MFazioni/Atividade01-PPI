import conectar from "./Conexao.js";
import Evento from "../Modelo/Evento.js";
export default class EventoDAO{


    constructor(){
        this.init(); //iniciailizar o banco de dados
    }

    async init(){
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS evento (
                     nome VARCHAR(20) NOT NULL PRIMARY KEY, 
                     data DATE NOT NULL, 
                     local VARCHAR(200) NOT NULL, 
                     preco DECIMAL NOT NULL, 
                     descricao TEXT NOT NULL, 
                     horario TIME NOT NULL,
                     ingressos INT NOT NULL)`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!" + erro);
        }
    }

    async gravar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento(nome,data,local,preco,descricao,horario,ingressos) 
                         VALUES (?, ?, ?, ?, ?, ?, ?);`;
            const parametros = [
                evento.nome,
                evento.data,
                evento.local,
                evento.preco,
                evento.descricao,
                evento.horario,
                evento.ingressos
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE evento SET data = ?, 
                         local = ?, 
                         preco = ?, 
                         descricao = ?, 
                         horario = ?, 
                         ingressos = ?
                         WHERE nome = ?;`;
            const parametros = [
                evento.data,
                evento.local,
                evento.preco,
                evento.descricao,
                evento.horario,
                evento.ingressos,
                evento.nome
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `DELETE FROM evento WHERE nome = ?;`;
            const parametros = [
                evento.nome
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){
            sql = `SELECT * FROM evento WHERE nome = ? order by nome;`;
            parametros.push(termoBusca);
        }
        else{
            sql = `SELECT * FROM evento order by nome;`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaEventos = [];
        for (const registro of registros){
            const evento = new Evento(
                registro.nome,
                registro.data,
                registro.local,
                registro.preco,
                registro.descricao,
                registro.horario,
                registro.ingressos
            );
            listaEventos.push(evento);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaEventos;

    }
}