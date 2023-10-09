import { Component, Input } from '@angular/core';
import { listarCompromissoViewModel } from '../models/listar.compromisso.view-model';

@Component({
  selector: 'app-card-compromisso',
  templateUrl: './card-compromisso.component.html',
  styleUrls: ['./card-compromisso.component.css']
})
export class CardCompromissoComponent {
@Input() compromisso: listarCompromissoViewModel

constructor(){
  this.compromisso = new listarCompromissoViewModel('','','','','','')
}
}
