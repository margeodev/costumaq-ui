import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BuscaCepService {

  constructor(private http: Http) { }

  consultar(cep): Promise<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
      .toPromise()
      .then(response => response.json())
  }
}
