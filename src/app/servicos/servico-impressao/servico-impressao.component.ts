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

  carregarServicoPorId(id: number) {
    this.servicoService.buscarPorId(id)
      .then(response => {
        this.servico = response;
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.router.navigate(['/pagina-nao-encontrada']);
      });
  }

  onPrint() {
    window.print();
  }

}
