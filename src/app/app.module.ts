import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosModule } from './views/contatos/contatos.module';
import { HttpClientModule } from '@angular/common/http';
import { CompromissosModule } from './views/compromissos/compromissos.module';
import { CategoriasModule } from './views/categorias/categorias.module';
import { DespesasModule } from './views/despesas/despesas.module';
import { RegistroModule } from './views/registro/registro.module';
import { LoginModule } from './views/login/login.module';

@NgModule({
  // Componentes e diretivas que o Módulo Distribui
  declarations: [AppComponent],

  // Importa metadados de outros módulos (incluindo bibliotecas)
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),

    HttpClientModule,
    CoreModule,
    DashboardModule,
    LoginModule,
    RegistroModule,
    ContatosModule,
    CompromissosModule,
    CategoriasModule,
    DespesasModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
