import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormDespesaViewModel } from "../models/forms-despesas.viewmodel";
import { ListarDespesaViewModel } from "../models/listar-despesa.view.model";

@Injectable()
export class DespesaService {

    constructor(private http: HttpClient) {}

    private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/despesas/';

    public selecionarTodos(): Observable<ListarDespesaViewModel[]>{
        return this.http.get<any>(this.endpoint, this.obterHeadersAutorizacao()).pipe(
            map(res => res.dados),
            catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
        )
    }

    public selecionarPorId(id: string): Observable<FormDespesaViewModel>{
        return this.http.get<any>(this.endpoint + id, this.obterHeadersAutorizacao()).pipe(
            map(res => (res.dados)),
            catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
        )
    }

    public inserir(despesa: FormDespesaViewModel){
        return this.http.post<any>(this.endpoint, despesa, this.obterHeadersAutorizacao())
        .pipe(
            map(res => res.dados),
            catchError(err => this.processarErroHttp(err))
        )
    }
    
    public editar(despesa: FormDespesaViewModel, id: string){
        return this.http.put<any>(this.endpoint + id, despesa, this.obterHeadersAutorizacao())
        .pipe(
            map(res => res.dados),
            catchError(err => this.processarErroHttp(err))
        )
    }

    public excluir(id: string): Observable<any> {
        return this.http.delete(this.endpoint + id, this.obterHeadersAutorizacao())
          .pipe(
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

      processarErroHttp(err: HttpErrorResponse) {
        let msgErro = '';
    
        if (err.status == 0)
          msgErro = "Ocorreu um erro ao processar a requisicao";
        else if (err.status == 401)
          msgErro = "O usuario nao esta autorizado! Efetue login e tente novamente";
    
        else
          msgErro = err.error?.erros[0];
    
        return throwError(() => new Error(msgErro));
      }
}