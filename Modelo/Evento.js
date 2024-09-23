import EventoDAO from "../DAO/EventoDAO.js";

export default class Evento{

    #nome
    #data
    #local
    #preco
    #descricao
    #horario
    #ingressos

    constructor(nome, data, local, preco, descricao, horario, ingressos){
        this.#nome = nome;
        this.#data = data;
        this.#local = local;
        this.#preco = preco;
        this.#descricao = descricao;
        this.#horario = horario;
        this.ingressos = ingressos;
    }

    // métodos javascript getters e setters

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get data(){
        return this.#data;
    }

    set data(novaData){
        this.#nome = novaData;
    }

    get local(){
        return this.#local;
    }

    set local(novoLocal){
        this.#local = novoLocal;
    }

    get preco(){
        return this.#preco;
    }

    set preco(novoPreco){
        this.#preco = novoPreco;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao= novaDescricao;
    }

    get horario(){
        return this.#horario;
    }

    set horario(novoHorario){
        this.#horario = novoHorario;
    }

    get ingressos(){
        return this.#ingressos;
    }

    set ingressos(novoIngressos){
        this.#ingressos = novoIngressos
    }

    //sobrescrita do método toString()
    toString(){
        //string literals
        return `Nome: ${this.#nome}
Data: ${this.#data}
Local: ${this.#local}
Preco: ${this.#preco}
Descricao: ${this.#descricao}
Horario: ${this.#horario}
Ingressos: ${this.#ingressos}
        `
    }

toJSON(){
    return {
        nome: this.#nome,
        data: this.#data,
        local: this.#local,
        preco: this.#preco,
        descricao: this.#descricao,
        horario: this.#horario,
        ingressos: this.#ingressos
    }

}



    async incluir(){
        const eventDAO = new EventoDAO();
        await eventDAO.gravar(this);
    }

    async alterar(){
        const eventDAO = new EventoDAO();
        await eventDAO.alterar(this);
    }

    async excluir(){
        const eventDAO = new EventoDAO();
        await eventDAO.excluir(this);
    }

    async consultar(termoBusca){
        const eventDAO = new EventoDAO();
        return await eventDAO.consultar(termoBusca);
    }
}