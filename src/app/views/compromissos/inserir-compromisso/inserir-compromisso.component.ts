import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { CompromissoService } from '../services/compromisso.service';
import { Router } from '@angular/router';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent implements OnInit{
  form!: FormGroup;
  compromissoVM!: FormCompromissoViewModel;
  contatos: ListarContatoViewModel[] = [];
  
  constructor(
    private formBuider: FormBuilder,
    private compromissoService: CompromissoService,
    private router: Router,
    private contatoServico: ContatosService,
    private toastrService: ToastrService
  ){}

  ngOnInit(): void {
    this.form = this.formBuider.group({
      assunto: new FormControl('',[Validators.required]),
      tipoCompromisso: new FormControl('',[Validators.required]),
      link: new FormControl(''),
      local: new FormControl('',[Validators.required]),
      data: new FormControl(new Date(),[Validators.required]),
      horaInicio: new FormControl('08:00',[Validators.required]),
      horaTermino: new FormControl('09:00',[Validators.required]),
      nomeContato: new FormControl(''),
    })

    this.contatoServico.selecionarTodos().subscribe(res =>{
      this.contatos = res;
    })
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar(){
    if (this.form.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      this.form.markAllAsTouched();

      return;
    }

    this.compromissoVM = this.form.value;

    this.compromissoService.inserir(this.compromissoVM).subscribe({
      next: (compromisso: FormCompromissoViewModel) => this.processarSucesso(compromisso),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(compromisso: FormCompromissoViewModel){
    this.toastrService.success(`O compromisso "${compromisso.assunto}" foi Cadastrado com sucesso`,
    'Sucesso');
    console.log(compromisso);

    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(erro: Error){
    this.toastrService.error(erro.message,'Error');
  }
}
