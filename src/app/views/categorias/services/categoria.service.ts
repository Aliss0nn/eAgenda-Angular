import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsCategoriaViewModel } from "../models/forms-categoria.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ListarCategoriaViewModel } from "../models/listar-categoria.view-model";
import { VisualizarCategoriaViewModel } from "../models/visualizar-categoria.view-model";

@Injectable()

export class CategoriaService{
private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/categorias/';

constructor(private http: HttpClient){}

public inserir(categoria: FormsCategoriaViewModel): Observable<FormsCategoriaViewModel>{
  return this.http.post<any>(this.endpoint,categoria,this.obterHeadersAutorizacao())
  .pipe(
    map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
  );
}

public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {
  return this.http
    .get<any>(this.endpoint, this.obterHeadersAutorizacao())
    .pipe(
      map((res=> res.dados)),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
}

private obterHeadersAutorizacao() {
  const token = environment.apiKey;

  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };
}

public editar(id: string, contato: FormsCategoriaViewModel) {
  return this.http
    .put<any>(this.endpoint + id, contato, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
}

public excluir(id: string): Observable<any> {
  return this.http
    .delete(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
}

public selecionarPorId(id: string): Observable<FormsCategoriaViewModel> {
  return this.http
    .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
}

public selecionarCategoriaCompletaPorId(
  id: string
): Observable<VisualizarCategoriaViewModel> {
  return this.http
    .get<any>(
      this.endpoint + 'visualizacao-completa/' + id,
      this.obterHeadersAutorizacao()
    )
    .pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
}

private processarErroHttp(erro: HttpErrorResponse) {
  let mensagemErro = '';

  if (erro.status == 0)
    mensagemErro = 'Ocorreu um erro ao processar a requisição.';
  if (erro.status == 401)
    mensagemErro =
      'O usuário não está autorizado. Efetue login e tente novamente.';
  else mensagemErro = erro.error?.erros[0];

  return throwError(() => new Error(mensagemErro));
}
}