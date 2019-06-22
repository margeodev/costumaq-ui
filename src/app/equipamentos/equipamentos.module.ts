import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EquipamentosCadastroComponent } from './equipamentos-cadastro/equipamentos-cadastro.component';
import { EquipamentosPesquisaComponent } from './equipamentos-pesquisa/equipamentos-pesquisa.component';
import { EquipamentosRoutingModule } from './equipamentos-routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { PanelModule } from 'primeng/components/panel/panel';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    DataTableModule,
    EquipamentosRoutingModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    PanelModule,
    RadioButtonModule,
    SharedModule,
    TooltipModule,
    TextMaskModule
  ],
  declarations: [
    EquipamentosCadastroComponent,
    EquipamentosPesquisaComponent
  ]
})
export class EquipamentosModule { }
