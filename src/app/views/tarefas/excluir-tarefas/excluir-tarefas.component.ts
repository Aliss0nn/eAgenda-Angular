import { Component } from '@angular/core';
import { VisualizarTarefaViewModel } from '../models/visualizar-tarefa.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefasService } from '../services/tarefas.service';
import { ListarTarefaViewModel } from '../models/listar-tarefa.view-model';

@Component({
  selector: 'app-excluir-tarefas',
  templateUrl: './excluir-tarefas.component.html',
  styleUrls: ['./excluir-tarefas.component.css']
})
export class ExcluirTarefasComponent {
  tarefaVM?: VisualizarTarefaViewModel;
  idSelecionado: string | null = null;

  constructor(
    private tarefasService: TarefasService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.tarefasService.selecionarTarefaCompletaPorId(this.idSelecionado)
    .subscribe((res) => {
      this.tarefaVM = res;
    })
  }

  gravar() {
    this.tarefasService.excluir(this.tarefaVM!.id).subscribe((res) => {
      this.toastrService.success(
        'A tarefa foi excluída com sucesso!',
        'Sucesso'
      );

      this.router.navigate(['/tarefas', 'listar']);
    });
  }
}
