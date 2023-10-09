import { Component, Input } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent {
@Input() contato: ListarContatoViewModel;

constructor(){
  this.contato = new ListarContatoViewModel('','','')
}
}
