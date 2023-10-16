import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DespesaService } from './services/despesa.service';
import { ListarDespesaComponent } from './listar-despesa/listar-despesa.component';
import { EditarCategoriaComponent } from '../categorias/editar-categoria/editar-categoria.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { DespesaRoutingModule } from './despesas.routing.module';
import 'src/app/extensions/form-group.extension';
import { CategoriaService } from '../categorias/services/categoria.service';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [ListarDespesaComponent, EditarDespesaComponent, InserirDespesaComponent],
  imports: [
    CommonModule, ReactiveFormsModule, DespesaRoutingModule, NgSelectModule
  ],
  providers: [DespesaService, CategoriaService],
})
export class DespesasModule { }
