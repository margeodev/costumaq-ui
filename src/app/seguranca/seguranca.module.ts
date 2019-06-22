import { CommonModule } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './auth.service';
import { SegurancaRoutingModule } from './seguranca-routing.module';

import { ButtonModule } from 'primeng/components/button/button';
import { CostumaqHttp } from './costumaq-http';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutService } from './logout.service';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  })
  return new CostumaqHttp(auth, config, http, options)
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SegurancaRoutingModule,

    InputTextModule,
    ButtonModule,
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
