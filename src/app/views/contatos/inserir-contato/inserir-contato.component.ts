import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html',
  styleUrls: ['./inserir-contato.component.css'],
})
export class InserirContatoComponent implements OnInit {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  get email() {
    return this.form.get('email');
  }

  gravar() {
    if (this.form.invalid) {
      return;
    }

    this.contatoVM = this.form.value;

    this.contatoService.inserir(this.contatoVM).subscribe((res) => {
      console.log(res);

      this.router.navigate(['/contatos/listar']);
    });
  }
}
