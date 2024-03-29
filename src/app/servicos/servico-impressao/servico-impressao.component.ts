import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ServicoService } from '../servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from 'app/model';

@Component({
  selector: 'app-servico-impressao',
  templateUrl: './servico-impressao.component.html',
  styleUrls: ['./servico-impressao.component.css']
})
export class ServicoImpressaoComponent implements OnInit {

  servico = new Servico();
  valorTotal: number;
  nomeFormatado: string;

  constructor(
    private errorHandler: ErrorHandlerService,
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const idServico = this.route.snapshot.params['id'];

    if (idServico) {
      this.carregarServicoPorId(idServico);
    }
  }

  calcularValorTotal() {
    let itens = this.servico.itens;
    let total = 0;
    if(itens.length > 0) {
      total = itens.reduce((sum, valorItem) => sum + valorItem.valor, 0);
    }
    this.valorTotal = total;
  }

  carregarServicoPorId(id: number) {
    this.servicoService.buscarPorId(id)
      .then(response => {
        this.servico = response;
        this.preparaNomeParaExibicao();
        this.calcularValorTotal();
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.router.navigate(['/pagina-nao-encontrada']);
      });
  }

  preparaNomeParaExibicao() {
    const arrayNomes = this.servico.ordemServico.cliente.nome.split(' ');
    if(arrayNomes[1].length == 2) {
      this.nomeFormatado = arrayNomes[0] + ' ' + arrayNomes[1] + ' ' + arrayNomes[2];
    } else {
      this.nomeFormatado = arrayNomes[0] + ' ' + arrayNomes[1];
    }
  }

  onPrint() {
    window.print();
  }

}
