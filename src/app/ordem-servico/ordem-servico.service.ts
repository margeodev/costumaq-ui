import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { OrdemServico } from 'app/model';
import { environment } from 'environments/environment.prod';


@Injectable()
export class OrdemServicoService {

  ordemServicoUrl: string;

  constructor(private http: AuthHttp) {
    this.ordemServicoUrl = `${environment.apiUrl}/ordem-servico`;
  }

  // ################## GET METHOD ##################
  buscarPorCodigo(codigo: number): Promise<OrdemServico> {
    return this.http.get(`${this.ordemServicoUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const ordemServico = response.json() as OrdemServico;
        return ordemServico;
      });
  }

  // ################## POST METHOD ##################
  adicionar(ordemServico: OrdemServico): Promise<OrdemServico> {
    return this.http.post(this.ordemServicoUrl, JSON.stringify(ordemServico))
      .toPromise()
      .then(response => response.json())
  }
}
