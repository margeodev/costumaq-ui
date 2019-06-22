import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { Equipamento } from 'app/model';
import { EquipamentosService } from '../equipamentos.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-equipamentos-cadastro',
  templateUrl: './equipamentos-cadastro.component.html',
  styleUrls: ['./equipamentos-cadastro.component.css']
})
export class EquipamentosCadastroComponent implements OnInit {

  equipamento = new Equipamento();

  constructor(
    private title: Title,
    private equipamentoService: EquipamentosService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo Equipamento');

    const idEquipamento = this.route.snapshot.params['id'];

    if (idEquipamento) {
      this.carregarEquipamento(idEquipamento);
    }
  }

  salvar(form: FormControl) {
    if(this.editando) {
      this.atualizarEquipamento(form);
    } else {
      this.adicionarEquipamento(form);
    }
  }

  adicionarEquipamento(form: FormControl) {
    this.equipamentoService.salvar(this.equipamento)
    .then(() => {
      console.log('Equipamento adicionado com sucesso!');
      form.reset();
      this.equipamento = new Equipamento();
      this.toasty.success('Equipamento adicionado com sucesso.');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarEquipamento(form: FormControl) {
    this.equipamentoService.atualizar(this.equipamento)
      .then(equipamento => {
        this.equipamento = equipamento;
        this.toasty.success('Equipamento alterado com sucesso.')
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.equipamento.id);
  }

  carregarEquipamento(id: number) {
    console.log(id);
    this.atualizarTitulo();
    this.equipamentoService.buscarPorId(id)
      .then(equipamento => {
        this.equipamento = equipamento;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTitulo() {
    this.title.setTitle('Edição de Equipamento');
  }

}
