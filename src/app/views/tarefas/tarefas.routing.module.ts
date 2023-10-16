import { NgModule, inject } from "@angular/core";
import { Routes, RouterModule, ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { TarefasListarComponent } from "./tarefas-listar/tarefas-listar.component";
import { TarefasInserirComponent } from "./tarefas-inserir/tarefas-inserir.component";
import { TarefasService } from './services/tarefas.service';
import { EditarTarefasComponent } from "./editar-tarefas/editar-tarefas.component";
import { FormsTarefaViewModel } from "./models/forms-tarefa.view-model";
import { ExcluirTarefasComponent } from "./excluir-tarefas/excluir-tarefas.component";

const listarTarefasResolver = () => {
  return inject(TarefasService).selecionarTodos();
};

const formsTarefaResolver = (route: ActivatedRouteSnapshot) => {
  return inject(TarefasService).selecionarPorId(route.paramMap.get('id')!);
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },

  {
    path: 'listar',
    component: TarefasListarComponent,
    resolve: { tarefas: listarTarefasResolver },
  },
  {
    path: 'inserir',
    component: TarefasInserirComponent,
  },
  {
    path: 'editar/:id',
    component: EditarTarefasComponent,
    resolve: { tarefa: formsTarefaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirTarefasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefasRoutingModule {}