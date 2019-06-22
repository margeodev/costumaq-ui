import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Mecanico } from 'app/model';
import { environment } from 'environments/environment.prod';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class MecanicoService {

  mecanicosUrl: string;

  constructor(private http: AuthHttp) {
    this.mecanicosUrl = `${environment.apiUrl}/mecanicos`;
  }

  // ################## GET METHOD ##################
  listar(): Promise<any> {
    return this.http.get(this.mecanicosUrl)
      .toPromise()
      .then(response => response.json())
  }

  buscarPorId(id: number): Promise<Mecanico> {
    return this.http.get(`${this.mecanicosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const mecanico = response.json() as Mecanico;
        return mecanico;
      });
  }

  // ################## POST METHOD ##################
  adicionar(mecanico: Mecanico): Promise<Mecanico> {
    return this.http.post(this.mecanicosUrl, JSON.stringify(mecanico))
      .toPromise()
      .then(response => response.json())
  }

}

