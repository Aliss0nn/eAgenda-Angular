import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { EditarCategoriaComponent } from "./editar-categoria/editar-categoria.component";
import { ExcluirCategoriaComponent } from "./excluir-categoria/excluir-categoria.component";
import { InserirCategoriasComponent } from "./inserir-categorias/inserir-categorias.component";
import { ListarCategoriasComponent } from "./listar-categorias/listar-categorias.component";
import { NgModule, inject } from "@angular/core";
import { ListarCategoriaViewModel } from "./models/listar-categoria.view-model";
import { CategoriaService } from "./services/categoria.service";
import { FormsCategoriaViewModel } from "./models/forms-categoria.view-model";
import { VisualizarCategoriaViewModel } from "./models/visualizar-categoria.view-model";

const listarCategoriasResolve: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject(CategoriaService).selecionarTodos();
};

const formsCategoriaResolve: ResolveFn<FormsCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CategoriaService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CategoriaService).selecionarCategoriaCompletaPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
{
  path: '',
  redirectTo: 'listar',
  pathMatch: 'full',
},
{
  path: 'listar',
  component: ListarCategoriasComponent,
  resolve: {categoria: listarCategoriasResolve}
},
{
  path: 'inserir',
  component: InserirCategoriasComponent
},
{
  path: 'editar/:id',
  component: EditarCategoriaComponent,
  resolve: {categoria: formsCategoriaResolve}
},
{
  path: 'excluir/:id',
  component: ExcluirCategoriaComponent,
  resolve: {categoria: visualizarCategoriaResolver}
},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class CategoriaRoutingModule{

}