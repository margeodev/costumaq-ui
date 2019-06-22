import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { ButtonModule } from 'primeng/components/button/button';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { DataGridModule } from 'primeng/components/datagrid/datagrid';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { PanelModule } from 'primeng/components/panel/panel';

import { SharedModule } from 'app/shared/shared.module';
import { OrdemServicoRoutingModule } from './ordem-servico-routing.module';
import { OrdemServicoCadastroComponent } from './ordem-servico-cadastro/ordem-servico-cadastro.component';
import { OrdemServicoImpressaoComponent } from './ordem-servico-impressao/ordem-servico-impressao.component';

@NgModule({
  imports: [
    AutoCompleteModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    CommonModule,

    DataGridModule,

    DataTableModule,
    DropdownModule,
    FormsModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule,
    PanelModule,
    SharedModule,

    CommonModule,
    OrdemServicoRoutingModule
  ],
  declarations: [OrdemServicoCadastroComponent, OrdemServicoImpressaoComponent]
})
export class OrdemServicoModule { }
