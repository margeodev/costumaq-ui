import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MecanicosComponent } from './mecanicos/mecanicos.component';
import { MecanicosRoutingModule } from './mecanicos-routing.module';
import { SharedModule } from 'app/shared/shared.module';


import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { PanelModule } from 'primeng/components/panel/panel';
import { TextMaskModule } from 'angular2-text-mask';

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
    TextMaskModule,
    MecanicosRoutingModule,
    SharedModule,
  ],
  declarations: [
    MecanicosComponent
  ],
  exports: []
})
export class MecanicosModule { }
