import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Equipamento } from 'app/model';
import { environment } from 'environments/environment.prod';
import { AuthHttp } from 'angular2-jwt';

export class EquipamentoFiltro {
  numeroSerie: string;
  modelo: string;
  fabricante: string;
  pagina = 0;
  itensPorPagina = 6;
}

@Injectable()
export class EquipamentosService {

  equipamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.equipamentosUrl = `${environment.apiUrl}/equipamentos`;
  }

  // ################## GET METHOD ##################
  pesquisar(filtro: EquipamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.numeroSerie) {
      params.set('numeroSerie', filtro.numeroSerie);
    }
    if (filtro.modelo) {
      params.set('modelo', filtro.modelo);
    }
    if (filtro.fabricante) {
      params.set('fabricante', filtro.fabricante);
    }

    return this.http.get(this.equipamentosUrl, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const equipamentos = responseJson.content;
        const resultados = {
          equipamentos: equipamentos,
          total: responseJson.totalElements
        }

        return resultados;

      })
  }

  buscarPorId(id: number): Promise<Equipamento> {
    return this.http.get(`${this.equipamentosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const equipamento = response.json() as Equipamento;
        return equipamento;
      });
  }

  listarTodos(): Promise<any> {
    return this.http.get(`${this.equipamentosUrl}/?resumo`)
      .toPromise()
      .then(response => response.json());
  }


  // ################## POST METHOD ##################
  salvar(equipamento: Equipamento): Promise<Equipamento> {
    return this.http.post(this.equipamentosUrl, JSON.stringify(equipamento))
      .toPromise()
      .then(response => response.json());
  }

  // ################## DELETE METHOD ##################
  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.equipamentosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  // ################## PUT METHOD ##################
  atualizar(equipamento: Equipamento): Promise<Equipamento> {
    return this.http.put(`${this.equipamentosUrl}/${equipamento.id}`,
      JSON.stringify(equipamento))
      .toPromise()
      .then(response => {
        const equipamentoAlterado = response.json() as Equipamento;
        return equipamentoAlterado;
      });
  }
}
