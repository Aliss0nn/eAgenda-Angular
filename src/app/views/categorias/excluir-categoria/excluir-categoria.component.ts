import { Component } from '@angular/core';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { CategoriaService } from '../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css']
})
export class ExcluirCategoriaComponent {
  categoriaVM: VisualizarCategoriaViewModel;
  idSelecionado: string | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaVM = new VisualizarCategoriaViewModel('', '',);
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.categoriaService
      .selecionarCategoriaCompletaPorId(this.idSelecionado)
      .subscribe((res) => {
        this.categoriaVM = res;
      });
  }

  gravar() {
    this.categoriaService.excluir(this.idSelecionado!).subscribe((res) => {
      this.router.navigate(['/categorias', 'listar']);
    });
  }
}
