import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { CategoriaService } from '../services/categoria.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-categorias',
  templateUrl: './inserir-categorias.component.html',
  styleUrls: ['./inserir-categorias.component.css']
})
export class InserirCategoriasComponent implements OnInit{
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel
  
  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private toastrService: ToastrService
  ){}
  
  ngOnInit(): void {
   this.form = this.formBuilder.group({
    titulo: new FormControl('',[Validators.required])
   });
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

    this.categoriaService.inserir(this.categoriaVM).subscribe({
      next: (categoria: FormsCategoriaViewModel) => this.processarSucesso(categoria),
      error: (erro: Error) => this.processarFalha(erro)
    })
  }
  
  processarFalha(erro: Error): void {
    this.toastrService.error(erro.message,'Error');
  }

  processarSucesso(categoria: FormsCategoriaViewModel): void {
    this.toastrService.success(`A categoria "${categoria.titulo}" foi Cadastrada com sucesso`,
    'Sucesso');
    console.log(categoria);

    this.router.navigate(['/categorias/listar']);
  }
}