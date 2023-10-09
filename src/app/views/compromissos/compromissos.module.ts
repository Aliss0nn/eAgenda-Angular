import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompromissoService } from './services/compromisso.service';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissosComponent } from './excluir-compromissos/excluir-compromissos.component';
import { ContatosService } from '../contatos/services/contatos.service';
import { CardCompromissoComponent } from './card-compromisso/card-compromisso.component';
import { CompromissoRoutingModule } from './compromisso.routing.module';
import 'src/app/extensions/form-group.extension';



@NgModule({
  declarations: [
    ListarCompromissosComponent,
    InserirCompromissoComponent,
    EditarCompromissoComponent,
    ExcluirCompromissosComponent,
    CardCompromissoComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, CompromissoRoutingModule,
  ],
  providers: [CompromissoService, ContatosService]
})
export class CompromissosModule { }
