import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssinaturasComponent } from './assinaturas/assinaturas.component';
import { CabecalhoImpressaoComponent } from './cabecalho-impressao/cabecalho-impressao.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MessageComponent,
    CabecalhoImpressaoComponent,
    AssinaturasComponent
  ],
  declarations: [
    MessageComponent,
    CabecalhoImpressaoComponent,
    AssinaturasComponent
  ]
})
export class SharedModule { }
