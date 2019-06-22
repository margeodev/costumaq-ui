import { Component, OnInit } from '@angular/core';
import { OrdemServico } from 'app/model';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { OrdemServicoService } from '../ordem-servico.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordem-servico-impressao',
  templateUrl: './ordem-servico-impressao.component.html',
  styleUrls: ['./ordem-servico-impressao.component.css']
})
export class OrdemServicoImpressaoComponent implements OnInit {

  ordemServico = new OrdemServico();

  constructor(
    private errorHandler: ErrorHandlerService,
    private ordemServicoService: OrdemServicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const codigoOrdemServico = this.route.snapshot.params['codigo'];

    if (codigoOrdemServico) {
      this.carregarOSPorCodigo(codigoOrdemServico);
    }

  }

  carregarOSPorCodigo(codigo: number) {
    this.ordemServicoService.buscarPorCodigo(codigo)
      .then(response => {
        this.ordemServico = response;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onPrint() {
    window.print();
  }

}
