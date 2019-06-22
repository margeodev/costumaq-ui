import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Servico, ServicoResumo } from 'app/model';
import * as moment from 'moment';
import { environment } from 'environments/environment.prod';
import { AuthHttp } from 'angular2-jwt';

export class ServicoFiltro {
  pagina = 0;
  itensPorPagina = 6;
}

@Injectable()
export class ServicoService {

  servicosUrl: string;

  constructor(private http: AuthHttp) {
    this.servicosUrl = `${environment.apiUrl}/servicos`;
  }

  // ################## GET METHOD ##################
  listarServicosNaoConcluidos(): Promise<any> {
    return this.http.get(`${this.servicosUrl}/?naoConcluido`)
      .toPromise()
      .then(response => response.json())
  }

  listarServicosConcluidos(filtro: ServicoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.servicosUrl}/?concluido`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const servicos = responseJson.content;
        const resultados = {
          servicos: servicos,
          total: responseJson.totalElements
        }

        return resultados;

      })
  }

  buscarPorId(id: number): Promise<Servico> {
    return this.http.get(`${this.servicosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const servico = response.json() as Servico;

        this.converterStringsParaDatas(servico);

        return servico;
      });
  }

  listarHistorico(numeroSerie: string): Promise<any> {
    const params = new URLSearchParams();
    params.set('numeroSerie', numeroSerie.toString());

    return this.http.get(`${this.servicosUrl}`, { search: params })
      .toPromise()
      .then(response => response.json())
  }

  // ################## POST METHOD ##################
  adicionar(servicoResumo: ServicoResumo): Promise<ServicoResumo> {
    return this.http.post(this.servicosUrl, JSON.stringify(servicoResumo))
      .toPromise()
      .then(response => response.json())
  }

  // ################## PUT METHOD ##################
  atualizar(servico: Servico): Promise<Servico> {
    return this.http.put(`${this.servicosUrl}/${servico.id}`,
      JSON.stringify(servico))
      .toPromise()
      .then(response => {
        const servicoAlterado = response.json() as Servico;
        this.converterStringsParaDatas(servicoAlterado);

        return servicoAlterado;
      });

  }

  private converterStringsParaDatas(servico: Servico) {
    if (servico.dataEntrega) {
      servico.dataEntrega = moment(servico.dataEntrega, 'YYYY-MM-DD').toDate();
    }
    if (servico.dataGarantia) {
      servico.dataGarantia = moment(servico.dataGarantia, 'YYYY-MM-DD').toDate();
    }
  }


}


