import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Servico } from 'app/model';
import { ServicoService } from '../servico.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-servicos-listagem',
  templateUrl: './servicos-listagem.component.html',
  styleUrls: ['./servicos-listagem.component.css']
})
export class ServicosListagemComponent implements OnInit {

  servico = new Servico();
  servicos = [];

  constructor(
    private errorHandler: ErrorHandlerService,
    private sorvicoService: ServicoService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Serviços');
    this.carregarServicos();
  }

  carregarServicos() {
    this.sorvicoService.listarServicosNaoConcluidos()
      .then(servicos => {
        this.servicos = servicos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    console.log(this.servico.ordemServico.codigo);

    this.sorvicoService.adicionar(this.servico)
      .then(() => {
        console.log('Serviço adicionado com sucesso!');
        form.reset();
        this.servico = new Servico();
        this.toasty.success('Serviço adicionado com sucesso.');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  preparaNomeParaExibicao(nomeCompleto: string) {
    const nome = nomeCompleto;
    const arrayNomes = nome.split(' ');
    if(arrayNomes[1].length == 2) {
      return arrayNomes[0] + ' ' + arrayNomes[1] + ' ' + arrayNomes[2];
    } else {
      return arrayNomes[0] + ' ' + arrayNomes[1];
    }
  }

  imprimir() {
    console.log('imprimindo...');
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
