import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { listarCompromissoViewModel } from "../models/listar.compromisso.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { FormCompromissoViewModel } from "../models/forms-compromisso.view-model";
import { VisualizarCompromissoViewModel } from "../models/visualizarCompromisso.view-model";

@Injectable()

export class CompromissoService{
  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/compromissos/';

  constructor(private http: HttpClient){}

  public inserir(
    compromisso: FormCompromissoViewModel
  ): Observable<FormCompromissoViewModel> {
    return this.http
      .post<any>(this.endpoint, compromisso, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        // Interceptar e tratar a mensagem de erro
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(id: string, contato: FormCompromissoViewModel) {
    return this.http
      .put<any>(this.endpoint + id, contato, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }


  public selecionarPorId(id: string): Observable<FormCompromissoViewModel> {
    return this.http
      .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarTodos(): Observable<listarCompromissoViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(
        map((res=> res.dados)),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarCompromissoCompletoPorId(
    id: string
  ): Observable<VisualizarCompromissoViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id,
        this.obterHeadersAutorizacao()
      )
      .pipe(map((res) => res.dados),
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