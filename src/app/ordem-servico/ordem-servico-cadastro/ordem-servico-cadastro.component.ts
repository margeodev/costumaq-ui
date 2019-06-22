import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ClientesService } from 'app/clientes/clientes.service';
import { EquipamentosService } from 'app/equipamentos/equipamentos.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { OrdemServicoService } from '../ordem-servico.service';
import { ToastyService } from 'ng2-toasty';
import { OrdemServico, ServicoResumo } from 'app/model';
import { ServicoService } from 'app/servicos/servico.service';

@Component({
  selector: 'app-ordem-servico-cadastro',
  templateUrl: './ordem-servico-cadastro.component.html',
  styleUrls: ['./ordem-servico-cadastro.component.css']
})
export class OrdemServicoCadastroComponent implements OnInit {

  clientes = []
  equipamentos = []
  ordemServico = new OrdemServico();
  servicoResumo = new ServicoResumo();

  tipoServico = [
    {label: 'Manutensão Preventiva', value: 'MANUTENSAO_PREVENTIVA'},
    {label: 'Manutensão Corretiva', value: 'MANUTENSAO_CORRETIVA'},
  ]

  constructor(
    private clientesService: ClientesService,
    private equipamentoService: EquipamentosService,
    private osService: OrdemServicoService,
    private servicoService: ServicoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Ordem de Serviço');
    this.carregarEquipamentos();
    this.carregarClientes();
  }

  salvar(form: FormControl) {
    this.adicionarOrdemServico(form);
  }

  adicionarOrdemServico(form: FormControl) {
    this.osService.adicionar(this.ordemServico)
      .then(ordemServico => {
        this.adicionarOsAoServico(ordemServico);
        this.servicoService.adicionar(this.servicoResumo);
        form.reset();
        this.toasty.success('Ordem de Serviço adicionada com sucesso.');
        console.log('Ordem de Serviço adicionada com sucesso.');

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarClientes() {
    this.clientesService.listarTodos()
      .then(clientes => {
        this.clientes = clientes
          .map(p => ({ label: p.nome, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEquipamentos() {
    this.equipamentoService.listarTodos()
    .then(equipamentos => {
      this.equipamentos = equipamentos
        .map(p => ({ label: p.numeroSerie, value: p.id }));
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarOsAoServico(os: OrdemServico) {
    this.servicoResumo.ordemServico = os;
  }

}
