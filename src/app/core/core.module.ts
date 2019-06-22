import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BuscaCepService } from 'app/clientes/busca-cep.service';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { JwtHelper } from 'angular2-jwt';
import { SidebarModule } from 'primeng/components/sidebar/sidebar';
import { ToastyModule } from 'ng2-toasty'

import { AuthService } from 'app/seguranca/auth.service';
import { ClientesService } from 'app/clientes/clientes.service';
import { ErrorHandlerService } from './error-handler.service';
import { MecanicoService } from 'app/mecanicos/mecanico.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { EquipamentosService } from 'app/equipamentos/equipamentos.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { OrdemServicoService } from 'app/ordem-servico/ordem-servico.service';
import { ServicoService } from 'app/servicos/servico.service';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule,
    SidebarModule
  ],
  exports: [
    ConfirmDialogModule,
    NavbarComponent,
    ToastyModule,
  ],
  declarations: [
    NavbarComponent,
    NaoAutorizadoComponent,
    PaginaNaoEncontradaComponent
  ],
  providers: [
    AuthService,
    BuscaCepService,
    ClientesService,
    ConfirmationService,
    EquipamentosService,
    ErrorHandlerService,
    JwtHelper,
    MecanicoService,
    OrdemServicoService,
    ServicoService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],

})
export class CoreModule { }
