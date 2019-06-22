import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/seguranca/auth.guard';
import { MecanicosComponent } from './mecanicos/mecanicos.component';

const routes: Routes = [
  {
    path: 'mecanicos',
    component: MecanicosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_LISTAR_TUDO', 'ROLE_EDITAR_TUDO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MecanicosRoutingModule { }
