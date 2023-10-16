import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefasInserirComponent } from './tarefas-inserir/tarefas-inserir.component';
import { TarefasListarComponent } from './tarefas-listar/tarefas-listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TarefasService } from './services/tarefas.service';
import { TarefasRoutingModule } from './tarefas.routing.module';
import 'src/app/extensions/form-group.extension';
import { EditarTarefasComponent } from './editar-tarefas/editar-tarefas.component';
import { ExcluirTarefasComponent } from './excluir-tarefas/excluir-tarefas.component';



@NgModule({
  declarations: [TarefasInserirComponent, TarefasListarComponent, EditarTarefasComponent, ExcluirTarefasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgSelectModule,
    TarefasRoutingModule
  ],
  providers: [TarefasService]
})
export class TarefasModule { }
