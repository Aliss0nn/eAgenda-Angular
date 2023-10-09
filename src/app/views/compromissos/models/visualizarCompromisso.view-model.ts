import { ListarContatoViewModel } from "../../contatos/models/listar-contato.view-model";

export class VisualizarCompromissoViewModel{
  id: string;
  assunto: string;
  tipoLocal: tipoLocal;
  link: string;
  local: string;
  data: Date;
  horarioInicio: string;
  horarioTermino: string;
  contatoId: ListarContatoViewModel;

  constructor(
  id: string,
  assunto: string,
  tipoLocal: tipoLocal,
  link: string,
  local: string,
  data: Date,
  horarioInicio: string,
  horarioTermino: string,
  contatoId: ListarContatoViewModel
  ){
   this.id = id;
   this.assunto = assunto;
   this.tipoLocal = tipoLocal;
   this.link = link;
   this.local = local;
   this.data = data;
   this.horarioInicio = horarioInicio;
   this.horarioTermino = horarioTermino;
   this.contatoId = contatoId;
  }  
}

enum tipoLocal {
  remoto = 0,
  presencial = 1,
}