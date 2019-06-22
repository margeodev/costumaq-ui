import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/seguranca/auth.guard';
import { ClientesCadastroComponent } from './clientes-cadastro/clientes-cadastro.component';
import { ClienteDetalhesComponent } from './cliente-detalhes/cliente-detalhes.component';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';


const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO']}
  },
  {
    path: 'clientes/novo',
    component: ClientesCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO']}
  },
  {
    path: 'clientes/:id',
    component: ClientesCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO']}
   },
  {
    path: 'cliente-detalhes/:id',
    component: ClienteDetalhesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO']}
   }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ClientesRoutingModule { }
