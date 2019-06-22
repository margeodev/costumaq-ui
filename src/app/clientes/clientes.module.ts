import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ClientesCadastroComponent } from './clientes-cadastro/clientes-cadastro.component';
import { ClientesPesquisaComponent } from 'app/clientes/clientes-pesquisa/clientes-pesquisa.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { PanelModule } from 'primeng/components/panel/panel';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { TextMaskModule } from 'angular2-text-mask';
import { ClienteDetalhesComponent } from './cliente-detalhes/cliente-detalhes.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    DataTableModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    PanelModule,
    RadioButtonModule,
    TooltipModule,
    TextMaskModule,
    ClientesRoutingModule,
    SharedModule,
  ],
  declarations: [
    ClientesPesquisaComponent,
    ClientesCadastroComponent,
    ClienteDetalhesComponent
  ]
})
export class ClientesModule { }
