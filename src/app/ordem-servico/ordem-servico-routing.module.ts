import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdemServicoCadastroComponent } from './ordem-servico-cadastro/ordem-servico-cadastro.component';
import { OrdemServicoImpressaoComponent } from './ordem-servico-impressao/ordem-servico-impressao.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'ordem-servico-cadastro',
    component: OrdemServicoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO']}
   },
  {
    path: 'ordem-servico-impressao/:codigo',
    component: OrdemServicoImpressaoComponent,
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
export class OrdemServicoRoutingModule { }
