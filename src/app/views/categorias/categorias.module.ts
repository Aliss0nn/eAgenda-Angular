import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { InserirCategoriasComponent } from './inserir-categorias/inserir-categorias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CardCategoriaComponent } from './card-categoria/card-categoria.component';
import 'src/app/extensions/form-group.extension';
import { CategoriaService } from './services/categoria.service';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { CategoriaRoutingModule } from './categoria.routing.module';


@NgModule({
  declarations: [
    ListarCategoriasComponent,
    InserirCategoriasComponent,
    CardCategoriaComponent,
    EditarCategoriaComponent,
    ExcluirCategoriaComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, CategoriaRoutingModule
  ],
  providers: [CategoriaService]
})
export class CategoriasModule { }
