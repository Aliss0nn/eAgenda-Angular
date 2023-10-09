import { ListarContatoViewModel } from "../../contatos/models/listar-contato.view-model";

export class FormCompromissoViewModel{
  assunto: string;
  tipoLocal: tipoLocal;
  link: string;
  local: string;
  data: Date;
  horarioInicio: string;
  horarioTermino: string;
  ContatoId: ListarContatoViewModel;

  constructor(
  assunto: string,
  tipoLocal: tipoLocal,
  link: string,
  local: string,
  data: Date,
  horarioInicio: string,
  horarioTermino: string,
  ContatoId: ListarContatoViewModel
  ){
   this.assunto = assunto;
   this.tipoLocal = tipoLocal;
   this.link = link;
   this.local = local;
   this.data = data;
   this.horarioInicio = horarioInicio;
   this.horarioTermino = horarioTermino;
   this.ContatoId = ContatoId;
  }  
}

enum tipoLocal {
  remoto = 0,
  presencial = 1,
}