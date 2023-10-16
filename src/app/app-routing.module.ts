import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirContatoComponent } from './views/contatos/inserir-contato/inserir-contato.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { EditarContatoComponent } from './views/contatos/editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './views/contatos/excluir-contato/excluir-contato.component';
import { ListarCompromissosComponent } from './views/compromissos/listar-compromissos/listar-compromissos.component';
import { InserirCompromissoComponent } from './views/compromissos/inserir-compromisso/inserir-compromisso.component';
import { EditarCompromissoComponent } from './views/compromissos/editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissosComponent } from './views/compromissos/excluir-compromissos/excluir-compromissos.component';
import { ListarCategoriasComponent } from './views/categorias/listar-categorias/listar-categorias.component';
import { InserirCategoriasComponent } from './views/categorias/inserir-categorias/inserir-categorias.component';
import { EditarCategoriaComponent } from './views/categorias/editar-categoria/editar-categoria.component';
import { ExcluirCategoriaComponent } from './views/categorias/excluir-categoria/excluir-categoria.component';
import { DespesasModule } from './views/despesas/despesas.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'contatos',
    loadChildren: () => import('./views/contatos/contatos.module').then((m) => m.ContatosModule)
  },
  {
    path: 'compromissos',
    loadChildren: () => import('./views/compromissos/compromissos.module').then((m) => m.CompromissosModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./views/categorias/categorias.module').then((m) => m.CategoriasModule)
  },
  {
    path: 'despesas',
    loadChildren: () => import('./views/despesas/despesas.module').then((m) => m.DespesasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
