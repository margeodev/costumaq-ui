import { Component, OnInit } from '@angular/core';
import { Mecanico } from 'app/model';
import { MecanicoService } from '../mecanico.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mecanicos',
  templateUrl: './mecanicos.component.html',
  styleUrls: ['./mecanicos.component.css']
})
export class MecanicosComponent implements OnInit {

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  mecanico = new Mecanico();
  mecanicos = [];

  constructor(
    private mecanicosService: MecanicoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private title: Title
    ) { }

  ngOnInit() {
    this.title.setTitle('Gerenciamento de Mecânicos');
    this.pesquisar();
  }

  pesquisar() {
    this.mecanicosService.listar()
      .then(dados => this.mecanicos = dados)
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    this.mecanicosService.adicionar(this.mecanico)
      .then(() => {
        console.log('Mecânico adicionado com sucesso!');
        form.reset();
        this.mecanico = new Mecanico();
        this.pesquisar();
        this.toasty.success('Mecânico adicionado com sucesso.');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }


}
