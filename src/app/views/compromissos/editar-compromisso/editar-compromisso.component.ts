import { Component, OnInit } from '@angular/core';
import { FormCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CompromissoService } from '../services/compromisso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContatosService } from '../../contatos/services/contatos.service';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css']
})
export class EditarCompromissoComponent implements OnInit
{
  form!: FormGroup;
  compromissoVM!: FormCompromissoViewModel;
  idSelecionado: string | null = null;
  contatos: ListarContatoViewModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private compromissoService: CompromissoService,
    private router: Router,
    private route: ActivatedRoute,
    private contatoService: ContatosService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
   this.form = this.formBuilder.group({
    assunto: new FormControl(''),
    tipoCompromisso: new FormControl(''),
    link: new FormControl(''),
    local: new FormControl(''),
    data: new FormControl(new Date()),
    horaInicio: new FormControl(''),
    horaTermino: new FormControl(''),
    nomeContato: new FormControl(''),
   })

   this.idSelecionado = this.route.snapshot.paramMap.get('id');

   if (!this.idSelecionado) return;

    this.compromissoService.selecionarPorId(this.idSelecionado).subscribe((res) => {
     this.form.patchValue(res);
   });

   this.contatoService.selecionarTodos().subscribe(res =>{
    this.contatos = res;
  })
  }

  gravar() {
    if (this.form.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }
      return;
    }

    this.compromissoVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.compromissoService.editar(id, this.compromissoVM).subscribe({
      next: (compromisso) => this.processarSucesso(compromisso),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterCompromisso(compromisso: FormCompromissoViewModel) {
    this.compromissoVM = compromisso;
    this.form.patchValue(this.compromissoVM);
  }

  processarSucesso(compromisso: FormCompromissoViewModel) {
    this.toastrService.success(
      `O contato "${compromisso.assunto}" foi editado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }

}
