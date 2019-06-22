import { Component, OnInit, ViewChild } from '@angular/core';

import { EquipamentoFiltro, EquipamentosService } from '../equipamentos.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/primeng';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-equipamentos-pesquisa',
  templateUrl: './equipamentos-pesquisa.component.html',
  styleUrls: ['./equipamentos-pesquisa.component.css']
})
export class EquipamentosPesquisaComponent implements OnInit {

  filtro = new EquipamentoFiltro();

  totalRegistros = 0
  equipamentos = [];
  @ViewChild('tabela') tabela;

  constructor(
    private equipamentosService: EquipamentosService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
    ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisar Equipamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.equipamentosService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.equipamentos = resultado.equipamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
    console.log(this.equipamentos);

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(equipamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(equipamento);
      }
    });
  }

  excluir(cliente: any) {
    this.equipamentosService.excluir(cliente.id)
      .then(() => {
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.first = 0;
        }
        this.toasty.success('Equipamento excluido com sucesso.');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
