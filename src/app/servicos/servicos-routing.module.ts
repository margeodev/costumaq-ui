import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/seguranca/auth.guard';
import { ServicosListagemComponent } from './servicos-listagem/servicos-listagem.component';
import { ServicosCadastroComponent } from './servicos-cadastro/servicos-cadastro.component';
import { ServicoImpressaoComponent } from './servico-impressao/servico-impressao.component';
import { ServicoHistoricoComponent } from './servico-historico/servico-historico.component';
import { ServicosConcluidosComponent } from './servicos-concluidos/servicos-concluidos.component';

const routes: Routes = [
  {
    path: 'servicos',
    component: ServicosListagemComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO'] }
  },
  {
    path: 'servicos-cadastro',
    component: ServicosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO'] }
  },
  {
    path: 'servicos-cadastro/:id',
    component: ServicosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO'] }
  },
  {
    path: 'servico-impressao/:id',
    component: ServicoImpressaoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO'] }
  },
  {
    path: 'servico-historico',
    component: ServicoHistoricoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO'] }
  },
  {
    path: 'servicos-concluidos',
    component: ServicosConcluidosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
