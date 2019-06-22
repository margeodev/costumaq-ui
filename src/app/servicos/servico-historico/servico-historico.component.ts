import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-servico-historico',
  templateUrl: './servico-historico.component.html',
  styleUrls: ['./servico-historico.component.css']
})
export class ServicoHistoricoComponent implements OnInit {

  servicos = [];
  numeroSerial = '';

  constructor(
    private errorHandler: ErrorHandlerService,
    private servicoService: ServicoService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.servicoService.listarHistorico(this.numeroSerial)
      .then(dados => this.servicos = dados)
      .catch(erro => this.errorHandler.handle(erro));
  }

}
