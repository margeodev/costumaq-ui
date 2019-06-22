import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ServicosListagemComponent } from './servicos-listagem/servicos-listagem.component';
import { SharedModule } from 'app/shared/shared.module';
import { ServicosRoutingModule } from './servicos-routing.module';
import { ServicosCadastroComponent } from './servicos-cadastro/servicos-cadastro.component';

import { ButtonModule } from 'primeng/components/button/button';
import { DataGridModule } from 'primeng/components/datagrid/datagrid';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { PanelModule } from 'primeng/components/panel/panel';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { ServicoImpressaoComponent } from './servico-impressao/servico-impressao.component';
import { ServicoHistoricoComponent } from './servico-historico/servico-historico.component';
import { ServicosConcluidosComponent } from './servicos-concluidos/servicos-concluidos.component';

@NgModule({
  imports: [
    CalendarModule,
    CommonModule,
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    CurrencyMaskModule,
    DataGridModule,
    DataTableModule,
    DropdownModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    PanelModule,
    RadioButtonModule,
    ServicosRoutingModule,
    SharedModule,
  ],
  declarations: [
    ServicosListagemComponent,
    ServicosCadastroComponent,
    ServicoImpressaoComponent,
    ServicoHistoricoComponent,
    ServicosConcluidosComponent
  ]
})
export class ServicosModule { }
