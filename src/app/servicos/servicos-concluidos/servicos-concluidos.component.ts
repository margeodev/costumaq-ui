import { Component, OnInit } from '@angular/core';
import { ServicoService, ServicoFiltro } from '../servico.service';
import { Title } from '@angular/platform-browser';
import { Servico } from 'app/model';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-servicos-concluidos',
  templateUrl: './servicos-concluidos.component.html',
  styleUrls: ['./servicos-concluidos.component.css']
})
export class ServicosConcluidosComponent implements OnInit {

  filtro = new ServicoFiltro();
  totalRegistros = 0
  servicos = [];

  constructor(
    private errorHandler: ErrorHandlerService,
    private servicoServices: ServicoService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Serviços concluidos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.servicoServices.listarServicosConcluidos(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.servicos = resultado.servicos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
