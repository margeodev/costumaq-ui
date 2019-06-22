import { Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Cliente } from 'app/model';
import { environment } from 'environments/environment.prod';
import { AuthHttp } from 'angular2-jwt';

export class ClienteFiltro {
  nome: string;
  cpf: string;
  pagina = 0;
  itensPorPagina = 6;
}

@Injectable()
export class ClientesService {

  clientesUrl: string;

  constructor(private http: AuthHttp) {
    this.clientesUrl = `${environment.apiUrl}/clientes`;
  }

  // ################## GET METHOD ##################
  pesquisar(filtro: ClienteFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    if (filtro.cpf) {
      params.set('cpf', filtro.cpf);
    }
    return this.http.get(`${this.clientesUrl}/?resumo`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const clientes = responseJson.content;
        const resultados = {
          clientes: clientes,
          total: responseJson.totalElements
        }

        return resultados;

      })
  }

  buscarPorId(id: number): Promise<Cliente> {
    return this.http.get(`${this.clientesUrl}/${id}`)
      .toPromise()
      .then(response => {
        const cliente = response.json() as Cliente;
        return cliente;
      });
  }

  listarTodos(): Promise<any> {
    return this.http.get(`${this.clientesUrl}/?resumoMax`)
      .toPromise()
      .then(response => response.json());
  }

// ################## POST METHOD ##################
  adicionar(cliente: Cliente): Promise<Cliente> {
    return this.http.post(this.clientesUrl, JSON.stringify(cliente))
      .toPromise()
      .then(response => response.json())
  }

  // ################## DELETE METHOD ##################
  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.clientesUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  // ################## PUT METHOD ##################
  atualizar(cliente: Cliente): Promise<Cliente> {
    return this.http.put(`${this.clientesUrl}/${cliente.id}`,
        JSON.stringify(cliente))
      .toPromise()
      .then(response => {
        const clienteAlterado = response.json() as Cliente;
        return clienteAlterado;
      });
  }

}
