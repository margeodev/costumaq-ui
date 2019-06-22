import { ActivatedRoute } from '@angular/router';
import { Cliente, Endereco } from 'app/model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ClientesService } from '../clientes.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { BuscaCepService } from '../busca-cep.service';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.css']
})
export class ClientesCadastroComponent implements OnInit {

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cepMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  telMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/];

  cliente = new Cliente();
  pessoaFisica = true;
  endereco = new Endereco();

  exibePessoaFisica() {
    this.pessoaFisica = true;
  }
  exibePessoaJuridica() {
    this.pessoaFisica = false;
  }

  copiarTelefone() {
    this.cliente.whatsapp = this.cliente.telefone;
  }

  consultarCEP(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.buscaCepService.consultar(cep)
          .then(dados => {
            this.endereco = dados;
            this.preencheEndereco(this.endereco);
          })
      }
    }
  }

  preencheEndereco(endereco: Endereco) {
    this.cliente.endereco.logradouro = endereco.logradouro;
    this.cliente.endereco.bairro = endereco.bairro;
    this.cliente.endereco.uf = endereco.uf;
    this.cliente.endereco.localidade = endereco.localidade;
  }

  constructor(
    private clienteService: ClientesService,
    private buscaCepService: BuscaCepService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo Cliente');

    const idCliente = this.route.snapshot.params['id'];

    if (idCliente) {
      this.carregarCliente(idCliente);
    }
  }

  atualizarTitulo() {
    this.title.setTitle('Edição de Cliente');
  }

  get editando() {
    return Boolean(this.cliente.id);
  }

  carregarCliente(id: number) {
    console.log(id);
    this.atualizarTitulo();
    this.clienteService.buscarPorId(id)
      .then(cliente => {
        this.cliente = cliente;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  formataTelefone(event) {
    const campo = event.target.name;
    let valor = event.target.value;
    valor = valor.replace(/_/g, '');

    if (campo === 'telefone') {
      this.cliente.telefone = valor;
    }
    if (campo === 'whatsapp') {
      this.cliente.whatsapp = valor;
    }
  }

  salvar(form: FormControl) {
    if(this.editando) {
      this.atualizarCliente(form);
    } else {
      this.adicionarCliente(form);
    }
  }

  adicionarCliente(form: FormControl) {
    this.clienteService.adicionar(this.cliente)
      .then(() => {
        console.log('Cliente adicionado com sucesso!');
        form.reset();
        this.cliente = new Cliente();
        this.toasty.success('Cliente adicionado com sucesso.');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCliente(form: FormControl) {
    this.clienteService.atualizar(this.cliente)
      .then(cliente => {
        this.cliente = cliente;
        this.toasty.success('Cliente alterado com sucesso.')
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
