import { Component } from '@angular/core';
import { VisualizarCompromissoViewModel } from '../models/visualizarCompromisso.view-model';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { CompromissoService } from '../services/compromisso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-compromissos',
  templateUrl: './excluir-compromissos.component.html',
  styleUrls: ['./excluir-compromissos.component.css']
})
export class ExcluirCompromissosComponent {
  compromissoVM: VisualizarCompromissoViewModel;
  idSelecionado: string | null = null;
  contato: ListarContatoViewModel;

  constructor(
    private compromissoService: CompromissoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contato = new ListarContatoViewModel('','','')
    this.compromissoVM = new VisualizarCompromissoViewModel('', '', 1 , '', '', new Date(),'','', this.contato);
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.compromissoService
      .selecionarCompromissoCompletoPorId(this.idSelecionado)
      .subscribe((res) => {
        this.compromissoVM = res;
      });
  }

  gravar() {
    this.compromissoService.excluir(this.idSelecionado!).subscribe((res) => {
      this.router.navigate(['/compromissos', 'listar']);
    });
  }
}
