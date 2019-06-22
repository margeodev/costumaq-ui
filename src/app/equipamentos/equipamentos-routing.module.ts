import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/seguranca/auth.guard';
import { EquipamentosCadastroComponent } from './equipamentos-cadastro/equipamentos-cadastro.component';
import { EquipamentosPesquisaComponent } from './equipamentos-pesquisa/equipamentos-pesquisa.component';



const routes: Routes = [
  {
    path: 'equipamentos',
    component: EquipamentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO']} },
  {
    path: 'equipamentos/novo',
    component: EquipamentosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO']}
   },
  { path: 'equipamentos/:id',
    component: EquipamentosCadastroComponent,
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
export class EquipamentosRoutingModule { }
