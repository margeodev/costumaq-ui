import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { Cliente } from 'app/model';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.component.html',
  styleUrls: ['./cliente-detalhes.component.css']
})
export class ClienteDetalhesComponent implements OnInit {

  cliente = new Cliente();
  pessoaFisica: boolean;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClientesService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Detalhes do Cliente');
    const idCliente = this.route.snapshot.params['id'];
    if (idCliente) {
      this.carregarCliente(idCliente);
    }
  }

  carregarCliente(id: number) {
    console.log(id);
    this.clienteService.buscarPorId(id)
      .then(cliente => {
        this.cliente = cliente;
        this.defineTipoPessoa();
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.router.navigate(['/pagina-nao-encontrada']);
      });
  }

  defineTipoPessoa() {
    if(this.cliente.tipoCliente === 'PESSOA_FISICA') {
      this.pessoaFisica = true;
    } else {
      this.pessoaFisica =  false;
    }
  }

}
