import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ClientesModule } from './clientes/clientes.module';
import { CoreModule } from './core/core.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { MecanicosModule } from './mecanicos/mecanicos.module';
import { OrdemServicoModule } from './ordem-servico/ordem-servico.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { ServicosModule } from './servicos/servicos.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SegurancaModule,
    CoreModule,

    ClientesModule,
    EquipamentosModule,
    MecanicosModule,
    OrdemServicoModule,
    ServicosModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
