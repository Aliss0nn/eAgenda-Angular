import { inject, NgModule } from "@angular/core"
import { ResolveFn, ActivatedRouteSnapshot, Routes, RouterModule } from "@angular/router"
import { EditarDespesaComponent } from "./editar-despesa/editar-despesa.component"
import { InserirDespesaComponent } from "./inserir-despesa/inserir-despesa.component"
import { ListarDespesaComponent } from "./listar-despesa/listar-despesa.component"
import { FormDespesaViewModel } from "./models/forms-despesas.viewmodel"
import { ListarDespesaViewModel } from "./models/listar-despesa.view.model"
import { DespesaService } from "./services/despesa.service"

const listarDespesasResolve: ResolveFn<ListarDespesaViewModel[]> = ()=> {
  return inject(DespesaService).selecionarTodos()
}

const formDespesaResolve : ResolveFn<FormDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(DespesaService).selecionarPorId(route.paramMap.get('id')!)
}

const routes: Routes = [
  {
      path: '',
      redirectTo: 'listar',
      pathMatch: 'full',
  },
  {
      path: 'listar',
      component: ListarDespesaComponent,
      resolve: {despesas: listarDespesasResolve}
  },

  {
      path: 'inserir',
      component: InserirDespesaComponent,
  }
  ,
  
  {
      path: 'editar/:id',
      component: EditarDespesaComponent,
      resolve: {despesa: formDespesaResolve}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DespesaRoutingModule {

}