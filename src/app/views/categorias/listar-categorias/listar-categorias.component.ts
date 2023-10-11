import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListarCategoriaViewModel } from '../models/listar-categoria.view-model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {
  categorias: ListarCategoriaViewModel[] = []
  
  constructor(  private route: ActivatedRoute,
    private toastrService: ToastrService,
    private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.selecionarTodos().subscribe((res) => {
      this.categorias = res;
    });
  }

  obterCategorias(categorias: ListarCategoriaViewModel[]){
    this.categorias = categorias;
  }

  processarFalha(erro: Error){
   this.toastrService.error(erro.message, 'Erro');
  }
}
