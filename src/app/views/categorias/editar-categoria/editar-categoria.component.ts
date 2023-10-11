import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { CategoriaService } from '../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit{
form!: FormGroup;
categoriaVM!: FormsCategoriaViewModel;
idSelecionado: string | null = null;

constructor(private formBuilder: FormBuilder,
  private categoriaService: CategoriaService,
  private toastrService: ToastrService,
  private router: Router,
  private route: ActivatedRoute){}


ngOnInit(): void {
  this.form = this.formBuilder.group({
    titulo: new FormControl('',[Validators.required])
  })

  this.route.data.pipe(map((dados) => dados['categoria'])).subscribe({
    next: (categoria) => this.obterCategoria(categoria),
    error: (erro) => this.processarFalha(erro),
  });
}
  obterCategoria(categoria: FormsCategoriaViewModel): void {
    this.categoriaVM = categoria;
    this.form.patchValue(this.categoriaVM);
  }

campoEstaInvalido(nome: string) {
  return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
}

  gravar(){
    if(this.form.invalid){
      for( let erro of this.form.validate()){
        this.toastrService.warning(erro);
      }

      this.form.markAllAsTouched();

      return;
    }
    
    this.categoriaVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.categoriaService.editar(id,this.categoriaVM).subscribe({
      next: (categoria: FormsCategoriaViewModel) => this.processarSucesso(categoria),
      error: (erro: Error) => this.processarFalha(erro)
    })
  }

  processarFalha(erro: Error): void {
    this.toastrService.error(erro.message,'Error');
  }

  processarSucesso(categoria: FormsCategoriaViewModel): void {
    this.toastrService.success(`A categoria "${categoria.titulo}" foi Editada com sucesso`,
    'Sucesso');
    console.log(categoria);

    this.router.navigate(['/categorias/listar']);
  }
}
