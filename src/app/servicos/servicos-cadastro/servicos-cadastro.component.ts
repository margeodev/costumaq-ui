import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Servico, Mecanico, Item } from 'app/model';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { MecanicoService } from 'app/mecanicos/mecanico.service';
import { ServicoService } from '../servico.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-servicos-cadastro',
  templateUrl: './servicos-cadastro.component.html',
  styleUrls: ['./servicos-cadastro.component.css']
})
export class ServicosCadastroComponent implements OnInit {

  mecanicos = [];
  mecanico = new Mecanico();
  servico = new Servico();
  whatsApp = false;
  statusDefinido = false;
  mecanicoDefinido = false;
  tipoServicoDefinido = false;
  valorDefinido = false;
  descricaoDefinida = false;
  dataEntregaDefinida = false;
  dataGarantiaDefinida = false;
  valorTotal: number;

  tipoServico = [
    { label: 'MANUTENCÃO PREVENTIVA', value: 'MANUTENCAO_PREVENTIVA' },
    { label: 'MANUTENCÃO CORRETIVA', value: 'MANUTENCAO_CORRETIVA' },
  ];

  prazoGarantia = [
    { label: '30 dias', value: 30 },
    { label: '60 dias', value: 60 },
    { label: '90 dias', value: 90 },
  ];

  constructor(
    private mecanicoService: MecanicoService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private servicoService: ServicoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarServico(id);
      this.carregarMecanicos();
    }
  }

  carregarMecanicos() {
    this.mecanicoService.listar()
      .then(dados => {
        this.mecanicos = dados
          .map(p => ({ label: p.nome, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMecanicoPorId(id: number) {
    this.mecanicoService.buscarPorId(id)
      .then(mecanico => {
        this.mecanico = mecanico;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarServico(id: number) {
    this.servicoService.buscarPorId(id)
      .then(servico => {
        this.montarServico(servico);
        this.travaCamposEntradaDefinidos(servico);
        this.exibeWhatsApp();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  montarServico(servico: Servico) {
    this.servico.id = servico.id;
    this.servico.descricao = servico.descricao;
    this.servico.tipoServico = servico.tipoServico;
    this.servico.valor = servico.valor;
    this.servico.statusServico = servico.statusServico;
    this.servico.concluido = servico.concluido;
    this.servico.dataEntrega = servico.dataEntrega;

    this.servico.itens = servico.itens;
    this.servico.ordemServico.codigo = servico.ordemServico.codigo;
    this.servico.ordemServico.cliente.nome = servico.ordemServico.cliente.nome;
    this.servico.ordemServico.cliente.telefone = servico.ordemServico.cliente.telefone;
    this.servico.ordemServico.cliente.whatsapp = servico.ordemServico.cliente.whatsapp;
    this.servico.ordemServico.descricaoProblema = servico.ordemServico.descricaoProblema;
    this.calcularValorTotal();

    if (servico.mecanico) {
      this.servico.mecanico = servico.mecanico;
    }
  }

  aoAlterarItem(itensEvento: any) {
    this.servico.itens = itensEvento;
    this.calcularValorTotal();
  }

  calcularValorTotal() {
    let itens = this.servico.itens;
    let total = 0;
    if(itens.length > 0) {
      total = itens.reduce((sum, valorItem) => sum + valorItem.valor, 0);
    }
    this.valorTotal = total;
  }

  travaCamposEntradaDefinidos(servico: Servico) {
    if (servico.statusServico) {
      this.statusDefinido = true;
    }
    if (servico.mecanico) {
      this.mecanicoDefinido = true;
      this.carregarMecanicoPorId(servico.mecanico.id)
    }
    if (servico.tipoServico) {
      this.tipoServicoDefinido = true;
    }
    if (servico.valor) {
      this.valorDefinido = true;
    }
    if (servico.descricao) {
      this.descricaoDefinida = true;
    }
    if (servico.dataEntrega) {
      this.dataEntregaDefinida = true;
    }
  }


  salvar() {
    if (this.servico.dataEntrega) {
      this.servico.concluido = true;
    }
    this.atualizarServico();
  }

  atualizarServico() {
    this.servicoService.atualizar(this.servico)
      .then(dados => {
        this.servico = dados;
        this.toasty.success('Serviço alterado com sucesso.');

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  exibeWhatsApp() {
    if (this.servico.ordemServico.cliente.whatsapp) {
      this.whatsApp = true;
    }
  }

  editaServico() {
    this.statusDefinido = false;
    this.mecanicoDefinido = false;
    this.tipoServicoDefinido = false;
    this.valorDefinido = false;
    this.descricaoDefinida = false;
  }

  definePrazoDeGarantia(diasDeGarantia) {
    const dataEntrega = this.servico.dataEntrega;
    this.servico.dataGarantia = new Date();
    this.servico.dataGarantia.setDate(dataEntrega.getDate() + diasDeGarantia);
  }

}
