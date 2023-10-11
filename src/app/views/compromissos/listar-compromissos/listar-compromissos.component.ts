import { Component, OnInit } from '@angular/core';
import { listarCompromissoViewModel } from '../models/listar.compromisso.view-model';
import { CompromissoService } from '../services/compromisso.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit{
  compromissos: listarCompromissoViewModel[] = [];

  constructor(  private route: ActivatedRoute,
    private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['compromissos'])).subscribe({
      next: (compromissos) => this.obterCompromissos(compromissos),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterCompromissos(compromissos: listarCompromissoViewModel[]) {
    this.compromissos = compromissos;
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }
}
