import { Router } from "express";
import EventoCtrl from "../Controle/eventoCtrl.js";

const rotaEvento = Router();
const ctrlEvento = new EventoCtrl();

rotaEvento.get("/", ctrlEvento.consultar)
.get("/:termoBusca", ctrlEvento.consultar)
.post("/", ctrlEvento.gravar)
.put("/", ctrlEvento.alterar)
.patch("/", ctrlEvento.alterar)
.delete("/", ctrlEvento.excluir);



export default rotaEvento