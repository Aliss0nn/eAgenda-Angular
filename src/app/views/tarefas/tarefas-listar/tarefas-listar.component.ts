import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarTarefaViewModel } from '../models/listar-tarefa.view-model';

@Component({
  selector: 'app-tarefas-listar',
  templateUrl: './tarefas-listar.component.html',
  styleUrls: ['./tarefas-listar.component.css']
})
export class TarefasListarComponent  implements OnInit{
  tarefas: ListarTarefaViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tarefas = this.route.snapshot.data['tarefas'];
  }
}
