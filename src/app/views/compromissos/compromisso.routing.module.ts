import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { EditarCompromissoComponent } from "./editar-compromisso/editar-compromisso.component";
import { ExcluirCompromissosComponent } from "./excluir-compromissos/excluir-compromissos.component";
import { InserirCompromissoComponent } from "./inserir-compromisso/inserir-compromisso.component";
import { ListarCompromissosComponent } from "./listar-compromissos/listar-compromissos.component";
import { listarCompromissoViewModel } from "./models/listar.compromisso.view-model";
import { FormCompromissoViewModel } from "./models/forms-compromisso.view-model";
import { VisualizarCompromissoViewModel } from "./models/visualizarCompromisso.view-model";
import { CompromissoService } from "./services/compromisso.service";

const listarCompromissoResolver: ResolveFn<listarCompromissoViewModel[]> = () => {
  return inject(CompromissoService).selecionarTodos();
};

const formsCompromissoResolver: ResolveFn<FormCompromissoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CompromissoService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarCompromissoResolver: ResolveFn<VisualizarCompromissoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CompromissoService).selecionarCompromissoCompletoPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
{
  path: '',
  redirectTo: 'listar',
  pathMatch: 'full'
},
{
  path: 'listar',
  component: ListarCompromissosComponent,
  resolve: {compromissos: listarCompromissoResolver},
},
{
  path: 'inserir',
  component: InserirCompromissoComponent
},
{
  path: 'editar/:id',
  component: EditarCompromissoComponent,
  resolve: {compromissos: formsCompromissoResolver},
},
{
  path: 'excluir/:id',
  component: ExcluirCompromissosComponent,
  resolve: {compromissos: visualizarCompromissoResolver},
},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CompromissoRoutingModule{

}